import {createSlice} from '@reduxjs/toolkit';

import {Frame} from '$lib/draw/frame';
import {createEmptyFrame} from '$lib/utils';
import {setStructureFrameReducer} from './reducers';

export interface RootSlice {
  isRunning: boolean;

  structureFrame: Frame;
  structureData: unknown;
}

const initialState: RootSlice = {
  isRunning: false,

  structureFrame: createEmptyFrame(),
  structureData: null,
};

const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setStructureFrame: setStructureFrameReducer,
  },
});

export const {setStructureFrame} = rootSlice.actions;

export default rootSlice.reducer;
