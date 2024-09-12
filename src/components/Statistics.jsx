import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import formatTime from './functions/formatTime';
// formatTime

function Statistics() {
    const solveHistory = useSelector(state => state.stopwatch.solveHistory);
    const [bestSolve, setBestSolve] = useState(null);
    const [avg5Current, setAvg5Current] = useState(null);
    const [avg12Current, setAvg12Current] = useState(null);
    const [best5, setBest5] = useState(null);
    const [best12, setBest12] = useState(null);
    const [mean, setMean] = useState(null);

    const getTimeWithPenalties = (solve) => {
        if (solve.isDNF) return Infinity;
        if (solve.isPlus2) return solve.solveTime + 2000;
        return solve.solveTime;
    };

    const calculateAverage = (times) => {
        const validTimes = times.filter(time => time !== Infinity);

        if (validTimes.length < times.length - 1) return 'DNF';
        if (validTimes.length === 0) return 'DNF';

        const maxTime = Math.max(...validTimes);
        const minTime = Math.min(...validTimes);
        const filteredTimes = validTimes.filter(time => time !== maxTime && time !== minTime);

        const avg = filteredTimes.reduce((a, b) => a + b, 0) / filteredTimes.length;
        return (avg / 1000).toFixed(2); // Convert to seconds and format
    };

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
            const timesWithPenalties = solveHistory.map(solve => getTimeWithPenalties(solve));

            // pb
            const bestSolve = Math.min(...timesWithPenalties);
            setBestSolve(bestSolve === Infinity ? 'DNF' : (bestSolve / 1000).toFixed(2));

            // mean
            const validTimesForMean = solveHistory.map(solve => (solve.isDNF ? 0 : solve.solveTime)); // днф не впливають
            const mean = validTimesForMean.reduce((a, b) => a + b, 0) / validTimesForMean.length;
            setMean((mean / 1000).toFixed(2));

            // ao5
            if (timesWithPenalties.length >= 5) {
                const last5 = timesWithPenalties.slice(-5);
                setAvg5Current(calculateAverage(last5));
            }

            // ao12
            if (timesWithPenalties.length >= 12) {
                const last12 = timesWithPenalties.slice(-12);
                setAvg12Current(calculateAverage(last12));
            }

            // best5
            if (timesWithPenalties.length >= 5) {
                let best5 = Infinity;
                for (let i = 0; i <= timesWithPenalties.length - 5; i++) {
                    const slice5 = timesWithPenalties.slice(i, i + 5);
                    const avg5 = calculateAverage(slice5);
                    if (avg5 !== 'DNF' && avg5 < best5) best5 = avg5;
                }
                setBest5(best5 === Infinity ? 'DNF' : best5);
            }

            // best12
            if (timesWithPenalties.length >= 12) {
                let best12 = Infinity;
                for (let i = 0; i <= timesWithPenalties.length - 12; i++) {
                    const slice12 = timesWithPenalties.slice(i, i + 12);
                    const avg12 = calculateAverage(slice12);
                    if (avg12 !== 'DNF' && avg12 < best12) best12 = avg12;
                }
                setBest12(best12 === Infinity ? 'DNF' : best12);
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