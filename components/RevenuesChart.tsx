import {Transaction} from '@/models/Transaction'
import {format} from '@/utils/formatter'
import {plotlyDarkTheme} from '@/utils/plotlyTheme'
import {Box} from '@chakra-ui/react'
import dayjs from 'dayjs'
import groupBy from 'lodash/groupBy'
import sumBy from 'lodash/sumBy'
import dynamic from 'next/dynamic'
import {useMemo} from 'react'

const Plot = dynamic(() => import('react-plotly.js'), {ssr: false})

export const RevenuesChart = ({transactions}: {transactions: Transaction[]}) => {
  const monthlyCreditData = useMemo(() => {
    const monthlyCredit = groupBy(
      transactions.filter(t => t.type === 'debit'),
      t => dayjs(t.date).format('YYYY-MM'),
    )

    const sortedMonths = Object.keys(monthlyCredit).sort()

    const xData = sortedMonths.map(month => dayjs(month).format('MMM YYYY'))
    const yData = sortedMonths.map(month => sumBy(monthlyCredit[month], 'amount'))

    return {xData, yData}
  }, [transactions])

  return (
    <Box mb={6} w='full'>
      <Plot
        data={[
          {
            x: monthlyCreditData.xData,
            y: monthlyCreditData.yData,
            type: 'bar',
            marker: {color: '#16a34a'},
            text: monthlyCreditData.yData.map(value => format(value, 'CHF')),
            textposition: 'outside',
            hoverinfo: 'x+y',
            hovertemplate: '%{x}<br>%{text}<extra></extra>',
          },
        ]}
        layout={{
          height: 500,
          title: 'Credit per Month',
          paper_bgcolor: plotlyDarkTheme.background,
          plot_bgcolor: plotlyDarkTheme.background,
          xaxis: {
            title: 'Month',
            color: plotlyDarkTheme.text,
            gridcolor: plotlyDarkTheme.grid,
          },
          yaxis: {
            title: 'Total Credit (CHF)',
            color: plotlyDarkTheme.text,
            gridcolor: plotlyDarkTheme.grid,
          },
          font: {color: plotlyDarkTheme.text},
        }}
        useResizeHandler={true}
        style={{width: '100%', height: '100%'}}
      />
    </Box>
  )
}
