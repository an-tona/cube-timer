import './App.css';
import { Provider } from 'react-redux';
import { ScrambleVisualization } from './components/scrambleVisualization.jsx';
import store from './components/slices/slices.jsx';

const App = () => {
  return (
    <div>
      <Provider store={store}>
      <ScrambleVisualization />
      </Provider>
    </div>
  )
}

export default App