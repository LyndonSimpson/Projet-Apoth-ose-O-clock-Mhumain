import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const dataCatProfile = {
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
  fileUpload: [],
};

/** **** CONTEXT ***** */
const AddCatProfileContext = React.createContext({
  addCatInformation: () => {},
  catInformation: [],
});
export default AddCatProfileContext;

/** **** PROVIDER ***** */
export function AddCatProfileContextProvider({ children }) {
  const [catInformation, setCatInformation] = useState(dataCatProfile);

  const addCatInformation = (newCatValue) => {
    setCatInformation((oldState) => ({
      ...oldState,
      ...newCatValue,
    }));
    console.log('catInfo', catInformation);
  };

  const memoizedValue = useMemo(() => ({
    catInformation,
    addCatInformation,
  }), [catInformation]);

  return (
    <AddCatProfileContext.Provider value={memoizedValue}>
      {children}
    </AddCatProfileContext.Provider>
  );
}

AddCatProfileContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
