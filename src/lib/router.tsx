import {createBrowserRouter} from 'react-router-dom';

import HomeScreen from '$routes/HomeScreen';
import StructureScreen from '$routes/StructureScreen';
import AlgorithmScreen from '$routes/AlgorhtmScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeScreen />,
  },
  {
    path: '/:structureId',
    element: <StructureScreen />,
  },
  {
    path: '/:structureId/:algorithmId',
    element: <AlgorithmScreen />,
  },
]);

export default router;
