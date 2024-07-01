'use client';

import React from 'react';

import BarChart from '@/components/chart/BarChart';
import BoxPlotChart from '@/components/chart/BoxPlotChart';
import { getStandardDeviationResult, getSumAvgResult, getSumResult } from '@/data/services';

const DashboardPage = () => {
  const sumData = getSumResult();
  const sumAvgData = getSumAvgResult();
  const standardDeviationData = getStandardDeviationResult();

  return (
    <div className='p-4'>
      <section className='flex flex-wrap gap-2'>
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
        {/* <article>
          <h5></h5>
          <div className='size-[500px]'>
            <BarChart data={sumData} />
          </div>
        </article>
        <article>
          <h5></h5>
          <div className='size-[500px]'>
            <BarChart data={sumData} />
          </div>
        </article>
        <article>
          <h5></h5>
          <div className='size-[500px]'>
            <BarChart data={sumData} />
          </div>
        </article> */}
      </section>
    </div>
  );
};

export default DashboardPage;
