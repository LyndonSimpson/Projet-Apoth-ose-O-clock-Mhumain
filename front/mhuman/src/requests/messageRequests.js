import apiInstance from './instance';

export async function getCatMessageRequest(receiverId) {
  const response = await apiInstance.post('/getcatmessages', { receiver_profile_id: receiverId });
  console.log('getCatMessageRequest>>>', response);
  return response.data;
}

export async function sendCatMessagesRequest(id, content, pseudo) {
  console.log('bodyDansSendCat>>', {
    receiver_profile_id: id,
    content,
    pseudo,
  });
  const response = await apiInstance.post('/sendcatmessages', {
    receiver_profile_id: id,
    content,
    pseudo,
  });
  console.log('sendCatMessagesRequest>>>', response);
  return response.data;
}

export async function getHumanMessageRequest(receiverId) { // TODO : add route for random
  const response = await apiInstance.post('/gethumanmessages', { receiver_profile_id: receiverId });
  console.log('getHumanMessageRequest>>>', response);
  return response.data;
}

export async function sendHumanMessagesRequest(id, content, pseudo) { // TODO : add route for random
  console.log('bodyDansSendCat>>', {
    receiver_profile_id: id,
    content,
    pseudo,
  });
  const response = await apiInstance.post('/sendhumanmessages', {
    receiver_profile_id: id,
    content,
    pseudo,
  });
  console.log('sendHumanMessagesRequest>>>', response);
  return response.data;
}
