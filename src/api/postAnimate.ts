import axiosInstance from '.';

export interface PostAnimateResponseData {
  runId: string;
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
