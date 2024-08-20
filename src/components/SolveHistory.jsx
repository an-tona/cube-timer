import React from 'react';
import { useSelector } from 'react-redux';
import formatTime from "./functions/formatTime.jsx";

function SolveHistory() {
    const solveHistory = useSelector(state => state.stopwatch.solveHistory);

    return (
        <div className="bg-blue-100 p-6 rounded-md max-w-full h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">
                {solveHistory.map((solve, index) => (
                    <span key={index} className="text-sm">
                        {formatTime(solve.solveTime)}
                        {index < solveHistory.length - 1 && ", "}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default SolveHistory;