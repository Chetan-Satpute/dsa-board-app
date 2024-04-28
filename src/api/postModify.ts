import {Frame} from '$lib/draw/frame';

import axiosInstance from '.';

export interface PostModifyResponseData {
  structureFrame: Frame;
  structureData: string;
}

export async function postModify(
  structureId: string,
  modifyAlgorithmId: string,
  structureData: string,
  args: unknown
): Promise<PostModifyResponseData> {
  const response = await axiosInstance.post(
    `/${structureId}/modify/${modifyAlgorithmId}`,
    {
      structureData: structureData,
      arguments: args,
    }
  );

  return response.data;
}
