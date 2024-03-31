import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import HomeScreen from '$routes/HomeScreen';
import theme from '$lib/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomeScreen />
    </ThemeProvider>
  );
}

export default App;
