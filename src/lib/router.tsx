import {createBrowserRouter} from 'react-router-dom';

import HomeScreen from '$routes/HomeScreen';
import StructureScreen from '$routes/StructureScreen';
import AlgorithmPanel from '$routes/StructureScreen/AlgorithmPanel';
import StructurePanel from '$routes/StructureScreen/StructurePanel';

const router = createBrowserRouter([
  {
    path: '/',
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
        element: <AlgorithmPanel />,
      },
    ],
  },
]);

export default router;
