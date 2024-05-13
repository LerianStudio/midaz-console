'use client'

import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

type CustomLegendProps = {
  labels: string[]
  colors: string[]
  datasets: number[]
}

type LegendItemsProps = {
  label: string
  color: string
}

const data = {
  labels: ['Completed', 'Pending', 'Failed', 'Reversed'],
  datasets: [
    {
      data: [124, 93, 124, 31],
      backgroundColor: ['#74DB9A', '#FFED89', '#FAA589', '#A1A1AA'],
      cutout: '40%'
    }
  ]
}

const options = {
  plugins: {
    legend: {
      display: false
    }
  }
}

ChartJS.register(ArcElement, Tooltip, Legend)

const LegendItem = ({ label, color }: LegendItemsProps) => (
  <div className="flex items-center gap-2 p-1">
    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
    <span className="text-xs font-medium uppercase text-gray-400">{label}</span>
  </div>
)

const CustomLegend = ({ labels, colors, datasets }: CustomLegendProps) => {
  const total = datasets.reduce((acc, dataset) => acc + dataset, 0)

  return (
    <div className="mt-10 flex justify-between">
      <div>
        {labels.map((label, index) => (
          <LegendItem key={index} label={label} color={colors[index]} />
        ))}
      </div>
      <div className="flex flex-col gap-2 p-1">
        {datasets.map((dataset, index) => {
          const percentage = ((dataset / total) * 100).toFixed(0)

          return (
            <div key={index}>
              <h2 className="text-xs font-medium text-gray-400">
                {dataset} /{' '}
                <span className="text-shadcn-600">{percentage}%</span>
              </h2>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const CardChart = () => (
  <div className="mt-8 flex flex-col justify-center">
    <div className="flex justify-center">
      <div className="w-[128px]">
        <Doughnut data={data} options={options} />
      </div>
    </div>
    <CustomLegend
      labels={data.labels}
      colors={data.datasets[0].backgroundColor}
      datasets={data.datasets[0].data}
    />
  </div>
)
