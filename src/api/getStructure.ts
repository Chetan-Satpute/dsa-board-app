import {Frame} from '$lib/draw/frame';
import axiosInstance from '.';

interface GetStructureInfoResponse {
  frame: Frame;
  structureData: unknown;
}

export async function getCanvasStructure(
  structureId: string
): Promise<GetStructureInfoResponse> {
  const response = await axiosInstance.get(`/random/${structureId}`);
  return response.data;
}
