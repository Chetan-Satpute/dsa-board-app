import {Step} from '$lib/step';
import axiosInstance from '.';

interface GetStepsResponseData {
  steps: Step[];
}

export async function getSteps(runId: string, page: number) {
  const response = await axiosInstance.get<GetStepsResponseData>(
    `/step/${runId}/${page}`
  );
  return response.data;
}
