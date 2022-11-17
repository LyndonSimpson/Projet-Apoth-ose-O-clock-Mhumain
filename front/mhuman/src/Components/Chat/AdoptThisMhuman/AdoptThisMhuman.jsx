import { Icon } from 'semantic-ui-react';
import React, { useState } from 'react';
import './adoptthismhumanstyles.scss';
import propTypes from 'prop-types';

function AdoptThisMhuman({ handleAdoptButton }) {
  return (
    <button type="button" className="adopthuman" onClick={handleAdoptButton}>
      <div className="adopthuman-text">
        <p>ADOPT THIS MHUMAN ?</p>
      </div>
      <Icon className="adopthuman-icon" name="paw" size="huge" />
    </button>
  );
}

AdoptThisMhuman.propTypes = {
  handleAdoptButton: propTypes.func.isRequired,
};

export default React.memo(AdoptThisMhuman);
