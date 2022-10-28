import React, { useState } from 'react';
import './LogIn.scss'
import { Button, Form } from 'semantic-ui-react'
import bgVideo from '../../videos/catVideoLP.mp4'


function LogIn() {

    const [emailValue, SetEmailValue] = useState('')
    const [passwordValue, SetPasswordValue] = useState('')


    return (
        <div className='loginPage'>
            <video className='videoBg' src={bgVideo} autoPlay loop muted />
            <div className='loginContent'>
                <header className='loginHeader'>
                    <h1 className='headerTitle'> ADOPTE TON MHUMAIN</h1>
                </header>
                <main className='loginMain'>
                    <div className='loginMainContainer'>
                        <div className='loginMainForm'>
                            <Form >
                                <h3> Connexion </h3>
                                <Form.Field>
                                    <input
                                        placeholder='E-Mail'
                                        value={emailValue}
                                        onChange={(e) => { SetEmailValue(e.target.value) }} />
                                </Form.Field>
                                <Form.Field>
                                    <input
                                        placeholder='Password'
                                        value={passwordValue}
                                        onChange={(e) => { SetPasswordValue(e.target.value) }} />
                                </Form.Field>
                                <Button type='submit'> Se connecter </Button>
                            </Form>
                        </div>
                    </div>
                </main>
                <footer className='loginFooter'>
                </footer>
            </div>
        </div>
    )
}
export default React.memo(LogIn);
