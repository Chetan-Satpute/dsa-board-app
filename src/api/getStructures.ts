import axiosInstance from '.';

export interface GetStructuresResponseData {
  structures: {
    id: string;
    title: string;
    image: string;
  }[];
}

async function getStructures() {
  const response =
    await axiosInstance.get<GetStructuresResponseData>('/structures');

  return response.data;
}

export default getStructures;
