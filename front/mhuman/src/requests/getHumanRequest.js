import apiInstance from './instance';

export async function getAllHumanRequest() {
  const response = await apiInstance.get('/human');
  return response.data;
}

export async function getRandomHumanRequest() { // TODO : add route for random
  const response = await apiInstance.get('/humanRandom');
  return response.data;
}

export async function getOneHumanRequest() {
  const response = await apiInstance.get('/human/:id');
  return response.data;
}
