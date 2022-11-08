import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const LoginInitialContext = {
  isLogged: false,
  userEmail: '',
  profilePseudo: '',
  type: '',
};

/** **** CONTEXT ***** */
const LoginContext = React.createContext({
  addLoginInformation: () => {},
  loginInformation: [],
});
export default LoginContext;

/** **** PROVIDER ***** */
export function LoginContextProvider({ children }) {
  const [loginInformation, setLoginInformation] = useState(LoginInitialContext);

  const addLoginInformation = (newLoginValue) => {
    setLoginInformation((oldState) => ({
      ...oldState,
      ...newLoginValue,
    }));
  };

  const memoizedValue = useMemo(() => ({
    loginInformation,
    addLoginInformation,
  }), [loginInformation]);

  return (
    <LoginContext.Provider value={memoizedValue}>
      {children}
    </LoginContext.Provider>
  );
}

LoginContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
