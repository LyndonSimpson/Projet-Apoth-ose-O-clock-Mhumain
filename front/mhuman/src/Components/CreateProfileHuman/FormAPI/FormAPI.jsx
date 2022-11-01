import './formapistyles.scss';
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import axios from 'axios';
import Cat from '../../../styles/cat.jpg';

const baseURL = 'https://api.thecatapi.com/v1/images/search';

function FormAPI() {
  const [catPicture, setCatPicture] = useState([]);

  React.useEffect(() => {
    async function getCatPicture() {
      const response = await axios.get(baseURL);
      setCatPicture(response.data);
    }
    getCatPicture();
  }, []);

  return (
    <div className="form-api">
      <div className="image-api">
        <Image
          className="api-image"
          src={catPicture.url}
          size="medium"
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
