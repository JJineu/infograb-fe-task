'use client';

import { ResponsiveHeatMap } from '@nivo/heatmap';

const HeatMapChart = ({ data, maxValue }: { data: { id: string; data: { x: string; y: string; value: number }[] }[]; maxValue: number }) => (
  <ResponsiveHeatMap
    data={data}
    margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
    valueFormat=''
    axisTop={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: -45,
      legend: '',
      legendOffset: 46,
      truncateTickAt: 0,
    }}
    axisRight={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'question',
      legendPosition: 'middle',
      legendOffset: 50,
      truncateTickAt: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'question',
      legendPosition: 'middle',
      legendOffset: -50,
      truncateTickAt: 0,
    }}
    colors={{
      type: 'diverging',
      scheme: 'red_blue',
      divergeAt: 0.5,
      minValue: 0,
      maxValue,
    }}
    emptyColor='#555555'
    legends={[
      {
        anchor: 'bottom',
        translateX: 0,
        translateY: 30,
        length: 400,
        thickness: 8,
        direction: 'row',
        tickPosition: 'after',
        tickSize: 3,
        tickSpacing: 4,
        tickOverlap: false,
        tickFormat: '',
        title: 'Value →',
        titleAlign: 'start',
        titleOffset: 4,
      },
    ]}
  />
);

export default HeatMapChart;
