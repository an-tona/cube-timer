import './App.css';
import { Scramble } from './components/scrambleGenerator.jsx';
import { ScrambleVisualization } from './components/scrambleVisualization.jsx';

const App = () => {
  return (
    <div>
      <Scramble />
      <ScrambleVisualization />
    </div>
  )
}

export default App