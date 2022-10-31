import './formhumandescstyles.scss';
import React, { useState } from 'react';
import {
  Button, Form,
} from 'semantic-ui-react';

function FormHumanDesc() {
  const [image, setImage] = useState([]);

  return (
    <>
      <form>
        <Form.TextArea placeholder="Tell us more about you..." />

        <div>
          {
          Array.from(image).map((item) => (
            <span>
              <img
                style={{ padding: '10px' }}
                width={150}
                height={150}
                src={item ? URL.createObjectURL(item) : null}
                alt="Photos"
              />
            </span>
          ))
        }
          <input
            onChange={(e) => {
              setImage(e.target.files);
            }}
            multiple
            type="file"
            accept="image/*"
            id="fileUpload"
          />
        </div>
      </form>
      <div className="form-human-button">
        <Button
          type="submit"
        >
          Je veux me faire adopter par un chat!
        </Button>
      </div>
    </>
  );
}

export default React.memo(FormHumanDesc);
