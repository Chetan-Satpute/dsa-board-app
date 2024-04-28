import {createSlice} from '@reduxjs/toolkit';

import {Frame} from '$lib/draw/frame';
import {Step} from '$lib/step';
import {createEmptyFrame} from '$lib/utils';

import {
    appendStepsReducer,
  setLoadingReducer,
  setStructureFrameReducer,
  startRunningReducer,
  stopRunningReducer,
} from './reducers';

export interface RootSlice {
  isLoading: boolean;
  isRunning: boolean;

  structureFrame: Frame;
  structureData: string;

  runId: string;

  steps: Step[];
  currentStep: number;
}

const initialState: RootSlice = {
  isLoading: false,
  isRunning: false,

  structureFrame: createEmptyFrame(),
  structureData: '',

  runId: '',

  steps: [],
  currentStep: 0,
};

const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setLoading: setLoadingReducer,
    setStructureFrame: setStructureFrameReducer,
    startRunning: startRunningReducer,
    appendSteps: appendStepsReducer,
    stopRunning: stopRunningReducer,
  },
});

export const {setStructureFrame, setLoading, startRunning, appendSteps, stopRunning} =
  rootSlice.actions;

export default rootSlice.reducer;
