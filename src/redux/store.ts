import {configureStore} from '@reduxjs/toolkit';

import rootSliceReducer from './rootSlice';

export const store = configureStore({
  reducer: rootSliceReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
