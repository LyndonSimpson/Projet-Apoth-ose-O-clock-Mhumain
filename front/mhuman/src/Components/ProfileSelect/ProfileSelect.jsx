import React from 'react'
import './profileselect.scss'
import chat1 from './fakeData/pexels-cat-1.jpg'
import chat2 from './fakeData/pexels-cat-2.jpg'
import { BsPlusLg } from 'react-icons/bs'

function ProfileSelect() {
    return (
        <div className='ProfileSelect'>
            <header className='ProfileTitle'>Logo</header>
            <section className='ProfileContainer'>
                <div className='CatProfile'>
                    <h1 className='ProfileSubtitle'> Profils Chats</h1>
                    <div className='DisplayProfile'>
                        <div className='ProfileCard'>
                            <img src={chat1} className='ProfilePicture' alt='Photo de profils' />
                            <p className='ProfileName'>Minou</p>
                        </div>
                        <div className='ProfileCard'>
                            <img src={chat2} className='ProfilePicture' alt='Photo de profils' />
                            <p className='ProfileName'>Minou</p>
                        </div>
                        <div className='AddProfile'>
                            <div className='AddProfilePlus'>
                                <BsPlusLg className='BsPlusLg' />
                            </div>
                            <p className='ProfileName'>Ajouter un profil</p>
                        </div>
                    </div>
                </div>
                <div className='HumainProfile'>
                    <h1 className='ProfileSubtitle'> Profils Humain</h1>
                    <div className='DisplayProfile'>
                        <div className='AddProfile'>
                            <div className='AddProfilePlus'>
                                <BsPlusLg className='BsPlusLg' />
                            </div>
                            <p className='ProfileName'>Ajouter un profil</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default React.memo(ProfileSelect);