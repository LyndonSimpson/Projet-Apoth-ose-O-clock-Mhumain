import './formapistyles.scss';
import React from 'react';
import PropTypes from 'prop-types';

function FormAPI({
  image,
  anecdote,
}) {
  return (
    <div>
      <img src={image} alt="Cats" />
      <p>{anecdote}</p>
    </div>
  );
}

FormAPI.propTypes = {
  image: PropTypes.string.isRequired,
  anecdote: PropTypes.string.isRequired,
};

export default React.memo(FormAPI);
