import {Anthropic} from '@anthropic-ai/sdk'
import {TextBlock} from '@anthropic-ai/sdk/resources/index.mjs'
import {NextResponse} from 'next/server'
import pb from '@/utils/pb'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

const prompt = `
Please analyze this invoice and extract the key information. Ideally, you should extract the following: 
- Amount
- Currency
- Date in format ISO 8601
- Issuer (service or entity name)

In case the final amount is 0, try to return the sum of the amounts of the lines in the invoice instead.

Then output a JSON object with the following schema:
{
  "amount": 123.45,
  "currency": "EUR",
  "date": "2023-01-01",
  "issuer": "SNCF WEB MOBILE PARIS 12",
  "otherInformationInBulk": "Few words of context that could help automatically match this PDF with a bank statement / or error message if not an invoice"
}

Your response should only contain the JSON object, and nothing else.
`

export const POST = async (request: Request) => {
  try {
    const {fileId} = await request.json()
    const entry = await pb.collection('analyzed_files').getOne(fileId)
    // if (entry.analysis_result && !entry.analysis_result.isError) {
    //   // Let's save some money for Claude
    //   return NextResponse.json(entry.analysis_result)
    // }
    const pdfURL = pb.files.getUrl(entry, entry.invoice)
    const pdfResponse = await fetch(pdfURL)
    const arrayBuffer = await pdfResponse.arrayBuffer()
    const pdfBase64 = Buffer.from(arrayBuffer).toString('base64')

    if (!pdfBase64) {
      return NextResponse.json({error: 'No PDF file provided'}, {status: 400})
    }

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt,
            },
            {
              type: 'document',
              source: {
                type: 'base64',
                media_type: 'application/pdf',
                data: pdfBase64,
              },
            },
          ],
        },
      ],
    })

    const output = (message.content[0] as TextBlock).text
    const analysis_result = JSON.parse(output)
    analysis_result.isError =
      !analysis_result.amount || !analysis_result.date || !analysis_result.issuer
    console.log(analysis_result)
    await pb.collection('analyzed_files').update(fileId, {
      analysis_result,
    })
    return NextResponse.json(analysis_result)
  } catch (error) {
    console.error('Error processing PDF:', error)
    return NextResponse.json({error: 'Failed to process PDF'}, {status: 500})
  }
}
