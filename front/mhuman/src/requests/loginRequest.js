import apiInstance from './instance';

async function loginRequest(email, password) {
  const response = await apiInstance.post('/user/login', {
    email, password,
  });
  return response.data;
}

export async function catLoginRequest(pseudo) {
  const response = await apiInstance.post('/cat/login', {
    pseudo,
  });
  setToken(response.data.token);
  localStorage.setItem('Token', response.data.token);
  return response.data;
}

export async function humanLoginRequest(pseudo) {
  const response = await apiInstance.post('/human/login', {
    pseudo,
  });
  setToken(response.data.token);
  localStorage.setItem('Token', response.data.token);
  return response.data;
}

export default loginRequest;

