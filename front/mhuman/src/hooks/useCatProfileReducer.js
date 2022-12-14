import { useReducer } from 'react';

const catProfileInitialState = {
  name: '',
  pseudo: '',
  description: '',
  age: '',
  color: '',
  sexe: 'male',
  race: 'Chat de gouttière',
  likes_pets: 'false',
  likes_kids: 'false',
  needs_garden: 'false',
  fileUpload: null,
};

function catProfileReducer(oldState, action) {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...oldState,
        [action.payload.name]: action.payload.value,
      };
    case 'INIT_VALUE':
      return action.payload;
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

export function getActionInitValue(obj) {
  return {
    type: 'INIT_VALUE',
    payload: obj,
  };
}

function useCatProfileReducer() {
  const [catProfileState, catProfileDispatch] = useReducer(catProfileReducer, catProfileInitialState);
  return {
    catProfileState, catProfileDispatch,
  };
}

export default useCatProfileReducer;
