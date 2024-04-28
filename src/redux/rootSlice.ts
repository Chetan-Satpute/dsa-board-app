import {createSlice} from '@reduxjs/toolkit';

import {Frame} from '$lib/draw/frame';
import {Step} from '$lib/step';
import {createEmptyFrame} from '$lib/utils';

import {
  setLoadingReducer,
  appendStepsReducer,
  setStructureFrameReducer,
  startRunningReducer,
  stopRunningReducer,
  updateCurrentStepReducer,
} from './reducers';

export interface RootSlice {
  isLoading: boolean;
  isRunning: boolean;

  structureFrame: Frame;
  structureData: string;

  runId: string;

  steps: Step[];
  currentStep: number;
  totalSteps: number;
}

const initialState: RootSlice = {
  isLoading: false,
  isRunning: false,

  structureFrame: createEmptyFrame(),
  structureData: '',

  runId: '',

  steps: [],
  currentStep: 0,
  totalSteps: 0,
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
    updateCurrentStep: updateCurrentStepReducer,
  },
});

export const {
  setStructureFrame,
  setLoading,
  startRunning,
  appendSteps,
  stopRunning,
  updateCurrentStep,
} = rootSlice.actions;

export default rootSlice.reducer;
