import apiInstance, { setToken } from './instance';

export async function loginRequest(email, password) {
  const response = await apiInstance.post('/user/login', {
    email, password,
  });
  setToken(response.data.token);
  localStorage.setItem('Token', response.data.token);
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

export async function resetPasswordRequest(userinfo, routeId, routeToken) {
  const response = await apiInstance.post(`/${routeId}/${routeToken}`, {
    password: userinfo.password,
    passwordConfirm: userinfo.passwordConfirm,
  });
  return response;
}

export async function forgotPasswordRequest(email) {
  const response = await apiInstance.post('/generateMail', {
    email,
  });
  return response.data;
}
