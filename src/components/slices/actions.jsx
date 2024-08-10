import { useDispatch } from "react-redux";
import { stopwatchSlice } from "./slices";


const actionFullStopStopwatch = (scramble) => {
    dispatch(stopwatchSlice.actions.stop());
    dispatch(stopwatchSlice.actions.setScramble({ scramble: newScramble }));
    dispatch(stopwatchSlice.actions.saveSolve({time: state.time, scramble: scramble}));
}

const actionFullStartStopwatch = () => {

}

export { actionFullStopStopwatch, actionFullStartStopwatch }