import apiInstance from './instance';

export async function catProfilesRequest() {
  const response = await apiInstance.get('/usercats');
  return response.data;
}

export async function addCatProfileRequest(data) {
  const response = await apiInstance.post('/cat/signup', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function updateCatProfileRequest(data) {
  const response = await apiInstance.patch('/catupdate', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function humanProfilesRequest() {
  const response = await apiInstance.get('/userhumans');
  return response.data;
}

export async function updateHumanProfileRequest(data) {
  const response = await apiInstance.patch('/humanupdate', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function addHumanProfileRequest(data) {
  const response = await apiInstance.post('/human/signup', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}