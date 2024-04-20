import {Frame} from '$lib/draw/frame';
import axiosInstance from '.';

interface GetStructureInfoResponse {
  frame: Frame;
  structureData: unknown;
}

export async function getCanvasStructure(
  name: string
): Promise<GetStructureInfoResponse> {
  const response = await axiosInstance.get(`/random/${name}`);
  return response.data;
}
