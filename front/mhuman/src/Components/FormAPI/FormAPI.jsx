import './formapistyles.scss';
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import axios from 'axios';

// Put cat's picture API in const
const baseURL = 'https://api.thecatapi.com/v1/images/search';
const URL = 'https://catfact.ninja/fact';

function FormAPI() {
  const [catPicture, setCatPicture] = useState(null);
  const [catFact, setCatFact] = useState('');

  React.useEffect(() => {
    async function getCatPicture() {
      const [response, secondResponse] = await Promise.all([
        axios.get(baseURL),
        axios.get(URL),
      ]);
      setCatPicture(response.data[0]);
      setCatFact(secondResponse.data);
    }
    getCatPicture();
  }, []);

  return (
    <div className="form-api">
      <div className="image-api">
        <Image
          className="api-image"
          src={catPicture ? catPicture.url : null}
          size="big"
        />
      </div>
      <div className="anecdote-api">
        <p>
          {catFact.fact}
        </p>
      </div>
    </div>
  );
}

export default React.memo(FormAPI);
