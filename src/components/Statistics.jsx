import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Statistics() {
    const solveHistory = useSelector(state => state.stopwatch.solveHistory);
    const [bestSolve, setBestSolve] = useState(null);
    const [avg5Current, setAvg5Current] = useState(null);
    const [avg12Current, setAvg12Current] = useState(null);
    const [best5, setBest5] = useState(null);  // Renamed from avg5Best
    const [best12, setBest12] = useState(null);  // Renamed from avg12Best
    const [mean, setMean] = useState(null);

    useEffect(() => {
        if (solveHistory.length === 0) {
            // Reset all values when the history is cleared
            setBestSolve(null);
            setAvg5Current(null);
            setAvg12Current(null);
            setBest5(null);
            setBest12(null);
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
                const last5 = times.slice(-5);
                const max5 = Math.max(...last5);
                const min5 = Math.min(...last5);
                const filtered5 = last5.filter(time => time !== max5 && time !== min5);
                const avg5 = filtered5.reduce((a, b) => a + b, 0) / filtered5.length;
                setAvg5Current((avg5 / 1000).toFixed(2));
            }

            // ao12
            if (times.length >= 12) {
                const last12 = times.slice(-12);
                const max12 = Math.max(...last12);
                const min12 = Math.min(...last12);
                const filtered12 = last12.filter(time => time !== max12 && time !== min12);
                const avg12 = filtered12.reduce((a, b) => a + b, 0) / filtered12.length;
                setAvg12Current((avg12 / 1000).toFixed(2));
            }

            // best5
            if (times.length >= 5) {
                let best5 = Infinity;
                for (let i = 0; i <= times.length - 5; i++) {
                    const slice5 = times.slice(i, i + 5);
                    const max5 = Math.max(...slice5);
                    const min5 = Math.min(...slice5);
                    const filtered5 = slice5.filter(time => time !== max5 && time !== min5);
                    const avg5 = filtered5.reduce((a, b) => a + b, 0) / filtered5.length;
                    if (avg5 < best5) best5 = avg5;
                }
                setBest5((best5 / 1000).toFixed(2));
            }

            // best12
            if (times.length >= 12) {
                let best12 = Infinity;
                for (let i = 0; i <= times.length - 12; i++) {
                    const slice12 = times.slice(i, i + 12);
                    const max12 = Math.max(...slice12);
                    const min12 = Math.min(...slice12);
                    const filtered12 = slice12.filter(time => time !== max12 && time !== min12);
                    const avg12 = filtered12.reduce((a, b) => a + b, 0) / filtered12.length;
                    if (avg12 < best12) best12 = avg12;
                }
                setBest12((best12 / 1000).toFixed(2));
            }
        }
    }, [solveHistory]);

    // pb, mean, ao5, ao12, best5, best12
    return (
        <div className="bg-blue-100 p-6 rounded-md max-w-full h-full">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col justify-center items-center">
                    <p>pb</p>
                    <p className="font-bold">{bestSolve !== null ? bestSolve : "N/A"}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p>ao5</p>
                    <p className="font-bold">{avg5Current !== null ? avg5Current : "N/A"}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p>ao12</p>
                    <p className="font-bold">{avg12Current !== null ? avg12Current : "N/A"}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p>best5</p>
                    <p className="font-bold">{best5 !== null ? best5 : "N/A"}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p>best12</p>
                    <p className="font-bold">{best12 !== null ? best12 : "N/A"}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p>avg</p>
                    <p className="font-bold">{mean !== null ? mean : "N/A"}</p>
                </div>
            </div>
        </div>
    );
}

export default Statistics;