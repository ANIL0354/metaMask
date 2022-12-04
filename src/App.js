import logo from './logo.svg';
import './App.css';
import WalletCard from './components/wildCards';
import WalletCardEthers from'./components/wildCardEthers';
function App() {

  return (
    <div className="App">
    <WalletCard/>
    <WalletCardEthers/>
    </div>
  );
}

export default App;
