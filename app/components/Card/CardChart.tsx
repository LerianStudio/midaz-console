'use client'

import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

type CardChartProps = {
  data: {
    labels: string[]
    datasets: number[]
    colors: string[]
  }
}

type LegendItemsProps = {
  label: string
  color: string
}

const LegendItem = ({ label, color }: LegendItemsProps) => (
  <div className="flex items-center gap-2 p-1">
    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
    <span className="text-xs font-medium uppercase text-gray-400">{label}</span>
  </div>
)

const CustomLegend = ({ labels, colors, datasets }: CardChartProps['data']) => {
  const total = datasets?.reduce((acc, dataset) => acc + dataset, 0) || 0

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

ChartJS.register(ArcElement, Tooltip, Legend)

export const CardChart = ({ data }: CardChartProps) => {
  if (!data.datasets) {
    console.error('CardChart: datasets is undefined')
    return null
  }

  return (
    <div className="mt-8 flex flex-col justify-center">
      <div className="flex justify-center">
        <div className="w-[128px]">
          <Doughnut
            data={{
              labels: data.labels,
              datasets: [
                {
                  data: data.datasets,
                  backgroundColor: data.colors
                }
              ]
            }}
            options={{ plugins: { legend: { display: false } }, cutout: '40%' }}
          />
        </div>
      </div>

      <CustomLegend
        labels={data.labels}
        colors={data.colors}
        datasets={data.datasets}
      />
    </div>
  )
}
