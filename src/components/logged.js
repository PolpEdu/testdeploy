import React from 'react'
import axios from 'axios';
import { login } from '../utils.js'
import NearLogo from '../assets/logo-black.svg';



function generatephrase(ammount, won) {
    let ammount = ammount/2;
    const congratulation = [
        "My homie ",
        "My boi ",
        "My friend ",
        "The legend ",
        "The king ",
        "Queen ",
        "The one and only ",
        "He who goes by ",
        "The mysterious ",
        "The one who ",
        "The smartass ",
        "The generous ",
        "The brave ",
        "The mighty ",
        "The great ",
        "The suspicious ",
        "Sir ",
        "Lord ",
        "",
        "",
        "",

    ]
    const ruggedphrases = [
        "didn't need "+ammount +" Near.",
        "donated "+ammount+" Near.",
        "wasted "+ammount+" Near.",
        "could have bought something with "+ammount+" Near.",
        "felt the need to lose "+ammount+" Near.",
        "lost "+ammount+" Near.",
        "could have saved "+ammount+" Near.",
        "wished that he didn't bet "+ammount+" Near.",
        "could have won "+ammount+" Near.",
        "sent us "+ammount+" Near. Thanks!",
        "should have donated to charity "+ammount+" Near.",
        "bet "+ammount+" Near and got rugged.",
        "needs "+ammount+" Near. Cause he got rugged.",
        "lost "+ammount+" Near.",


        

    ]
    const wonphrases = [
        "fought for and won "+ammount+" Near.",
        "bet and won "+ammount+" Near.",
        "sensed the need to win "+ammount+" Near.",
        "won "+ammount+" Near.",
        "finally won "+ammount+" Near.",
        "didn't think much of it and won "+ammount+" Near.",
        "has a new friend and won "+ammount+" Near.",
        "maybe has a cristall ball and won "+ammount+" Near.",
        "should go to the shopping mall with "+ammount+" Near.",
        "threw a party with "+ammount+" Near.",
        "will share with me "+ammount+" Near.",
        "doubled "+ammount+" Near.",
        "duplicated "+ammount+" Near.",
        "won "+ammount+" Near.",
        "won "+ammount+" Near.",

    ]
    /* returns a random rugged phrase */

}


function RecentPlays() {
    const[plays, setPlays] = React.useState([]);
    const[errormsg, setErrormsg] = React.useState("");
  
    React.useEffect(() => {
      axios.get(process.env.DATABASE_URL+"/plays")
      .then(res => {
        setPlays(res.data.plays);
      }).catch(error =>{
        setErrormsg("Couldn't get the latest plays :(");
        console.log("Error fetching Plays: ", error)
  
      });
      
    }, []);
  
    return(
        <>
        <div className='textsurprese font-weight-normal' style={{fontSize:"1.2rem"}}>
            Recent Plays
        </div>
        <div className="form-signin2 text-start">
            <ul className="list-group">
              {plays===undefined ? <Loading/> :
              errormsg!== "" ? <div className='textsurprese font-weight-normal' style={{fontSize:"1.2rem"}}> Error fetching plays :/ </div> :
              plays.map((play,i) => {
                  return(
                    <li key={i} className='list-group-item d-flex p-2 cursor-pointer'>
                        <div className="profile-picture">
                            <img src={NearLogo} height={30} width={30} alt="logoback"/>
                        </div>
                        <div className='title mb-auto'>
                            {play.ammount >=10 ? <span style={{color: rgb(244, 162, 0),fontWeight: 900}}>{generatephrase(play.ammount, play.won)}</span> : <span>{generatephrase(play.ammount, play.won)}</span>}

                        </div>
                    </li>
                  )
                }
              )
              }  
            </ul>
        </div>
        </>
    );
  }

  

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




export function Loading(props) {
    return (
        <div className={props.color === undefined ? 'spinner-border text-warning' : 'spinner-border '+ props.color} role='status' style={{width: props.size, height:props.size}}><span className='sr-only'></span></div>
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