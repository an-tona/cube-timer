import './App.css';
import 'normalize.css';
import { Provider } from 'react-redux';
import store from './components/slices/slices.jsx';
import Stopwatch from './components/Stopwatch.jsx';
import ResetBtnTest from './components/ResetBtnTest.jsx';
import SolvesInfoContainer from './components/SolvesInfoContainer.jsx';
import NumberInputForm from './components/functions/populateSolvesTEST.jsx';


const App = () => {
  return (
    <div className='flex flex-col min-h-screen pt-10'>
      <Provider store={store}>
        <div className='flex-grow'>
          <Stopwatch />
        </div>
        <div className='mt-auto'>
          <ResetBtnTest />
          <NumberInputForm />
        </div>
        <div>
          <SolvesInfoContainer />
        </div>
      </Provider>
    </div>
  );
};

export default App;