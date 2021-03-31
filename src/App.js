import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import MainAppBar from './Components/AppBar';
import Home from './Pages/Home';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#339B3D',
    },
    secondary: {
      main: '#55C7F8',
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <MainAppBar />
        <Home />
      </ThemeProvider>
    </div>
  );
}

export default App;
