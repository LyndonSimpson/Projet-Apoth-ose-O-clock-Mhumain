import apiInstance from './instance';

export async function catProfilesRequest() {
  const response = await apiInstance.get('/usercats');
  return response.data;
}

export async function addCatProfileRequest(payload) {
  const response = await apiInstance.post('/cat/signup', {
    image: payload.image, // TODO : gérer les images (upload sur public et envoyer le nom de l'image)
    pseudo: payload.pseudo,
    name: payload.name,
    description: payload.description,
    color: payload.color,
    age: payload.age,
    race: payload.race,
    sexe: payload.sexe,
    likes_pets: payload.likesPets,
    likes_kids: payload.likesKids,
    needs_garden: payload.needsGarden,
  });
  return response.data;
}

export async function humanProfilesRequest() {
  const response = await apiInstance.get('/userhumans');
  return response.data;
}
