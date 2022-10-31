import React from 'react'
import { BsPlusLg } from 'react-icons/bs';
import './addprofile.scss'

function AddProfile() {
    return (
        <div className='AddProfile'>
            <div className='AddProfilePlus'>
                <BsPlusLg className='BsPlusLg' />
            </div>
            <p className='AddProfilName'>Ajouter un profil</p>
        </div>
    )
}


export default React.memo(AddProfile);