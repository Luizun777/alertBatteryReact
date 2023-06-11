import logo from './logo.svg';
import './App.css';
import { useBattery } from './hooks/useBattery';

function App() {

  const { bettery, charging } = useBattery();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Battery Level: {bettery}%</h1>
        <h1>Charging state changed: {charging ? 'Charging' : 'Not charging'}</h1>
      </header>
    </div>
  );
}

export default App;
