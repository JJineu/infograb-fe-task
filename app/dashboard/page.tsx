'use client';

import React, { useEffect, useState } from 'react';

import { BarChart, BoxPlotChart, HeatMapChart, ScatterPlotChart } from '@/components/chart';
import { getCorrelationResult, getHeatMapResult, getStandardDeviationResult, getStatisticalReliabilityResults, getSumAvgResult, getSumResult } from '@/data/services';

const DashboardPage = () => {
  const [sumData, setSumData] = useState<{ [key: string]: number }[]>([]);
  const [sumAvgData, setSumAvgData] = useState<{ [key: string]: number }[]>([]);
  const [standardDeviationData, setStandardDeviationData] = useState<{ group: string; n: number; value: number }[]>([]);
  const [correlationData, setCorrelationData] = useState<{ id: string; data: { x: number; y: number }[] }[]>([]);
  const [heatMapData, setHeatMapData] = useState<{ results: { id: string; data: { x: string; y: number }[] }[]; maxValue: number }>({ results: [], maxValue: 0 });
  const [statisticalReliabilityData, setStatisticalReliabilityData] = useState<{ [key: string]: number | string }[]>([]);

  const fetchData = async () => {
    const sum = await getSumResult();
    const sumAvg = await getSumAvgResult();
    const standardDeviation = await getStandardDeviationResult();
    const correlation = await getCorrelationResult();
    const heatMap = await getHeatMapResult();
    const statisticalReliability = await getStatisticalReliabilityResults();
    setSumData(sum);
    setSumAvgData(sumAvg);
    setStandardDeviationData(standardDeviation);
    setCorrelationData(correlation);
    setHeatMapData(heatMap);
    setStatisticalReliabilityData(statisticalReliability);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='p-4'>
      <section className='flex flex-wrap gap-2 [&_article]:rounded [&_article]:bg-white [&_h5]:m-2 [&_h5]:ml-10 '>
        <article>
          <h5>팀별 합계 차트</h5>
          <div className='size-[500px]'>
            <BarChart data={sumData} />
          </div>
        </article>
        <article>
          <h5>팀별 평균 차트</h5>
          <div className='size-[500px]'>
            <BarChart data={sumAvgData} colorsScheme='purples' />
          </div>
        </article>
        <article>
          <h5>팀별 총합의 표준편차 차트</h5>
          <div className='size-[500px]'>
            <BoxPlotChart data={standardDeviationData} />
          </div>
        </article>
        <article>
          <h5>팀 참여도와 평균 상관관계 차트</h5>
          <div className='size-[500px]'>
            <ScatterPlotChart data={correlationData} />
          </div>
        </article>
        <article>
          <h5>설문별 점수 선택 분포 차트</h5>
          <div className='size-[500px]'>
            <HeatMapChart data={heatMapData.results} maxValue={heatMapData.maxValue} />
          </div>
        </article>
        <article>
          <h5>팀별 통계 신뢰도</h5>
          <div className='size-[500px]'>
            <BarChart data={statisticalReliabilityData} colorsScheme='green_blue' legend={[]} />
          </div>
        </article>
      </section>
    </div>
  );
};

export default DashboardPage;
