import React from 'react'
import { login } from '../utils.js'
import NearLogo from '../assets/logo-black.svg';


export function NotLogged() {
    return (
        <>
        <div className="mt-5 mb-3">
              <button className='wallet-adapter-button justify-content-center mx-auto btnhover' onClick={login}>LOG IN NEAR<img src={NearLogo} alt="Near Logo" className='nearlogo mb-1' style={{width:"40px", height:"40px"}}/></button>
        </div>
        <RecentPlays/>
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


export function RecentPlays() {
    return(
        <div>
            yo
            </div>
    );
  }



export function Loading() {
    return (
        <div className='spinner-border text-dark' role='status'><span className='sr-only'></span></div>
    );
} 



document.querySelectorAll('.logo').forEach(button => {

    const bounding = button.getBoundingClientRect();

    button.addEventListener('mousemove', e => {

        let dy = (e.clientY - bounding.top - bounding.height / 2) / -1
        let dx = (e.clientX - bounding.left - bounding.width / 2)  / 10

        dy = dy > 10 ? 10 : (dy < -10 ? -10 : dy);
        dx = dx > 4 ? 4 : (dx < -4 ? -4 : dx);

        button.style.setProperty('--rx', dy);
        button.style.setProperty('--ry', dx);

    });

    button.addEventListener('mouseleave', e => {

        button.style.setProperty('--rx', 0)
        button.style.setProperty('--ry', 0)

    });

    button.addEventListener('click', e => {
        button.classList.add('success');
        gsap.to(button, {
            '--icon-x': -3,
            '--icon-y': 3,
            '--z-before': 0,
            duration: .2,
            onComplete() {
                particles(button.querySelector('.emitter'), 100, -4, 6, -80, -50);
                gsap.to(button, {
                    '--icon-x': 0,
                    '--icon-y': 0,
                    '--z-before': -6,
                    duration: 1,
                    ease: 'elastic.out(1, .5)',
                    onComplete() {
                        button.classList.remove('success');
                    }
                });
            }
        });
    });

});