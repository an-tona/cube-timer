import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { stopwatchSlice } from "./slices/slices.jsx";
import scrambleGenerator from "./functions/scrambleGenerator.jsx";
import formatTime from "./functions/formatTime.jsx";
import CopyScramble from './CopyScramble.jsx';

function Stopwatch() {
    const dispatch = useDispatch();
    const state = useSelector(state => state.stopwatch);
    const [scramble, setScramble] = useState(scrambleGenerator());

    const [timeColor, setTimeColor] = useState("black");
    const [isReady, setIsReady] = useState(false);


    useEffect(() => {
        dispatch(stopwatchSlice.actions.reset());
    }, [dispatch]);

    useEffect(() => {
        dispatch(stopwatchSlice.actions.setCurrentScramble({ scramble }));
    }, [scramble, dispatch]);


    //штрафи
    const handlePlus2Click = () => {
        dispatch(stopwatchSlice.actions.togglePlus2({ index : 0 }));
    }

    const handleDNFClick = () => {
        dispatch(stopwatchSlice.actions.toggleDNF({ index : 0 }));
    }

    const latestSolve = state.solveHistory[0];

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
    
                // Зупинка секундоміру і збереження спроби
                if (state.isRunning) {
                    dispatch(stopwatchSlice.actions.stop());
    
                    const newScramble = scrambleGenerator();
                    setScramble(newScramble);

                    dispatch(stopwatchSlice.actions.setScramble({ scramble: newScramble }));
                    dispatch(stopwatchSlice.actions.saveSolve({ scramble: scramble }));
                    setTimeColor("black");
                    setIsReady(false);
    
                } else if (!isReady) {
                    // Якщо не працює, змінюємо колір на червоний
                    setTimeColor("red");
    
                    // Таймер для зміни кольору на зелений через 0.3 секунди
                    pressTimeout = setTimeout(() => {
                        setTimeColor("green");
                        setIsReady(true);
                    }, 150);
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
        <article className="flex flex-col items-center">
            <div className="flex gap-4">
                <p className="scramble">{scramble}</p>
                <CopyScramble scramble={scramble}/>
            </div>
            
            <h1 style={{ color: timeColor }}>{formatTime(state.time)}</h1>
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