import apiInstance from './instance';

export async function catFavoritesRequest() {
  const response = await apiInstance.get('/catfavorites');
  return response.data;
}

export async function addCatFavoritesRequest(likedId) {
  const response = await apiInstance.post('/humanfavorites', {
    liked_profile_id: likedId,
  });
  return response;
}

export async function deleteCatFavoritesRequest(likedId) {
  const response = await apiInstance.delete('/humanfavorites', {
    data: { liked_profile_id: likedId },
  });
  return response;
}

export async function humanFavoritesRequest() {
  const response = await apiInstance.get('/humanfavorites');
  return response.data;
}

export async function addHumanFavoritesRequest(likedId) {
  const response = await apiInstance.post('/catfavorites', {
    liked_profile_id: likedId,
  });
  return response;
}

export async function deleteHumanFavoritesRequest(likedId) {
  console.log('likedId dans request', likedId);
  const response = await apiInstance.delete('/catfavorites', {
    data: { liked_profile_id: likedId },
  });
  return response;
}
