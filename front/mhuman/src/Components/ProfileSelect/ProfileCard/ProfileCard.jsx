import React from 'react'
import './profilecard.scss'
import chat1 from '../fakeData/pexels-cat-1.jpg'

function ProfileCard() {
    return (
        <div className='ProfileCard'>
            <img src={chat1} className='ProfilePicture' alt='Photo de profils' />
            <p className='ProfileName'>Minou</p>
        </div>
    )
}


export default React.memo(ProfileCard);