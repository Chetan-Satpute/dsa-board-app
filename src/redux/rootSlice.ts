import {createSlice} from '@reduxjs/toolkit';

import {Frame} from '$lib/draw/frame';
import {createEmptyFrame} from '$lib/utils';

export interface RootSlice {
  isRunning: boolean;

  structureFrame: Frame;
}

const initialState: RootSlice = {
  isRunning: false,

  structureFrame: createEmptyFrame(),
};

const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {},
});

// export const {} = rootSlice.actions;

export default rootSlice.reducer;
