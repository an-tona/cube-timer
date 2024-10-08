import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { stopwatchSlice } from "./slices/slices.jsx";
import scrambleGenerator from "./functions/scrambleGenerator.jsx";
import formatTime from "./functions/formatTime.jsx";
import CopyScramble from './CopyScramble.jsx';

function Stopwatch() {
    const dispatch = useDispatch();
    const solveHistory = useSelector(state => state.stopwatch.solveHistory);
    const [scramble, setScramble] = useState(scrambleGenerator());

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [timeColor, setTimeColor] = useState("black");
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setScramble(scrambleGenerator());
    }, []);

    // сам секундомір
    useEffect(() => {
        if (!isRunning) return;

        const intervalId = setInterval(() => {
            setTime((prevTime) => prevTime + 10);
        }, 10);

        return () => clearInterval(intervalId);
    }, [isRunning]);

    const saveSolve = (solveTime) => {
        dispatch(stopwatchSlice.actions.saveSolve({ scramble, solveTime }));
    };

    const handlePlus2Click = () => {
        if (solveHistory.length > 0) {
            dispatch(stopwatchSlice.actions.togglePlus2({ index: 0 }));
        }
    };

    const handleDNFClick = () => {
        if (solveHistory.length > 0) {
            dispatch(stopwatchSlice.actions.toggleDNF({ index: 0 }));
        }
    };

    const latestSolve = solveHistory[0];

    //space
    useEffect(() => {
        let pressTimeout;

        const handleKeyDown = (event) => {
            if (event.code === "Space") {
                event.preventDefault();

                if (isRunning) {
                    // Зупинити секундомір і зберегти спробу
                    setIsRunning(false);
                    saveSolve(time);
                    
                    setScramble(scrambleGenerator());
                    setTimeColor("black");
                    setIsReady(false);
                } else if (!isReady) {
                    setTimeColor("red");

                    pressTimeout = setTimeout(() => {
                        setTimeColor("green");
                        setIsReady(true);
                    }, 150);
                }
            }
        };

        const handleKeyUp = (event) => {
            if (event.code === "Space" && !isRunning) {
                if (isReady) {
                    // Запустити секундомір
                    setIsRunning(true);
                    setTime(0);
                }

                setTimeColor("black");
                clearTimeout(pressTimeout);
                setIsReady(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            clearTimeout(pressTimeout);
        };
    }, [isRunning, isReady, time]);

    return (
        <article className="flex flex-col items-center">
            <div className="flex gap-4">
                <p className="scramble">{scramble}</p>
                <CopyScramble scramble={scramble}/>
            </div>

            <h1 style={{ color: timeColor }}>{formatTime(time)}</h1>
            <div>
                <span className="cursor-pointer"
                onClick={handlePlus2Click}
                style={{ color: latestSolve?.isPlus2 ? 'red' : 'black', transition: '200ms' }}
                >
                    +2
                </span>
                <span> | </span>
                <span className="cursor-pointer"
                onClick={handleDNFClick}
                style={{ color: latestSolve?.isDNF ? 'red' : 'black', transition: '200ms' }}
                >
                    DNF
                </span>
            </div>
        </article>
    );
}

export default Stopwatch;