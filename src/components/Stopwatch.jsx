import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { stopwatchSlice } from "./slices/slices.jsx";
import scrambleGenerator from "./scrambleGenerator.jsx";
import { actionFullStopStopwatch } from "./slices/actions.jsx";
import { CubeVisualization } from "./CubeVisualization.jsx";



function Stopwatch() {
    const dispatch = useDispatch();
    const state = useSelector(state => state.stopwatch);
    const [scramble, setScramble] = useState(scrambleGenerator());

    const [timeColor, setTimeColor] = useState("black");
    const [isReady, setIsReady] = useState(false);


    useEffect(() => {
        dispatch(stopwatchSlice.actions.reset());
    }, [dispatch]);

    //сам секундомір
    useEffect(() => {
        if (!state.isRunning) {
            return;
        }
        const intervalId = setInterval(() => {
            dispatch(stopwatchSlice.actions.tick());
        }, 10);

        return () => clearInterval(intervalId);
    }, [state.isRunning, dispatch]);

    //space
    useEffect(() => {
        let pressTimeout;
    
        const handleKeyDown = (event) => {
            if (event.code === "Space") {
                event.preventDefault();
    
                // Якщо секундомір працює
                if (state.isRunning) {
                    dispatch(stopwatchSlice.actions.stop());
    
                    const newScramble = scrambleGenerator();
                    setScramble(newScramble);
                    dispatch(stopwatchSlice.actions.setScramble({ scramble: newScramble }));
                    dispatch(stopwatchSlice.actions.saveSolve({ scramble: scramble }));
                    setTimeColor("black");
                    setIsReady(false);
    
                } else if (!isReady) {  // Додаємо цю перевірку
                    // Якщо не працює, змінюємо колір на червоний
                    setTimeColor("red");
    
                    // Таймер для зміни кольору на зелений через 0.3 секунди
                    pressTimeout = setTimeout(() => {
                        setTimeColor("green");
                        setIsReady(true);
                    }, 300);
                }
            }
        };
    
        const handleKeyUp = (event) => {
            if (event.code === "Space" && !state.isRunning) {
                // Якщо пройшло 0.3 секунди, запускаємо секундомір
                if (isReady) {
                    dispatch(stopwatchSlice.actions.reset());
                    dispatch(stopwatchSlice.actions.start());
                }
    
                // Скидаємо колір тексту на чорний
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
    }, [state.isRunning, isReady, dispatch]);

    return (
        <>
            <div>{scramble}</div>
            <h1 style={{ color: timeColor }}>{(state.time / 1000).toFixed(2)}</h1>
            <CubeVisualization scramble={scramble}/>
        </>
    );
}

export default Stopwatch;