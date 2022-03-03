import React from 'react'
import axios from 'axios';
import { login } from '../utils.js'
import NearLogo from '../assets/logo-black.svg';



function generatephrase(ammount, won, account) {
    ammount = ammount/2;
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
        "",
        "",
        "",
    ]
    const ruggedphrases = [
        " didn't need "+ammount +" Near.",
        " donated "+ammount+" Near.",
        " wasted "+ammount+" Near.",
        " felt the need to lose "+ammount+" Near.",
        " lost "+ammount+" Near.",
        " could have saved "+ammount+" Near.",
        " wished that he didn't bet "+ammount+" Near.",
        " sent us "+ammount+" Near. Thanks!",
        " should have donated to charity "+ammount+" Near.",
        " bet "+ammount+" Near and got rugged.",
        " needs "+ammount+" Near. Cause he got rugged.",
        " lost "+ammount+" Near.",
        " should have given "+ammount+" Near to me.",
        " maybe should stop after losing "+ammount+" Near.",
        " should have bought something with "+ammount+" Near.",
        " got unlucky and lost "+ammount+" Near.",
        " won't get scared of losing "+ammount+" Near.",
        " really likes losing "+ammount+" Near.",
        " should have gone to the park or something with "+ammount+" Near...",
        
    ]
    const wonphrases = [
        " fought for and won "+ammount+" Near.",
        " bet and won "+ammount+" Near.",
        " sensed the need to win "+ammount+" Near.",
        " won "+ammount+" Near.",
        " finally won "+ammount+" Near.",
        " didn't think much of it and won "+ammount+" Near.",
        " has a new friend and won "+ammount+" Near.",
        " maybe has a cristall ball since he won "+ammount+" Near.",
        " should go to the shopping mall with "+ammount+" Near.",
        " threw a party with "+ammount+" Near.",
        " will share with me "+ammount+" Near.",
        " doubled "+ammount+" Near.",
        " duplicated "+ammount+" Near.",
        " won "+ammount+" Near.",
        " will spent wisely "+ammount+" Near.",
        " called it and won "+ammount+" Near.",
        " likes his new "+ammount+" Near.",
        " got lucky and won "+ammount+" Near.",
        " will give me a ride to dubai with "+ammount+" Near.",
        
    ]
    /* returns a random rugged phrase */

    return(
        <>
            {won ? congratulation[Math.floor(Math.random() * congratulation.length)] + account +  wonphrases[Math.floor(Math.random() * wonphrases.length)] : congratulation[Math.floor(Math.random() * congratulation.length)] + account +ruggedphrases[Math.floor(Math.random() * ruggedphrases.length)]}
        </>
    )
}

export function TopPlays() {
    React.useEffect(() => {
        
      axios.get(process.env.DATABASE_URL+"/plays/top")
      .then(res => {
          console.log(res);
        
      }).catch(error =>{
        
      });
    }, []);

    return (
        <>
        
        </>
    )
}

export function RecentPlays() {
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
        
        <div className="form-signin2 text-start mx-auto">
            <ul className="list-group">
              {plays===undefined ? <Loading size={12}/> :
              errormsg!== "" ? <div className='textsurprese font-weight-normal' style={{fontSize:"1.2rem"}}> Error fetching plays :/ </div> :
              plays.map((play,i) => {
                  //console.log(i)
                  const url = `https://explorer.${process.env.NODE_ENV}.near.org/transactions/`+play.tx;
                  return(
                      <a href={url} class="text-decoration-none" target='_blank'>
                          <li key={i} className='list-group-item d-flex p-2 cursor-pointer'>
                        <div className="profile-picture">
                            <img src={NearLogo} height={30} width={30} alt="logoback"/>
                        </div>
                        <div className='title mt-1' style={{fontSize:"0.75rem"}}>
                            {play.ammount >=10 ? <span style={{color:"#f4a300"}}>{generatephrase(play.ammount, play.won, play.walletaccount)}</span> : <span color=''>{generatephrase(play.ammount, play.won, play.walletaccount)}</span>}
                        </div>
                        <small className="ms-auto mt-auto urltrx" style={{fontSize:"0.42rem", color:"grey", fontWeight:"lighter"}}>Transaction: {play.tx}</small>
                        <small className="ms-auto mt-auto time-in-row" style={{fontSize:"0.68rem", fontWeight:"lighter"}}>{get_time_diff(play.date)}</small>
                    </li>
                      </a>
                    
                  )
                }
              )
              }  
            </ul>
        </div>
    );
}

  

export function NotLogged() {

    return (
        <>
        
        <div className="mt-5 mb-3">
              <button className='wallet-adapter-button justify-content-center mx-auto btnhover' onClick={login}>LOG IN NEAR<img src={NearLogo} alt="Near Logo" className='nearlogo mb-1' style={{width:"40px", height:"40px"}}/></button>
        </div>
        <div className='textsurprese font-weight-normal' style={{fontSize:"1.2rem"}}>
            Recent Plays
        </div>
         <div className="accordion text-center mb-2" id="myAccordion">
            <h6 className="mt-3 mx-auto" style={{transition:"color 0.4 ease-in-out", width:"100%"}}>
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

function get_time_diff( datetime )
{
    var date1 = new Date(datetime);
    var date2 = new Date();
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());

    var days = Math.floor(timeDiff / 86400000); // days
var hours = Math.floor((timeDiff % 86400000) / 3600000); // hours
var minutes = Math.round(((timeDiff % 86400000) % 3600000) / 60000); // minutes
var seconds = Math.round((((timeDiff % 86400000) % 3600000) % 60000) / 1000); // seconds
    /* for some reason I think this condition is trash, but im to tired to even think about it so fuck it, yeah!? */
    if(days===0){
        if(hours === 0){
            if(minutes === 0){
                if(seconds === 0){
                    return "just now";
                }else if(seconds === 1){
                    return seconds + " second ago";
                }
                return seconds + " seconds ago";
            }else if(minutes === 1){
                return minutes + " minute ago";
            }
            return minutes + " Minutes "
        }
        else if(hours ===1) {
            return hours + " Hour " + minutes + " Minutes "
        }

        return hours + " hours ago";
    }else if(days===1){
        return days + " day ago";
    }
    else {
        return days + " days ago";
    }
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