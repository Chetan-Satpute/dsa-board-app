import {createBrowserRouter} from 'react-router-dom';

import ConnectServerScreen from '$routes/ConnectServerScreen';
import HomeScreen from '$routes/HomeScreen';
import StructureScreen from '$routes/StructureScreen';
import StructurePanel from '$routes/StructureScreen/StructurePanel';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ConnectServerScreen />,
    children: [
      {
        path: '',
        element: <HomeScreen />,
      },
      {
        path: '/:structureId/',
        element: <StructureScreen />,
        children: [
          {
            path: '',
            element: <StructurePanel />,
          },
          {
            path: ':algorithmId',
            lazy: async () => ({
              Component: (
                await import('$routes/StructureScreen/AlgorithmPanel')
              ).default,
            }),
          },
        ],
      },
    ],
  },
]);

export default router;
