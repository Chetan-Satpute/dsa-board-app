import {Frame} from '$lib/draw/frame';
import axiosInstance from '.';

export interface PostAnimateResponseData {
  runId: string;
  totalSteps: number;
  structureFrame: Frame;
  structureData: string;
}

export async function postAnimate(
  structureId: string,
  animateAlgorithmId: string,
  structureData: string,
  args: unknown
) {
  const response = await axiosInstance.post<PostAnimateResponseData>(
    `/${structureId}/animate/${animateAlgorithmId}`,
    {
      structureData: structureData,
      arguments: args,
    }
  );

  return response.data;
}
