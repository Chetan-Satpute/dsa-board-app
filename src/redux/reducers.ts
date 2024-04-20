import {PayloadAction} from '@reduxjs/toolkit';
import {RootSlice} from './rootSlice';
import {Frame} from '$lib/draw/frame';

export function setStructureFrameReducer(
  state: RootSlice,
  action: PayloadAction<{frame: Frame; structureData: unknown}>
) {
  state.structureFrame = action.payload.frame;
  state.structureData = action.payload.structureData;
}
