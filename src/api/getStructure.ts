import {Frame} from '$lib/draw/frame';
import axiosInstance from '.';

interface GetStructureInfoResponse {
  structureFrame: Frame;
  structureData: string;
}

export async function getCanvasStructure(
  structureId: string
): Promise<GetStructureInfoResponse> {
  const response = await axiosInstance.get(`/${structureId}/random`);
  return response.data;
}
