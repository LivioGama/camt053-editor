export const sampleXml = `
<?xml version='1.0' encoding='UTF-8'?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.053.001.02">
    <BkToCstmrStmt>
        <Stmt>
            <Ntry>
                <Amt Ccy="CHF">8000</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-01-01</Dt>
                </BookgDt>
                <NtryDtls>Salary Credit</NtryDtls>
                <AddtlNtryInf>Salary Credit</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">100</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-01-11</Dt>
                </BookgDt>
                <NtryDtls>Software Subscription</NtryDtls>
                <AddtlNtryInf>Software Subscription</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">200</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-01-11</Dt>
                </BookgDt>
                <NtryDtls>Utilities</NtryDtls>
                <AddtlNtryInf>Utilities</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">50</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-01-11</Dt>
                </BookgDt>
                <NtryDtls>Fuel Expenses</NtryDtls>
                <AddtlNtryInf>Fuel Expenses</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">25</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-01-11</Dt>
                </BookgDt>
                <NtryDtls>Office Supplies</NtryDtls>
                <AddtlNtryInf>Office Supplies</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">150</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-01-11</Dt>
                </BookgDt>
                <NtryDtls>Meals and Entertainment</NtryDtls>
                <AddtlNtryInf>Meals and Entertainment</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">8000</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-01-31</Dt>
                </BookgDt>
                <NtryDtls>Salary Credit</NtryDtls>
                <AddtlNtryInf>Salary Credit</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">100</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-02-10</Dt>
                </BookgDt>
                <NtryDtls>Software Subscription</NtryDtls>
                <AddtlNtryInf>Software Subscription</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">200</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-02-10</Dt>
                </BookgDt>
                <NtryDtls>Utilities</NtryDtls>
                <AddtlNtryInf>Utilities</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">25</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-02-10</Dt>
                </BookgDt>
                <NtryDtls>Office Supplies</NtryDtls>
                <AddtlNtryInf>Office Supplies</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">150</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-02-10</Dt>
                </BookgDt>
                <NtryDtls>Meals and Entertainment</NtryDtls>
                <AddtlNtryInf>Meals and Entertainment</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">8000</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-03-01</Dt>
                </BookgDt>
                <NtryDtls>Salary Credit</NtryDtls>
                <AddtlNtryInf>Salary Credit</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">100</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-03-11</Dt>
                </BookgDt>
                <NtryDtls>Software Subscription</NtryDtls>
                <AddtlNtryInf>Software Subscription</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">200</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-03-11</Dt>
                </BookgDt>
                <NtryDtls>Utilities</NtryDtls>
                <AddtlNtryInf>Utilities</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">50</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-03-11</Dt>
                </BookgDt>
                <NtryDtls>Fuel Expenses</NtryDtls>
                <AddtlNtryInf>Fuel Expenses</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">25</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-03-11</Dt>
                </BookgDt>
                <NtryDtls>Office Supplies</NtryDtls>
                <AddtlNtryInf>Office Supplies</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">150</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-03-11</Dt>
                </BookgDt>
                <NtryDtls>Meals and Entertainment</NtryDtls>
                <AddtlNtryInf>Meals and Entertainment</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">8000</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-03-31</Dt>
                </BookgDt>
                <NtryDtls>Salary Credit</NtryDtls>
                <AddtlNtryInf>Salary Credit</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">100</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-04-10</Dt>
                </BookgDt>
                <NtryDtls>Software Subscription</NtryDtls>
                <AddtlNtryInf>Software Subscription</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">200</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-04-10</Dt>
                </BookgDt>
                <NtryDtls>Utilities</NtryDtls>
                <AddtlNtryInf>Utilities</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">25</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-04-10</Dt>
                </BookgDt>
                <NtryDtls>Office Supplies</NtryDtls>
                <AddtlNtryInf>Office Supplies</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">150</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-04-10</Dt>
                </BookgDt>
                <NtryDtls>Meals and Entertainment</NtryDtls>
                <AddtlNtryInf>Meals and Entertainment</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">8000</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-04-30</Dt>
                </BookgDt>
                <NtryDtls>Salary Credit</NtryDtls>
                <AddtlNtryInf>Salary Credit</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">100</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-05-10</Dt>
                </BookgDt>
                <NtryDtls>Software Subscription</NtryDtls>
                <AddtlNtryInf>Software Subscription</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">200</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-05-10</Dt>
                </BookgDt>
                <NtryDtls>Utilities</NtryDtls>
                <AddtlNtryInf>Utilities</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">50</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-05-10</Dt>
                </BookgDt>
                <NtryDtls>Fuel Expenses</NtryDtls>
                <AddtlNtryInf>Fuel Expenses</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">25</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-05-10</Dt>
                </BookgDt>
                <NtryDtls>Office Supplies</NtryDtls>
                <AddtlNtryInf>Office Supplies</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">150</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-05-10</Dt>
                </BookgDt>
                <NtryDtls>Meals and Entertainment</NtryDtls>
                <AddtlNtryInf>Meals and Entertainment</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">8000</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-05-30</Dt>
                </BookgDt>
                <NtryDtls>Salary Credit</NtryDtls>
                <AddtlNtryInf>Salary Credit</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">100</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-06-09</Dt>
                </BookgDt>
                <NtryDtls>Software Subscription</NtryDtls>
                <AddtlNtryInf>Software Subscription</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">200</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-06-09</Dt>
                </BookgDt>
                <NtryDtls>Utilities</NtryDtls>
                <AddtlNtryInf>Utilities</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">25</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-06-09</Dt>
                </BookgDt>
                <NtryDtls>Office Supplies</NtryDtls>
                <AddtlNtryInf>Office Supplies</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">150</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-06-09</Dt>
                </BookgDt>
                <NtryDtls>Meals and Entertainment</NtryDtls>
                <AddtlNtryInf>Meals and Entertainment</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">8000</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-06-29</Dt>
                </BookgDt>
                <NtryDtls>Salary Credit</NtryDtls>
                <AddtlNtryInf>Salary Credit</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">100</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-07-09</Dt>
                </BookgDt>
                <NtryDtls>Software Subscription</NtryDtls>
                <AddtlNtryInf>Software Subscription</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">200</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-07-09</Dt>
                </BookgDt>
                <NtryDtls>Utilities</NtryDtls>
                <AddtlNtryInf>Utilities</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">50</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-07-09</Dt>
                </BookgDt>
                <NtryDtls>Fuel Expenses</NtryDtls>
                <AddtlNtryInf>Fuel Expenses</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">25</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-07-09</Dt>
                </BookgDt>
                <NtryDtls>Office Supplies</NtryDtls>
                <AddtlNtryInf>Office Supplies</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">150</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-07-09</Dt>
                </BookgDt>
                <NtryDtls>Meals and Entertainment</NtryDtls>
                <AddtlNtryInf>Meals and Entertainment</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">8000</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-07-29</Dt>
                </BookgDt>
                <NtryDtls>Salary Credit</NtryDtls>
                <AddtlNtryInf>Salary Credit</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">100</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-08-08</Dt>
                </BookgDt>
                <NtryDtls>Software Subscription</NtryDtls>
                <AddtlNtryInf>Software Subscription</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">200</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-08-08</Dt>
                </BookgDt>
                <NtryDtls>Utilities</NtryDtls>
                <AddtlNtryInf>Utilities</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">25</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-08-08</Dt>
                </BookgDt>
                <NtryDtls>Office Supplies</NtryDtls>
                <AddtlNtryInf>Office Supplies</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">150</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-08-08</Dt>
                </BookgDt>
                <NtryDtls>Meals and Entertainment</NtryDtls>
                <AddtlNtryInf>Meals and Entertainment</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">8000</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-08-28</Dt>
                </BookgDt>
                <NtryDtls>Salary Credit</NtryDtls>
                <AddtlNtryInf>Salary Credit</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">100</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-09-07</Dt>
                </BookgDt>
                <NtryDtls>Software Subscription</NtryDtls>
                <AddtlNtryInf>Software Subscription</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">200</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-09-07</Dt>
                </BookgDt>
                <NtryDtls>Utilities</NtryDtls>
                <AddtlNtryInf>Utilities</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">50</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-09-07</Dt>
                </BookgDt>
                <NtryDtls>Fuel Expenses</NtryDtls>
                <AddtlNtryInf>Fuel Expenses</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">25</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-09-07</Dt>
                </BookgDt>
                <NtryDtls>Office Supplies</NtryDtls>
                <AddtlNtryInf>Office Supplies</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">150</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-09-07</Dt>
                </BookgDt>
                <NtryDtls>Meals and Entertainment</NtryDtls>
                <AddtlNtryInf>Meals and Entertainment</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">8000</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-09-27</Dt>
                </BookgDt>
                <NtryDtls>Salary Credit</NtryDtls>
                <AddtlNtryInf>Salary Credit</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">100</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-10-07</Dt>
                </BookgDt>
                <NtryDtls>Software Subscription</NtryDtls>
                <AddtlNtryInf>Software Subscription</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">200</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-10-07</Dt>
                </BookgDt>
                <NtryDtls>Utilities</NtryDtls>
                <AddtlNtryInf>Utilities</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">25</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-10-07</Dt>
                </BookgDt>
                <NtryDtls>Office Supplies</NtryDtls>
                <AddtlNtryInf>Office Supplies</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">150</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-10-07</Dt>
                </BookgDt>
                <NtryDtls>Meals and Entertainment</NtryDtls>
                <AddtlNtryInf>Meals and Entertainment</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">8000</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-10-27</Dt>
                </BookgDt>
                <NtryDtls>Salary Credit</NtryDtls>
                <AddtlNtryInf>Salary Credit</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">100</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-11-06</Dt>
                </BookgDt>
                <NtryDtls>Software Subscription</NtryDtls>
                <AddtlNtryInf>Software Subscription</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">200</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-11-06</Dt>
                </BookgDt>
                <NtryDtls>Utilities</NtryDtls>
                <AddtlNtryInf>Utilities</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">50</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-11-06</Dt>
                </BookgDt>
                <NtryDtls>Fuel Expenses</NtryDtls>
                <AddtlNtryInf>Fuel Expenses</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">25</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-11-06</Dt>
                </BookgDt>
                <NtryDtls>Office Supplies</NtryDtls>
                <AddtlNtryInf>Office Supplies</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">150</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-11-06</Dt>
                </BookgDt>
                <NtryDtls>Meals and Entertainment</NtryDtls>
                <AddtlNtryInf>Meals and Entertainment</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">8000</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-11-26</Dt>
                </BookgDt>
                <NtryDtls>Salary Credit</NtryDtls>
                <AddtlNtryInf>Salary Credit</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">100</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-12-06</Dt>
                </BookgDt>
                <NtryDtls>Software Subscription</NtryDtls>
                <AddtlNtryInf>Software Subscription</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">200</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-12-06</Dt>
                </BookgDt>
                <NtryDtls>Utilities</NtryDtls>
                <AddtlNtryInf>Utilities</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">25</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-12-06</Dt>
                </BookgDt>
                <NtryDtls>Office Supplies</NtryDtls>
                <AddtlNtryInf>Office Supplies</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="CHF">150</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <BookgDt>
                    <Dt>2024-12-06</Dt>
                </BookgDt>
                <NtryDtls>Meals and Entertainment</NtryDtls>
                <AddtlNtryInf>Meals and Entertainment</AddtlNtryInf>
            </Ntry>
        </Stmt>
    </BkToCstmrStmt>
</Document>
`
