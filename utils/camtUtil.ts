import {Transaction} from '@/models/Transaction'
import {XMLParser} from 'fast-xml-parser'
import {create} from 'xmlbuilder2'

export const generateCamt053XmlFile = (transactions: Transaction[]) => {
  const root = create({version: '1.0', encoding: 'UTF-8'})
    .ele('Document', {
      xmlns: 'urn:iso:std:iso:20022:tech:xsd:camt.053.001.02',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    })
    .ele('BkToCstmrStmt')
    .ele('GrpHdr')
    .ele('MsgId')
    .txt('CAMT053EXAMPLE')
    .up()
    .ele('CreDtTm')
    .txt(new Date().toISOString())
    .up()
    .up()
    .ele('Stmt')
    .ele('Id')
    .txt('STATEMENT1')
    .up()
    .ele('CreDtTm')
    .txt(new Date().toISOString())
    .up()
    .ele('Acct')
    .ele('Id')
    .ele('IBAN')
    .txt('CH8309000000146562451')
    .up()
    .up()
    .up()

  transactions.forEach((transaction, index) => {
    root
      .ele('Ntry')
      .ele('Amt', {Ccy: transaction.currency})
      .txt(transaction.amount.toFixed(2))
      .up()
      .ele('CdtDbtInd')
      .txt(transaction.amount >= 0 ? 'CRDT' : 'DBIT')
      .up()
      .ele('Sts')
      .txt('BOOK')
      .up()
      .ele('BookgDt')
      .ele('Dt')
      .txt(transaction.date)
      .up()
      .up()
      .ele('ValDt')
      .ele('Dt')
      .txt(transaction.date)
      .up()
      .up()
      .ele('BkTxCd')
      .ele('Prtry')
      .txt('NTRF')
      .up()
      .up()
      .ele('NtryDtls')
      .ele('TxDtls')
      .ele('Refs')
      .ele('AcctSvcrRef')
      .txt(`REF${index}`)
      .up()
      .up()
      .ele('RmtInf')
      .ele('Ustrd')
      .txt(transaction.description)
      .up()
      .up()
      .up()
      .up()
  })

  return root.end({prettyPrint: true})
}

export const parseCAMT = (xmlContent: string) => {
  try {
    const parser = new XMLParser({ignoreAttributes: false})
    const parsed = parser.parse(xmlContent)
    return parsed.Document.BkToCstmrStmt.Stmt.Ntry.map((entry: any) => {
      if (entry.CdtDbtInd !== 'CRDT' && entry.CdtDbtInd !== 'DBIT') {
        throw new Error(`Invalid CdtDbtInd : ${entry.CdtDbtInd}`)
      }
      return <Transaction>{
        date: entry.BookgDt.Dt,
        amount: entry.Amt['#text'],
        currency: entry.Amt['@_Ccy'],
        description: entry.AddtlNtryInf,
        type: entry.CdtDbtInd === 'CRDT' ? 'debit' : 'credit',
      }
    })
  } catch (e) {
    console.error('Error parsing CAMT.053:', e)
    return null
  }
}
