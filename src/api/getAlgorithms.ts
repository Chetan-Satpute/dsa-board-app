import {Algorithm} from '$lib/algorithm';
import axiosInstance from '.';

interface GetAlgorithmInfoResponse {
  modify: Algorithm[];
  animate: Algorithm[];
}

export async function getAlgorithmInfo(
  structureId: string
): Promise<GetAlgorithmInfoResponse> {
  const response = await axiosInstance.get(`/${structureId}/algorithms`);
  return response.data;
}
