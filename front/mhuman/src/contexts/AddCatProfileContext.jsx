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
  image: [],
};

/** **** CONTEXT ***** */
const AddCatProfileContext = React.createContext({
  addCatInformation: () => {},
  catInformation: {},
});
export default AddCatProfileContext;

/** **** PROVIDER ***** */
export function AddCatProfileContextProvider({ children }) {
  const [catInformation, setCatInformation] = useState(dataCatProfile);

  const addCatInformation = (newCatInformation) => {
    setCatInformation(...catInformation, {
      name: newCatInformation.name,
      pseudo: newCatInformation.pseudo,
      age: newCatInformation.age,
      color: newCatInformation.color,
      sexe: newCatInformation.sexe,
      breed: newCatInformation.breed,
      likesPets: newCatInformation.likesPets,
      likesKids: newCatInformation.likesKids,
      needsGarden: newCatInformation.needsGarden,
      description: newCatInformation.description,
      image: newCatInformation.image,
    });
  };

  const memoizedValue = useMemo(() => ({
    catInformation,
    addCatInformation,
  }), []);

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
