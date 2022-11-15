import apiInstance from './instance';

export async function catProfilesRequest() {
  const response = await apiInstance.get('/usercats');
  return response.data;
}

export async function addCatProfileRequest(data) {
  const response = await apiInstance.post('/cat/signup', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response;
}

export async function updateCatProfileRequest(data) {
  const response = await apiInstance.patch('/catupdate', data);
  return response;
}

export async function updateCatImageProfileRequest(data) {
  const response = await apiInstance.patch('/catupdateImage', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response;
}

export async function humanProfilesRequest() {
  const response = await apiInstance.get('/userhumans');
  return response.data;
}

export async function updateHumanProfileRequest(data) {
  const response = await apiInstance.patch('/humanupdate', data);
  return response;
}

export async function updateHumanImageProfileRequest(data) {
  const response = await apiInstance.patch('/humanupdateImage', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response;
}

export async function addHumanProfileRequest(data) {
  const response = await apiInstance.post('/human/signup', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response;
}

export async function updateUserRequest(data) {
  const response = await apiInstance.patch('/user', data);
  return response.data;
}

export async function deleteUserRequest() {
  const response = await apiInstance.delete('/user');
  return response.data;
}

export async function getOneUserRequest() {
  const response = await apiInstance.get('/userProfile');
  return response.data;
}
