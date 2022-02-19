import React from 'react'
import { login } from '../utils.js'
import NearLogo from '../assets/logo-white.svg';

export function NotLogged() {
    return (
         <>
            <div className="mt-2 mb-3"></div>
              <button className='wallet-adapter-button wallet-adapter-button-trigger justify-content-center mx-auto btnhover' onClick={login}>Log In with NEAR  <img src={NearLogo} alt="Near Logo" className='nearlogo'/></button>
            </>
    );
}


export function Loading() {
    return (
        <div className='spinner-border text-dark' role='status'><span className='sr-only'></span></div>
    );
} 
