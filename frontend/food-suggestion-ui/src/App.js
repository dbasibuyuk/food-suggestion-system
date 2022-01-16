import './App.css';
import Board from './components/Board';
import Container from '@mui/material/Container';
function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <Board />
      </Container>
    </div>
  );
}

export default App;
