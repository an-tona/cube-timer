import { configureStore, createSlice } from '@reduxjs/toolkit';


const stopwatchSlice = createSlice({
    name: 'stopwatch',
    initialState: {
        time: 0,
        isRunning: false,
        solve: {
            solveTime: 0,
            scramble: "U2 F2 R2 U' L2 D B R' B R' B R' D' L2 U'",
            // solveDate: '',
            // event: '',
            // isPlus2: false,
            // isDNF: false,
            // notes: ''
        },
        solveHistory: [],
    },
    reducers: {
        start(state) {
            state.isRunning = true;
        },
        stop(state) {
            state.isRunning = false;
        },
        reset(state) {
            state.time = 0;
            state.isRunning = false;
        },
        tick() {},
        setScramble(state, action) {
            const {scramble} = action.payload;
            state.solve.scramble = scramble;
        },
    }
});

const store = configureStore({
    reducer: {
        [stopwatchSlice.name]: stopwatchSlice.reducer,
    },
  });

store.subscribe(() => console.log('store', store.getState()));

export { stopwatchSlice }

export default store;