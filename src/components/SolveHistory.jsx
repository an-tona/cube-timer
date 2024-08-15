import React from 'react';
import { useSelector } from 'react-redux';
import formatTime from "./functions/formatTime.jsx";

function SolveHistory() {
    const solveHistory = useSelector(state => state.stopwatch.solveHistory);

    return (
        <div>
            <h2>Solve History</h2>
            <ul>
                {solveHistory.map((solve, index) => (
                    <li key={index}>
                        {formatTime(solve.solveTime)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SolveHistory;