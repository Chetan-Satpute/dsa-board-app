import {RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import {QueryClientProvider} from '@tanstack/react-query';

import theme from '$lib/theme';
import router from '$lib/router';
import queryClient from '$lib/queryClient';
import {store} from '$redux/store';

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
