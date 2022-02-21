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

export function RecentPlays() {
    return(
        <>
        <h1 className="mt-2" style={{fontSize:"2.3rem"}}>RECENT PLAYS</h1>
            <div className="accordion text-center mb-2" id="myAccordion">
              <h6 className="mt-3 w-60" style={{transition:"color 0.4 ease-in-out"}}>
                <small style={{fontSize:"0.8rem", letterSpacing:"0.005rem"}}>
                  <a href="#">wtf is this shit</a> | <a href="#">bro i have a question.</a> | <a href="#">Tutorial pls</a> | <a href="#" >TestNet Demo</a> | <a href="#">Am I dumb?</a>
                </small>
              </h6>
            </div>
            </>
    );
}
