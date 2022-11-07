import { useReducer } from 'react';

const catProfileInitialState = {
  name: '',
  pseudo: '',
  description: '',
  age: '',
  color: '',
  sexe: '',
  breed: '',
  likesPets: 'false',
  likesKids: 'false',
  needsGarden: 'false',
  image: [],
};

function catProfileReducer(oldState, action) {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...oldState,
        [action.payload.name]: action.payload.value,
      };
    case 'RESET': {
      return catProfileInitialState;
    }
    default:
      return oldState;
  }
}

export function getActionSetValue(name, value) {
  return {
    type: 'SET_VALUE',
    payload: {
      name, value,
    },
  };
}

function useCatProfileReducer() {
  const [catProfileState, catProfileDispatch] = useReducer(catProfileReducer, catProfileInitialState);
  return {
    catProfileState, catProfileDispatch,
  };
}

export default useCatProfileReducer;
