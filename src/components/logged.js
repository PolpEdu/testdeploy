import React from 'react'
import { login } from '../utils.js'
import NearLogo from '../assets/logo-white.svg';

export function NotLogged() {
    return (
         <>
            <div className="mb-3"></div>
              <button className='wallet-adapter-button wallet-adapter-button-trigger justify-content-center mx-auto btnhover' onClick={login}>Log In with NEAR  <img src={NearLogo} alt="Near Logo" className='nearlogo'/></button>
            </>
    );
}

