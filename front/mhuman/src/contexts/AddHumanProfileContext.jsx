import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const dataHumanProfile = {
  name: '',
  pseudo: '',
  description: '',
  age: '',
  hasPets: 'false',
  hasKids: 'false',
  hasGarden: 'false',
  fileUpload: [],
};

/** **** CONTEXT ***** */
const AddHumanProfileContext = React.createContext({
  addHumanInformation: () => {},
  HumanInformation: [],
});
export default AddHumanProfileContext;

/** **** PROVIDER ***** */
export function AddHumanProfileContextProvider({ children }) {
  const [HumanInformation, setHumanInformation] = useState(dataHumanProfile);

  const addHumanInformation = (newHumanValue) => {
    setHumanInformation((oldState) => ({
      ...oldState,
      ...newHumanValue,
    }));
  };

  const memoizedValue = useMemo(() => ({
    HumanInformation,
    addHumanInformation,
  }), [HumanInformation]);

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
