import {PayloadAction} from '@reduxjs/toolkit';
import {RootSlice} from './rootSlice';
import {Frame} from '$lib/draw/frame';
import {Step} from '$lib/step';

export function setLoadingReducer(
  state: RootSlice,
  action: PayloadAction<boolean>
) {
  state.isLoading = action.payload;
}

export function setStructureFrameReducer(
  state: RootSlice,
  action: PayloadAction<{structureFrame: Frame; structureData: string}>
) {
  state.structureFrame = action.payload.structureFrame;
  state.structureData = action.payload.structureData;
}

export function startRunningReducer(
  state: RootSlice,
  action: PayloadAction<string>
) {
  state.isRunning = true;
  state.runId = action.payload;
}

export function appendStepsReducer(state: RootSlice, action: PayloadAction<Step[]>) {
  state.steps = [...state.steps, ...action.payload];
}

export function stopRunningReducer(state: RootSlice) {
  state.isRunning = false;
  state.runId = '';
  state.steps = [];
}
