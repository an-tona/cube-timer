import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { stopwatchSlice } from "./slices";
import scrambleGenerator from "../scrambleGenerator";
import { actionFullStopStopwatch } from "./actions";



function Stopwatch() {
    const dispatch = useDispatch();
    const state = useSelector(state => state.stopwatch);
    const [scramble, setScramble] = useState(scrambleGenerator());


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
        const handleKeyDown = (event) => {
            event.preventDefault();
            if (event.code === "Space") {
                if (state.isRunning) {
                    dispatch(stopwatchSlice.actions.stop());
                    
                    const newScramble = scrambleGenerator();
                    setScramble(newScramble);
                    // dispatch(actionFullStopStopwatch(newScramble));
                    dispatch(stopwatchSlice.actions.setScramble({ scramble: newScramble }));
                    dispatch(stopwatchSlice.actions.saveSolve({ scramble: scramble}));
                } else {
                    dispatch(stopwatchSlice.actions.reset());
                    dispatch(stopwatchSlice.actions.start());
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [state.isRunning, dispatch]);

    return (
        <>
            <div>{scramble}</div>
            <div>{(state.time / 1000).toFixed(2)}</div>
        </>
    );
}

export default Stopwatch;