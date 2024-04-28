import {Action, ThunkDispatch} from '@reduxjs/toolkit';

import {RootSlice, appendSteps, stopRunning} from './rootSlice';
import {getSteps} from '$api/getSteps';

export async function loadSteps(
  dispatch: ThunkDispatch<RootSlice, void, Action>,
  getState: () => RootSlice
) {
  const {runId} = getState();

  let currentPage = 0;

  let retry = true;

  while (retry) {
    try {
      const data = await getSteps(runId, currentPage);
      const steps = data.steps || [];

      if (steps.length !== 0) {
        dispatch(appendSteps(data.steps));
        currentPage++;
      } else {
        retry = false;
      }
    } catch (err: unknown) {
      dispatch(stopRunning);
      retry = false;
    }
  }
}
