import axiosInstance from '.';

interface GetCheckConnectionReponse {
  message: 'pong';
}

export async function getCheckConnection() {
  const response = await axiosInstance.get<GetCheckConnectionReponse>('/ping');
  return response.data;
}
