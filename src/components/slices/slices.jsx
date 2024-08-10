import { configureStore, createSlice } from '@reduxjs/toolkit';
import localStorageReducer from '../localStorageReducer';



const stopwatchSlice = createSlice({
    name: 'stopwatch',
    initialState: {
        time: 0, //в мілісекундах
        isRunning: false,
        solve: {
            solveTime: 0,
            scramble: "",
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
        tick(state) {
            state.time += 10;
        },
        setScramble(state, { payload }) {
            const { scramble } = payload;
            state.solve.scramble = scramble;
        },
        saveSolve(state, { payload }) {
            state.solve.solveTime = state.time;
            state.solve.scramble = payload.scramble;
        
            // Пушимо в solveHistory поточний стан solve
            state.solveHistory.push({ ...state.solve });
        
            // Очищуємо solve для наступного використання
            // state.solve = {
            //     solveTime: 0,
            //     scramble: "",
            //     інші поля можна ініціалізувати за необхідності
            // };
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