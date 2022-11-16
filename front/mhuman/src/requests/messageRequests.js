import apiInstance from './instance';

export async function getCatMessageRequest() {
  const response = await apiInstance.get('/catmessage');
  console.log(response);
  return response.data;
}

export async function addCatMessageRequest(content) {
  const response = await apiInstance.post('/catmessage', { content });
  console.log(response);
  return response.data;
}

export async function getHumanMessageRequest() { // TODO : add route for random
  const response = await apiInstance.get('/humanmessages');
  console.log(response);
  return response.data;
}

export async function addHumanMessageRequest(content) { // TODO : add route for random
  const response = await apiInstance.post('/humanmessages', { content });
  console.log(response);
  return response.data;
}
