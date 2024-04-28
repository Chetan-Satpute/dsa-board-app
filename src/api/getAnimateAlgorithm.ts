import {Algorithm} from '$lib/algorithm';
import axiosInstance from '.';

interface GetAnimateAlgorithmResponseData {
  algorithm: Algorithm;
  code: string;
}

export async function getAnimateAlgorithm(
  structureId: string,
  algorithmId: string
) {
  const response = await axiosInstance.get<GetAnimateAlgorithmResponseData>(
    `/${structureId}/animate/${algorithmId}`
  );
  return response.data;
}
