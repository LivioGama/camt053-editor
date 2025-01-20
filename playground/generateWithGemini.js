import {GoogleGenerativeAI} from '@google/generative-ai'

export const generateWithGemini = async (prompt, onStreamChunk) => {
  if (!process.env.GOOGLE_GEMINI_KEY) {
    throw new Error('GOOGLE_GEMINI_KEY environment variable is not set')
  }

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY)
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
    generationConfig: {temperature: 0, responseMimeType: 'application/json'},
  })

  try {
    const result = await model.generateContentStream({
      contents: [
        {
          role: 'user',
          parts: [{text: prompt}],
        },
      ],
    })

    let fullResponse = ''
    for await (const chunk of result.stream) {
      const chunkText = chunk.text()
      fullResponse += chunkText

      if (onStreamChunk) {
        onStreamChunk(chunkText)
      }
    }

    return fullResponse
  } catch (error) {
    console.error('Gemini API error:', error.message)
    throw error
  }
}
