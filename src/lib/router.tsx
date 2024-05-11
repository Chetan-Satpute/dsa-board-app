import {Suspense, lazy} from 'react';
import {RouterProvider, createHashRouter} from 'react-router-dom';

import ConnectServerScreen from '$routes/ConnectServerScreen';

const HomeScreenPromise = import('$routes/HomeScreen');
const HomeScreen = lazy(() => HomeScreenPromise);

const StructureScreenPromise = import('$routes/StructureScreen');
const StructureScreen = lazy(() => StructureScreenPromise);

const AlgorithmPanelPromise = import('$routes/StructureScreen/AlgorithmPanel');
const AlgorithmPanel = lazy(() => AlgorithmPanelPromise);

const StructurePanelPromise = import('$routes/StructureScreen/StructurePanel');
const StructurePanel = lazy(() => StructurePanelPromise);

import Loading from '$components/Loading';

const router = createHashRouter([
  {
    path: '/',
    element: <ConnectServerScreen />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<Loading />}>
            <HomeScreen />
          </Suspense>
        ),
      },
      {
        path: '/:structureId/',
        element: (
          <Suspense fallback={<Loading />}>
            <StructureScreen />
          </Suspense>
        ),
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<Loading />}>
                <StructurePanel />
              </Suspense>
            ),
          },
          {
            path: ':algorithmId',
            element: (
              <Suspense fallback={<Loading />}>
                <AlgorithmPanel />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

// cannot export router directly
// eslint gives a false positive warning about fast refresh
// https://github.com/ArnaudBarre/eslint-plugin-react-refresh/issues/25
function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
