import React from 'react';
import './confirmModaleStyles.scss';
import propTypes from 'prop-types';
import {
  Modal, Button, Header, Icon,
} from 'semantic-ui-react';

function ConfirmModale({ open, setOpen, handleAdoptMhuman }) {
  return (
    <Modal
      closeIcon
      open={open}
      onClose={setOpen}
    >
      <Header className="header-modal" icon="paw" content="Adopt this Mhuman ?" />
      <Modal.Content>
        Etes vous sûr de vouloir adopter cet humain ? Cette opération vous impactera toute votre existence...
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={setOpen}>
          <Icon name="remove" />
          {' '}
          J'hésite encore...
        </Button>
        <Button color="green" onClick={handleAdoptMhuman}>
          <Icon name="checkmark" />
          {' '}
          Je suis sûr !
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

ConfirmModale.propTypes = {
  open: propTypes.func.isRequired,
  setOpen: propTypes.func.isRequired,
  handleAdoptMhuman: propTypes.func.isRequired,
};

export default React.memo(ConfirmModale);
