import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const dataHumanProfile = {
  name: '',
  pseudo: '',
  description: '',
  age: '',
  has_pets: 'false',
  has_kids: 'false',
  has_garden: 'false',
  fileUpload: [],
};

/** **** CONTEXT ***** */
const AddHumanProfileContext = React.createContext({
  addHumanInformation: () => {},
  humanInformation: [],
});
export default AddHumanProfileContext;

/** **** PROVIDER ***** */
export function AddHumanProfileContextProvider({ children }) {
  const [humanInformation, setHumanInformation] = useState(dataHumanProfile);

  const addHumanInformation = (newHumanValue) => {
    setHumanInformation((oldState) => ({
      ...oldState,
      ...newHumanValue,
    }));
  };

  const memoizedValue = useMemo(() => ({
    humanInformation,
    addHumanInformation,
  }), [humanInformation]);

  return (
    <AddHumanProfileContext.Provider value={memoizedValue}>
      {children}
    </AddHumanProfileContext.Provider>
  );
}

AddHumanProfileContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
