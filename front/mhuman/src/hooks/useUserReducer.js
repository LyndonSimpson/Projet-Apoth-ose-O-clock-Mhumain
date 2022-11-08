import { useReducer } from 'react';

const userInitialState = {
  email: '',
  password: '',
  confirmPassword: '',
};

function userReducer(oldState, action) {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...oldState,
        [action.payload.name]: action.payload.value,
      };
    case 'RESET': {
      return userInitialState;
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

export function getActionReset() {
  return {
    type: 'RESET',
  };
}

function useUserReducer() {
  const [userState, userDispatch] = useReducer(userReducer, userInitialState);
  return {
    userState, userDispatch,
  };
}

export default useUserReducer;
