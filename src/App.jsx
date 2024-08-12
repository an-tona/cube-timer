import './App.css';
import { Provider, useDispatch } from 'react-redux';
import { CubeVisualization } from './components/CubeVisualization.jsx';
import store from './components/slices/slices.jsx';
import Stopwatch from './components/Stopwatch.jsx';


const App = () => {



  return (
    <div>
      <Provider store={store}>
      <Stopwatch />
      <div className='w-96'>
        {/* <CubeVisualization /> */}
      </div>
      
      </Provider>
    </div>
  )
}

export default App