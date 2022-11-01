import './formapistyles.scss';
import React from 'react';
// import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import Cat from '../../../styles/cat.jpg';

function FormAPI() {
  return (
    <div className="form-api">
      <div className="image-api">
        <Image
          className="api-image"
          src={Cat}
          as="a"
          size="medium"
          target="_blank"
        />
      </div>
      <div className="anecdote-api">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. At quos quis repellendus
          omnis dolorum ea quam voluptas deleniti aspernatur soluta aut corporis, praesentium quia pariatur earum accusantium quidem natus laboriosam.

        </p>
      </div>
    </div>
  );
}

// FormAPI.propTypes = {
//   image: PropTypes.string.isRequired,
//   anecdote: PropTypes.string.isRequired,
// };

export default React.memo(FormAPI);
