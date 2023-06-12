import logo from './logo.svg';
import './App.css';
import { useBattery } from './hooks/useBattery';

function App() {

  const { bettery, charging, sentMessage, permissionNotification } = useBattery();

  return (
    <div className="App">
      <header className="App-header">
        <div className="contenido-title">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Battery Level: {bettery}%</h1>
        </div>
        <h1>Charging state changed: {charging ? 'Charging' : 'Not charging'}</h1>
        <h2>⚠️Make sure to enable browser permissions: background sync.⚠️</h2>
        {
          !permissionNotification && <h2>The permissions to notify are not enabled.</h2>
        }
        {/* <button onClick={()=> sentMessage('Prueba', '1218607412')}>Salida</button>
        <button onClick={()=> sentMessage('Prueba', '6206194345')}>Casa</button> */}
        <p>Con telegram</p>
      </header>
    </div>
  );
}

export default App;
