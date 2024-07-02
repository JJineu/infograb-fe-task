'use client';

import React, { useEffect, useState } from 'react';

import { BarChart, BoxPlotChart, HeatMapChart, ScatterPlotChart } from '@/components/chart';
import { getCorrelationResult, getHeatMapResult, getStandardDeviationResult, getSumAvgResult, getSumResult } from '@/data/services';

const DashboardPage = () => {
  const [sumData, setSumData] = useState<{ group: string; n: number; value: number }[]>([]);
  const [sumAvgData, setSumAvgData] = useState<{ group: string; n: number; value: number }[]>([]);
  const [standardDeviationData, setStandardDeviationData] = useState<{ id: string; data: { x: string; y: number }[] }[]>([]);
  const [correlationData, setCorrelationData] = useState<{ id: string; data: { x: string; y: number }[] }[]>([]);
  const [heatMapData, setHeatMapData] = useState<{ results: { id: string; data: { x: string; y: number }[] }[]; maxValue: number }>({ results: [], maxValue: 0 });

  const fetchData = async () => {
    const sum = await getSumResult();
    const sumAvg = await getSumAvgResult();
    const standardDeviation = await getStandardDeviationResult();
    const correlation = await getCorrelationResult();
    const heatMap = await getHeatMapResult();
    setSumData(sum);
    setSumAvgData(sumAvg);
    setStandardDeviationData(standardDeviation);
    setCorrelationData(correlation);
    setHeatMapData(heatMap);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='p-4'>
      <section className='flex flex-wrap gap-2 [&_h5]:ml-20'>
        <article>
          <h5>팀별 합계 차트</h5>
          <div className='size-[500px]'>
            <BarChart data={sumData} />
          </div>
        </article>
        <article>
          <h5>팀별 평균 차트</h5>
          <div className='size-[500px]'>
            <BarChart data={sumAvgData} />
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
          <h5>문제별 점수 히트맵 차트</h5>
          <div className='size-[500px]'>
            <HeatMapChart data={heatMapData.results} maxValue={heatMapData.maxValue} />
          </div>
        </article>
        <article>
          <h5>통계 신뢰도</h5>
          <div className='size-[500px]'>
            <BarChart data={sumData} />
          </div>
        </article>
      </section>
    </div>
  );
};

export default DashboardPage;
