import {Algorithm} from '$lib/algorithm';
import axiosInstance from '.';

interface GetAlgorithmInfoResponse {
  modify: Algorithm[];
  animate: Algorithm[];
}

export async function getAlgorithmInfo(
  structureId: string
): Promise<GetAlgorithmInfoResponse> {
  const response = await axiosInstance.get(`/algorithm/${structureId}`);
  return response.data;
}
