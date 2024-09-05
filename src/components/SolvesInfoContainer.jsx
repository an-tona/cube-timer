import React from 'react';
import { useSelector } from 'react-redux';
import { CubeVisualization } from "./CubeVisualization.jsx";
import Statistics from './Statistics.jsx';
import SolveHistory from './SolveHistory.jsx';

function SolvesInfoContainer() {
  const state = useSelector(state => state.stopwatch);

  return (
    <section className='flex flex-wrap justify-evenly gap-6 p-6 w-full max-h-[320px] h-[320px]'>
      <div className='flex-1 min-w-[200px] max-w-sm max-h-full'>
        <SolveHistory />
      </div>
      <div className='flex-1 min-w-[200px] max-w-sm max-h-full'>
        <Statistics />
      </div>
      <div className='flex flex-1 min-w-[200px] max-w-sm max-h-full h-full overflow-hidden items-center justify-center bg-blue-100 p-7 rounded-md'>
        <CubeVisualization scramble={state.currentScramble} />
      </div>
    </section>
  );
}

export default SolvesInfoContainer;