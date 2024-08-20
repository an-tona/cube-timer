import React from 'react';
import { useSelector } from 'react-redux';
import { CubeVisualization } from "./CubeVisualization.jsx";
import Statistics from './Statistics.jsx';
import SolveHistory from './SolveHistory.jsx';

function SolvesInfoContainer() {
    const state = useSelector(state => state.stopwatch);
  
    return (
        <section className='w-full flex flex-wrap justify-around gap-6 p-6'>
            <div className='flex-1 min-w-[200px] max-w-sm'>
                <SolveHistory />
            </div>
            <div className='flex-1 min-w-[200px] max-w-sm'>
                <Statistics />
            </div>
            <div className='flex-1 min-w-[200px] max-w-sm'>
                <CubeVisualization scramble={state.currentScramble} />
            </div>
        </section>
    );
}

export default SolvesInfoContainer;