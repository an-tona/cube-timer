import React from 'react';
import { useSelector } from 'react-redux';
import formatTime from "./functions/formatTime.jsx";
import TransitionsModal from './DialogContainer.jsx';
import { CubeVisualization } from './CubeVisualization.jsx';
import CopyScramble from './CopyScramble.jsx';



function SolveHistory() {
    const solveHistory = useSelector(state => state.stopwatch.solveHistory);

    return (
        <div className="bg-blue-100 p-6 rounded-md max-w-full h-full">
            <div className="flex flex-wrap overflow-auto max-h-full">

                {solveHistory.slice().reverse().map((solve, index) => (
                    <TransitionsModal key={index} buttonText={formatTime(solve.solveTime)}>
                        <div className='flex flex-col justify-center items-center'>
                            <h2 className='font-source-code-pro font-normal text-[60px]'>{formatTime(solve.solveTime)}</h2>
                            <p>+2 | DNF</p>
                            <div className='w-3/4'>
                                <CubeVisualization scramble={solve.scramble}/>
                            </div>
                            <p>{solve.scramble}</p>
                            <CopyScramble scramble={solve.scramble}/>
                        </div>
                    </TransitionsModal>

                ))}
            </div>
        </div>
    );
}

export default SolveHistory;