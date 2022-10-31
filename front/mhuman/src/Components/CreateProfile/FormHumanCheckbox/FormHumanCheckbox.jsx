import './formhumancheckboxstyles.scss';
import React, { useState } from 'react';
import {
  Checkbox, Form, Button, Icon,
} from 'semantic-ui-react';
import FormHumanInformations from '../FormHumanInformations/FormHumanInformations';

function FormHumanCheckbox() {
  const [next, setNext] = useState('');

  const handleFormButton = () => {
    setNext('FormHumanInformations');
  };

  return (
    <>
      {!next && (
      <>
        <Form className="form-human">
          <Form.Field
            control={Checkbox}
            label="D'être réveillé par mon chat à l'heure qu'il souhaitera (souvent entre 5h et 6h du matin)"
            required
          />
          <Form.Field
            control={Checkbox}
            label="De lui acheter de super jouets avec lesquels il ne jouera jamais (les bouts de carton c'est quand même plus drôle)"
            required
          />
          <Form.Field
            control={Checkbox}
            label="De nettoyer son vomi (la plupart du temps il y en a pas qu'un...)"
            required
          />
          <Form.Field
            control={Checkbox}
            label="De l'aimer et de le chérir (oui même s'il a démoli le canapé à l'aide de ses griffes)"
            required
          />
          <Form.Field
            control={Checkbox}
            label="De ne pas l'abandonner quand je pars en vacances (gare aux représailles engendrés par le pacte de sang)"
            required
          />
          <Form.Field
            control={Checkbox}
            label="De la nourrir (beaucoup...)"
            required
          />
          <Form.Field
            control={Checkbox}
            label="De le laisser faire ses griffes sur le canapé (voir point numéro 4)"
            required
          />
          <Form.Field
            control={Checkbox}
            label="De recevoir en retour de mon chat ses multiples offrandes (on pense qu'ils sont satanistes un peu sur les bords)"
            required
          />
        </Form>

        <div className="form-human-button">
          <Button
            onClick={handleFormButton}
            animated
          >
            <Button.Content visible>Next</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </div>
      </>
      )}
      {next === 'FormHumanInformations'
        && (
          <FormHumanInformations />
        )}
    </>
  );
}

export default React.memo(FormHumanCheckbox);
