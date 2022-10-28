import React from 'react';
import './landingpagestyles.scss'
import { Button } from 'semantic-ui-react'
import videoCat from '../LandingPage/videoCat.mp4'


function LandingPage() {
    return (
        <div className='content'>
                <video autoPlay muted loop 
                id="background-video">
                    <source src={videoCat} />
                </video>

            <div className='buttons'>
                <Button size='big'>M'inscrire</Button>
                <Button size='big'>Me connecter</Button>
            </div>

        </div>
    )
}

export default React.memo(LandingPage);

