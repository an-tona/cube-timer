import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Statistics() {
    const solveHistory = useSelector(state => state.stopwatch.solveHistory);
    const [bestSolve, setBestSolve] = useState(null);
    const [avg5Current, setAvg5Current] = useState(null);
    const [avg12Current, setAvg12Current] = useState(null);
    const [avg5Best, setAvg5Best] = useState(null);
    const [avg12Best, setAvg12Best] = useState(null);
    const [mean, setMean] = useState(null);

    useEffect(() => {
        if (solveHistory.length === 0) {
            // Скидаємо всі значиння при очищенні історії
            setBestSolve(null);
            setAvg5Current(null);
            setAvg12Current(null);
            setAvg5Best(null);
            setAvg12Best(null);
            setMean(null);
        } else {
            const times = solveHistory.map(entry => entry.solveTime);

            // pb
            const bestSolve = Math.min(...times);
            setBestSolve((bestSolve / 1000).toFixed(2));

            // mean
            const mean = times.reduce((a, b) => a + b, 0) / times.length;
            setMean((mean / 1000).toFixed(2));

            // ao5
            if (times.length >= 5) {
                const avg5 = times.slice(-5).reduce((a, b) => a + b, 0) / 5;
                setAvg5Current((avg5 / 1000).toFixed(2));
            }

            // ao12
            if (times.length >= 12) {
                const avg12 = times.slice(-12).reduce((a, b) => a + b, 0) / 12;
                setAvg12Current((avg12 / 1000).toFixed(2));
            }

            // ao5 pb
            if (times.length >= 5) {
                let bestAvg5 = Infinity;
                for (let i = 0; i <= times.length - 5; i++) {
                    const avg5 = times.slice(i, i + 5).reduce((a, b) => a + b, 0) / 5;
                    if (avg5 < bestAvg5) bestAvg5 = avg5;
                }
                setAvg5Best((bestAvg5 / 1000).toFixed(2));
            }

            // ao12 pb
            if (times.length >= 12) {
                let bestAvg12 = Infinity;
                for (let i = 0; i <= times.length - 12; i++) {
                    const avg12 = times.slice(i, i + 12).reduce((a, b) => a + b, 0) / 12;
                    if (avg12 < bestAvg12) bestAvg12 = avg12;
                }
                setAvg12Best((bestAvg12 / 1000).toFixed(2));
            }
        }
    }, [solveHistory]);

    return (
        <div>
            <p>pb: {bestSolve !== null ? bestSolve : "N/A"}</p>
            <p>ao5: {avg5Current !== null ? avg5Current : "N/A"}</p>
            <p>ao12: {avg12Current !== null ? avg12Current : "N/A"}</p>
            <p>ao5 pb: {avg5Best !== null ? avg5Best : "N/A"}</p>
            <p>ao12 pb: {avg12Best !== null ? avg12Best : "N/A"}</p>
            <p>avg: {mean !== null ? mean : "N/A"}</p>
        </div>
    );
}

export default Statistics;