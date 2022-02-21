import React from 'react'
import { login } from '../utils.js'
import NearLogo from '../assets/logo-white.svg';

export const menusayings = [
  "Near Coin Flip!",
  "Want to play a game?",
  "Prepare to be flipped!",
  "Flip a coin!",
  "GIVE ME MY NEAR BACK!",
  "I'm a coin-flipping machine!",
  ">:((((((",
  "shhhhh, its tails bro trust me.",
  "fifty-fifty.",
  "It's Heads.\nSource: Trust me bro.",
  "Do you even Flip?",
  "Make a wish...",
  "Have you ever heard of PS,\nThe God of the Flips?",
  "Might wanna double it...",
  "I'll phone a friend.",
  "Let me take a breath.",
  "What color do I want my lambo....",
  "See you in Dubai",

]

export const hoverEmojis = [
  "🤔",
  "😳",
  "😱",
  "😏",
  "😍",
  "👉👈",
  "🤓",
  "🤠",
  "😎",
  "🤪",
  "🥶",
  "💪",
  "😀",
  "🙃",
  "😉",
  "😌",
  "😛",
  "😜",
  "😇",
  "🔥🔥🔥",
  "💸💸💸",
  "💰",
  "🤩",
  "😮‍💨",
  "😬",
  "🙄",
  "😤",
  "💍",
  "🚀🚀🚀",
  "⛱️",
  
]

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
