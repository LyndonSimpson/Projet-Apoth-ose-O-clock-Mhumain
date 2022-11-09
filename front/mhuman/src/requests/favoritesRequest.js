import apiInstance from './instance';

export async function catFavoritesRequest() {
  const response = await apiInstance.get('/catfavorites');
  return response.data;
}

export async function humanFavoritesRequest() {
  const response = await apiInstance.get('/humanfavorites');
  return response.data;
}
