import React from 'react';
import './headerstyles.scss'

function Header() {
    return (
        <h1 className='title'>Hi! I'm the Header!</h1>
    )
}

export default React.memo(Header);