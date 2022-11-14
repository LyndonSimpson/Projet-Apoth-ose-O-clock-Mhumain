import apiInstance from './instance';

export async function deleteCatProfile() {
  const response = await apiInstance.delete('/cat');
  return response;
}

export async function deleteHumanProfile() {
  const response = await apiInstance.delete('/human');
  return response;
}
