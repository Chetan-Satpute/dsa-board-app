import {createSlice} from '@reduxjs/toolkit';

import {Frame} from '$lib/draw/frame';
import {createEmptyFrame} from '$lib/utils';

import {setLoadingReducer, setStructureFrameReducer} from './reducers';

export interface RootSlice {
  isLoading: boolean;
  isRunning: boolean;

  structureFrame: Frame;
  structureData: string;
}

const initialState: RootSlice = {
  isLoading: false,
  isRunning: true,

  structureFrame: createEmptyFrame(),
  structureData: '',
};

const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setLoading: setLoadingReducer,
    setStructureFrame: setStructureFrameReducer,
  },
});

export const {setStructureFrame, setLoading} = rootSlice.actions;

export default rootSlice.reducer;
