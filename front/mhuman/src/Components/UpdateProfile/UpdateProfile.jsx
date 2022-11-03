import React from 'react';
import './updateprofilestyles.scss';
import {
  Button, Icon, TextArea, Input, Form, Radio, Image,
} from 'semantic-ui-react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function UpdateProfile() {
  return (
    <>
      <Header />

      <Image src="/images/wireframe/square-image.png" size="big" circular />
      <div className="update-profile">

        {/* {errorMessage
              && (
              <Message
                negative
                className="error-msg"
                header="Erreur"
                onDismiss={handleDismiss}
                content={errorMessage}
              />
              )} */}
        <form
          className="form-update-human"
        >
          <form>
            <Form.Group className="form-informations">
              <Input
                className="form-informations-input"
                id="form-input-control-first-name"
                placeholder="Name"
              />
              <Input
                className="form-informations-input"
                id="form-input-control-last-name"
                placeholder="Pseudo"
              />
              <Input
                className="form-informations-input"
                label={{ basic: true, content: 'ans' }}
                labelPosition="right"
                placeholder="Entrez votre âge"
                type="number"
              />
            </Form.Group>

            {/* <div className="form-informations-radios">
            <Form.Group grouped>
              <label htmlFor="has_pets">Avez-vous des animaux ?</label>
              <Form.Field>
                <Radio
                  label="Oui"
                  name="has_pets"
                  value="true"
                //   checked={hasPets === 'true'}
                //   onChange={handleHasPets}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Non"
                  name="has_pets"
                  value="false"
                //   checked={hasPets === 'false'}
                //   onChange={handleHasPets}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group grouped>
              <label htmlFor="has_kids">Avez-vous des enfants ?</label>
              <Form.Field>
                <Radio
                  label="Oui"
                  name="has_kids"
                  value="true"
                //   checked={hasKids === 'true'}
                //   onChange={handleHasKids}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Non"
                  name="has_kids"
                  value="false"
                //   checked={hasKids === 'false'}
                //   onChange={handleHasKids}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group grouped>
              <label htmlFor="has_garden">Avez-vous un jardin ?</label>
              <Form.Field>
                <Radio
                  label="Oui"
                  name="has_garden"
                  value="true"
                //   checked={hasGarden === 'true'}
                //   onChange={handleHasGarden}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Non"
                  name="has_garden"
                  value="false"
                //   checked={hasGarden === 'false'}
                //   onChange={handleHasGarden}
                />
              </Form.Field>
            </Form.Group>
          </div> */}
          </form>
          <TextArea
            className="form-update-human-area"
            rows={2}
            placeholder="Dites-nous en plus sur vous..."
          />

          <div className="form-update-human-buttons">
            <Button
              className="form-update-human-button"
            // onClick={handleReturnClick}
              animated="fade"
            >
              <Button.Content visible>Enregistrer</Button.Content>
              <Button.Content hidden>
                <Icon name="check" />
              </Button.Content>
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default React.memo(UpdateProfile);
