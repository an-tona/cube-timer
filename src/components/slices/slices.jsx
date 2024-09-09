import { configureStore, createSlice } from '@reduxjs/toolkit';
import localStorageReducer from '../functions/localStorageReducer';


const stopwatchSlice = createSlice({
    name: 'stopwatch',
    initialState: {
        time: 0, //в мілісекундах
        isRunning: false,
        currentScramble: '',
        solve: {
            solveTime: 0,
            scramble: '',
            solveDate: '',
            // event: '',
            isPlus2: false,
            isDNF: false,
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
        tick(state) {
            state.time += 10;
        },
        setCurrentScramble(state, { payload }) {
            const { scramble } = payload;
            state.currentScramble = scramble;
        },
        setScramble(state, { payload }) {
            const { scramble } = payload;
            state.solve.scramble = scramble;
        },
        togglePlus2(state, { payload }) {
            const { index } = payload;
            const currentSolve = state.solveHistory[index];
      
            currentSolve.isPlus2 = !currentSolve.isPlus2;
            if (currentSolve.isPlus2) {
              currentSolve.isDNF = false;
            }
          },
          toggleDNF(state, { payload }) {
            const { index } = payload;
            const currentSolve = state.solveHistory[index];
      
            currentSolve.isDNF = !currentSolve.isDNF;
            if (currentSolve.isDNF) {
              currentSolve.isPlus2 = false;
            }
          },
        saveSolve(state, { payload }) {
            state.solve.solveTime = state.time;
            state.solve.scramble = payload.scramble;
            state.solveHistory.unshift({ ...state.solve });

            const solveDate = new Date().toISOString();
            state.solve.solveDate = solveDate;
        },
        deleteSolve(state, { payload }) {
            state.solveHistory = state.solveHistory.filter((_, index) => index !== payload.index);
        },
        resetSolveHistory(state) {
            state.solveHistory = [];
        }
    } 
});

const store = configureStore({
    reducer: {
        [stopwatchSlice.name]: localStorageReducer(stopwatchSlice.reducer, 'stopwatch'),
    },
  });



//console log for dev
let prevState = store.getState();
store.subscribe(() => {
    const currentState = store.getState();
    if (
        currentState.stopwatch.isRunning !== prevState.stopwatch.isRunning ||
        currentState.stopwatch.solve !== prevState.stopwatch.solve ||
        currentState.stopwatch.solveHistory !== prevState.stopwatch.solveHistory
    ) {
        console.log('store changed', currentState);
    }
    prevState = currentState;
});

export { stopwatchSlice }

export default store;