'use client';

import { ResponsiveScatterPlot } from '@nivo/scatterplot';

const ScatterPlotChart = ({ data, axisX = 'score average', axisY = 'user count' }: { data: { id: string; data: { x: number; y: number }[] }[]; axisX?: string; axisY?: string }) => (
  <ResponsiveScatterPlot
    data={data}
    margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
    xScale={{ type: 'linear', min: 0, max: 'auto' }}
    xFormat='>-.2f'
    yScale={{ type: 'linear', min: 0, max: 'auto' }}
    yFormat='>-.2f'
    blendMode='multiply'
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: axisX,
      legendPosition: 'middle',
      legendOffset: 46,
      truncateTickAt: 0,
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: axisY,
      legendPosition: 'middle',
      legendOffset: -60,
      truncateTickAt: 0,
    }}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 130,
        translateY: 0,
        itemWidth: 100,
        itemHeight: 12,
        itemsSpacing: 5,
        itemDirection: 'left-to-right',
        symbolSize: 12,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default ScatterPlotChart;
