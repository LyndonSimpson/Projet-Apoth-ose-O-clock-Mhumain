import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import './signupstyles.scss'

function SignUp() {
    const [emailValue, SetEmailValue] = useState('');
    const [passwordValue, SetPasswordValue] = useState('');
    const [confirmPasswordValue, SetConfirmPasswordValue] = useState('');
    return (
        <Form>
        <Form.Field width={3}>
          <input 
            placeholder='Email'
            value={emailValue}
            onChange={(e)=>{SetEmailValue(e.target.value)}}
          />
        </Form.Field>
        <Form.Field width={3}>
          <input
            placeholder='Password'
            value={passwordValue}
            onChange={(e)=>{SetPasswordValue(e.target.value)}}
          />
        </Form.Field>
        <Form.Field width={3}>
          <input
            placeholder='Confirm password'
            value={confirmPasswordValue}
            onChange={(e)=>{SetConfirmPasswordValue(e.target.value)}}
          />
        </Form.Field>
        <Button type='submit'>Valider</Button>
      </Form>
    )
}

export default React.memo(SignUp);