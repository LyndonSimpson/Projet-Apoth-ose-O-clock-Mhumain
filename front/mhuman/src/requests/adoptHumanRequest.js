import apiInstance from './instance';

async function adoptMyHuman(humanId) {
  const response = await apiInstance.patch('/catadopt', {
    human_id: humanId,
  });
  return response;
}

export default adoptMyHuman;
