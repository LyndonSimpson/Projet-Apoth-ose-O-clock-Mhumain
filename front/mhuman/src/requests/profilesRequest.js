import apiInstance from './instance';

export async function catProfilesRequest() {
  const response = await apiInstance.get('/usercats');
  return response.data;
}

export async function humanProfilesRequest() {
  const response = await apiInstance.get('/userhumans');
  return response.data;
}
