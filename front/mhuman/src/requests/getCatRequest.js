import apiInstance from './instance';

export async function getAllCatRequest() {
  const response = await apiInstance.get('/cat');
  return response.data;
}

export async function getRandomCatRequest() { // TODO : add route for random
  const response = await apiInstance.get('/catRandom');
  return response.data;
}

export async function getOneCatRequest() {
  const response = await apiInstance.get('/cat/:id');
  return response.data;
}
