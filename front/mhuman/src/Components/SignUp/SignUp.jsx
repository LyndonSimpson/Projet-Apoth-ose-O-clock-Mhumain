import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react'
import './signupstyles.scss'

function SignUp() {
    const [emailValue, SetEmailValue] = useState('');
    const [passwordValue, SetPasswordValue] = useState('');
    const [confirmPasswordValue, SetConfirmPasswordValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleReset = () => { //reset all input 
      SetEmailValue('');
      SetPasswordValue('');
      SetConfirmPasswordValue('');
    }
    const handleSubmit = (evt) => {
      evt.preventDefault();
      if (passwordValue !== confirmPasswordValue) {
        setErrorMessage('Votre confirmation de mot de passe est incorrect')
        return
      }
      //TODO : use emailValue and passwordValue for add new user in db

      handleReset();
    }

      //TODO : add message for error on information

    return (
        <Form onSubmit={handleSubmit}>
        <Form.Field width={3}>
        {errorMessage &&
            <Message>
              <Message.Header>Erreur</Message.Header>
              <p>
                {errorMessage}
              </p>
            </Message>
          }
          <input 
            placeholder='Email'
            value={emailValue}
            onChange={(e)=>{SetEmailValue(e.target.value)}}
          />
          <input
            placeholder='Mot de passe'
            type='password'
            value={passwordValue}
            onChange={(e)=>{SetPasswordValue(e.target.value)}}
          />
          <input
            placeholder='Confirmer le mot de passe'
            type='password'
            value={confirmPasswordValue}
            onChange={(e)=>{SetConfirmPasswordValue(e.target.value)}}
          />
        </Form.Field>
        <Button
          type='button'
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button type='submit'>Valider</Button>
      </Form>
    )
}

export default React.memo(SignUp);