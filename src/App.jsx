import './App.css';
import { Provider } from 'react-redux';
import { CubeVisualization } from './components/CubeVisualization.jsx';
import store from './components/slices/slices.jsx';

const App = () => {
  return (
    <div>
      <Provider store={store}>
      <CubeVisualization />
      </Provider>
    </div>
  )
}

export default App