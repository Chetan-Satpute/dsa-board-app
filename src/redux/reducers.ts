import {PayloadAction} from '@reduxjs/toolkit';
import {RootSlice} from './rootSlice';
import {Frame} from '$lib/draw/frame';

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
