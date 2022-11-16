import apiInstance from './instance';

export async function getCatMessageRequest(receiverId) {
  const response = await apiInstance.post('/getcatmessages', { receiver_profile_id: receiverId });
  return response.data;
}

export async function sendCatMessagesRequest(id, content, pseudo) {
  const response = await apiInstance.post('/sendcatmessages', {
    receiver_profile_id: id,
    content,
    pseudo,
  });
  return response.data;
}

export async function getCatConversationsRequest() { // TODO : add route for random
  const response = await apiInstance.get('/catcontacts');
  console.log('inRequest', response);
  return response.data;
}

export async function getHumanMessageRequest(receiverId) { // TODO : add route for random
  const response = await apiInstance.post('/gethumanmessages', { receiver_profile_id: receiverId });
  return response.data;
}

export async function sendHumanMessagesRequest(id, content, pseudo) { // TODO : add route for random
  const response = await apiInstance.post('/sendhumanmessages', {
    receiver_profile_id: id,
    content,
    pseudo,
  });
  return response.data;
}

export async function getHumanConversationsRequest() { // TODO : add route for random
  const response = await apiInstance.get('/humancontacts');
  console.log('inRequest', response);
  return response.data;
}
