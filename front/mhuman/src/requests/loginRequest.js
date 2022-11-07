import apiInstance from './instance';

async function loginRequest(email, password) {
  const response = await apiInstance.post('/user/login', {
    email, password,
  });
  return response.data;
}

export default loginRequest;
