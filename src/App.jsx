import './App.css';
import { Provider, useDispatch } from 'react-redux';
import { CubeVisualization } from './components/CubeVisualization.jsx';
import store from './components/slices/slices.jsx';
import Stopwatch from './components/Stopwatch.jsx';
import ResetBtnTest from './components/ResetBtnTest.jsx';
import SolvesInfoContainer from './components/SolvesInfoContainer.jsx';




const App = () => {

  return (
    <div className='flex flex-col min-h-screen'>
      <Provider store={store}>
        <div className='h-10'></div>
        <div className='flex-grow'>
          <Stopwatch />
        </div>
        <ResetBtnTest />
        <SolvesInfoContainer />
      </Provider>
    </div>
  )
}

export default App