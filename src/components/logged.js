import React from 'react'
import { login } from '../utils.js'
import NearLogo from '../assets/logo-black.svg';


export function NotLogged() {
    return (
            <div className="mt-5 mb-3">
              <button className='wallet-adapter-button justify-content-center mx-auto btnhover' onClick={login}>LOG IN NEAR<img src={NearLogo} alt="Near Logo" className='nearlogo mb-1' style={{width:"40px", height:"40px"}}/></button>
            </div>
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
