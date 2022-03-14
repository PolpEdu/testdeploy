import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout, mintmeup, maintitlesayings } from './utils'
import './global.css'
import Tippy from '@tippyjs/react';
import Box from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import Countdown from 'react-countdown';

import NearLogo from './assets/logo-black.svg';
import selflogo from './assets/result.svg';
import { useSearchParams, useNavigate } from "react-router-dom";

import { BsTwitter } from "react-icons/bs";
import { SiDiscord } from "react-icons/si";
import { FiCompass } from "react-icons/fi";

import Navbar from '../components/navbar';


const projectName = 'Mint Flip Near NFT';
const totalnftammount = 555;
const nftprice = 10;
const info = "Flip Near 😱 is a juicy 💦 collection ❗ of 555 character NFT's 🆕 nesting on Near 😎. You mint the nft 📝, you stake it 🔒 and you win some Near daily 🤴. That's it 😐😐. I think we've covered it all 🥱🥱. hmmm. Let me think.............. OH 😵😵😵 AND YOU CAN ALSO USE IT 😲 TO FLEXD ON THIS KIDS 👀👀👀 WITH YOUR NEW PROFILE PIC LMAO🔥🤣🔥🤣💯💯🔥🤣💯🔥🤣";

const infographic1 = "WHITELIST OPEN";


const tooltip1 = "Devs be workin hard";
const tooltip2 = "Gotta go fast 👀👀";
const tooltip3 = "HODL 🙏🙏🙏";

const pressaledate = "2020-06-01";
const publicdate = "2020-06-01";



import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {

  const [maintitle, setmaintitle] = React.useState(maintitlesayings[Math.floor(Math.random() * maintitlesayings.length)]);

  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();

  let msg = "";
  if (searchParams.get("errorCode")) {
    msg = searchParams.get("errorCode") + ", " + (searchParams.get("errorMessage").replaceAll("%20", " ")) + ".";
  }

  const [errormsg, setErrormsg] = React.useState(msg);

  // when the user has not yet interacted with the form, disable the button
  const [buttonDisabled, setButtonDisabled] = React.useState(true)

  // after submitting the form, we want to show Notification
  const [showNotification, setShowNotification] = React.useState(false)


  const [minted, setMinted] = React.useState("");

  // The useEffect hook can be used to fire side-effects during render
  // Learn more: https://reactjs.org/docs/hooks-intro.html
  React.useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {


        searchParams.delete("errorCode");
        searchParams.delete("errorMessage");
        navigate(searchParams.toString());

      }
    },

    // The second argument to useEffect tells React when to re-run the effect
    // Use an empty array to specify "only run on first render"
    // This works because signing into NEAR Wallet reloads the page
    []
  )




  return (
    <>
    <Navbar/>
    <div className="max-w-screen-3xl mx-auto w-full px-8 ">
      {errormsg && <NotificationError err={errormsg} />}
      <div className="flex flex-1 flex-col-reverse md:flex-row mx-auto gap-8 justify-between my-4">
        <div className="flex flex-col gap-4 flex-grow md:max-w-[40%]">
          <h1 className="text-4xl font-extrabold leading-none" style={{ color: "#fcdd35" }}>
            {projectName}
          </h1>
          <div className="text-center text-xs border border-solid rounded-md px-2 py-1 w-fit-content tracking-widest" style={{ borderColor: "#F58F29" }}>
            {maintitle}
          </div>
          <div className="inline-flex gap-2 content-center w-fit-content flex-wrap">
            <Tippy content={<span style={{ fontSize: "0.8rem" }}>{tooltip1}</span>} className="my-auto" style={{ display: "inline" }} >
              <div className="border border-solid border-purple-1 p-1.5 rounded-md text-white-1 h-fit-content text-sm flex gap-2 whitespace-nowrap" style={{ color: '#f04f63' }}>
                {infographic1}
              </div>
            </Tippy>
            <Tippy content={<span style={{ fontSize: "0.8rem" }}>{tooltip2}</span>} className="my-auto" style={{ display: "inline" }} >
              <div className="border border-solid border-purple-1 p-1.5 rounded-md text-white-1 h-fit-content text-sm flex gap-2 whitespace-nowrap" style={{ color: '#bed16d' }}>
                <span className="font-light" >TOTAL ITEMS</span>
                <span className="font-bold">{totalnftammount}</span>
              </div>
            </Tippy>
            <Tippy content={<span style={{ fontSize: "0.8rem" }}>{tooltip3}</span>} className="my-auto" style={{ display: "inline" }}>
              <div className="border border-solid border-purple-1 p-1.5 rounded-md text-white-1 h-fit-content text-sm flex gap-2 whitespace-nowrap" style={{ color: '#98D4E6' }}>
                <span className="font-light">PRICE</span>
                <span className="font-bold">{nftprice} Near</span>
              </div>
            </Tippy>


            <div className="flex items-center gap-2">
              <Tippy content={<span style={{ fontSize: "0.8rem" }} animation="perspective" >Flip Near1!11!</span>} style={{ display: "inline" }}>
                <a target="_blank" rel="noopener noreferrer" href="https://www.nearcoinflip.com/">
                  <FiCompass className="w-6 h-6 hover:opacity-80" />
                </a>
              </Tippy>
              <Tippy content={<span style={{ fontSize: "0.8rem" }} animation="perspective" >Joino Discordo</span>} style={{ display: "inline" }}>
                <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/b7NJPuV5pk">
                  <SiDiscord className="w-6 h-6 hover:opacity-80" />
                </a>
              </Tippy>
              <Tippy content={<span style={{ fontSize: "0.8rem" }} animation="perspective" >(carefull high tier tweets)</span>} style={{ display: "inline" }}>
                <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/flipnear">
                  <BsTwitter className="w-6 h-6 hover:opacity-80" />
                </a>
              </Tippy>
            </div>
          </div>
          <h6 className="mb-4 text-gray-light text-xs">
            {info}
          </h6>
          <div className="flex flex-col gap-4"><div style={{ display: "inline" }}>
            <Tippy content={
              <Box>
                <div className='mx-auto' style={{ fontSize: "1rem", color: "#F58F29" }}>
                  Presale Info
                </div>

              </Box>
            } style={{ display: "inline" }}>
              <div className="rounded-xl border border-solid border-purple-1 p-3 flex flex-col gap-6">

                <div className="flex justify-between items-center" >
                  <div>
                    <div className="flex items-center" >
                      <div className="bg-red-700 rounded-full py-0.5 px-2 text-white-1 text-[12px] h-fit-content text-lg" style={{ color: "" }}>Presale</div>

                    </div>
                  </div>
                  <div className="flex flex-row gap-2 text-pink-hot text-sm tracking-wide font-medium text-center uppercase items-center">{
                    <Countdown
                      date={new Date(2022, 3, 6, 23, 0, 0, 0)}
                      renderer={({ days, hours, minutes, seconds, completed }) => {
                        if (completed) {
                          return <span className="text-red-600">ENDED</span>;
                        } else {
                          return (
                            <>
                              <span className='text-amber-300 mt-2'>ENDS IN:</span>

                              <div style={{ display: "inline" }}>
                                <Tippy content={<span style={{ fontSize: "0.8rem" }}>Days</span>} style={{ display: "inline" }}>
                                  <div className="w-8 h-8 cursor-help bg-green-600 flex items-center justify-center rounded">
                                    <span className="text-sm font-bold text-white-1 font-mono">{days}</span>
                                  </div>
                                </Tippy>
                              </div>
                              <div style={{ display: "inline" }}>
                                <Tippy content={<span style={{ fontSize: "0.8rem" }}>Hours</span>} style={{ display: "inline" }}>
                                  <div className="w-8 h-8 cursor-help bg-green-600 flex items-center justify-center rounded">
                                    <span className="text-sm font-bold text-white-1 font-mono">{minutes}</span>
                                  </div>
                                </Tippy>
                              </div>
                              <div style={{ display: "inline" }}>
                                <Tippy content={<span style={{ fontSize: "0.8rem" }}>Minutes</span>} style={{ display: "inline" }}>
                                  <div className="w-8 h-8 cursor-help bg-green-600 flex items-center justify-center rounded">
                                    <span className="text-sm font-bold text-white-1 font-mono">{minutes}</span>
                                  </div>
                                </Tippy>
                              </div>
                              <div style={{ display: "inline" }}>
                                <Tippy content={<span style={{ fontSize: "0.8rem" }}>Seconds</span>} style={{ display: "inline" }}>
                                  <div className="w-8 h-8 cursor-help bg-green-600 flex items-center justify-center rounded">
                                    <span className="text-sm font-bold text-white-1 font-mono">{seconds}</span>
                                  </div>
                                </Tippy>
                              </div>
                            </>
                          )
                        }
                      }}
                    />
                  }
                  </div>
                </div>

                <div className="flex gap-1.5 text-white-1 tracking-wide text-xs">
                  <span>WHITELIST <b>832</b></span>
                  <b>•</b>
                  <span>MAX <b>1 TOKEN</b></span><b>•</b><span>Price <b>1.00₦</b></span>
                </div>
              </div>
            </Tippy>

          </div>
            <Tippy content={
              <Box>
                <div className='mx-auto' style={{ fontSize: "1rem", color: "#9381FF" }}>
                  Public Info
                </div>
              </Box>
            }>
              <div style={{ display: "inline" }}>
                <div className="ease-in-out duration-150 rounded-xl border border-solid border-purple-1 p-3 flex flex-col gap-6 cursor-help">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center">
                        <div className="bg-green-600 rounded-full py-0.5 px-2 text-white-1 text-lg h-fit-content">Public</div>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 text-pink-hot text-sm tracking-wide font-medium text-center uppercase items-center">
                      <div className="flex gap-2 ml-auto">
                        {
                          <Countdown
                            date={new Date(2022, 10, 10, 23, 0, 0, 0)}
                            renderer={({ days, hours, minutes, seconds, completed }) => {
                              if (completed) {
                                return <span className="text-red-700">ENDED</span>;
                              } else {
                                return (
                                  <>
                                    <span className='text-amber-300 mt-2'>ENDS IN:</span>

                                    <div style={{ display: "inline" }}>
                                      <Tippy content={<span style={{ fontSize: "0.8rem" }}>Days</span>} style={{ display: "inline" }}>
                                        <div className="w-8 h-8 cursor-help bg-green-600 flex items-center justify-center rounded">
                                          <span className="text-sm font-bold text-white-1 font-mono">{days}</span>
                                        </div>
                                      </Tippy>
                                    </div>
                                    <div style={{ display: "inline" }}>
                                      <Tippy content={<span style={{ fontSize: "0.8rem" }}>Hours</span>} style={{ display: "inline" }}>
                                        <div className="w-8 h-8 cursor-help bg-green-600 flex items-center justify-center rounded">
                                          <span className="text-sm font-bold text-white-1 font-mono">{minutes}</span>
                                        </div>
                                      </Tippy>
                                    </div>
                                    <div style={{ display: "inline" }}>
                                      <Tippy content={<span style={{ fontSize: "0.8rem" }}>Minutes</span>} style={{ display: "inline" }}>
                                        <div className="w-8 h-8 cursor-help bg-green-600 flex items-center justify-center rounded">
                                          <span className="text-sm font-bold text-white-1 font-mono">{minutes}</span>
                                        </div>
                                      </Tippy>
                                    </div>
                                    <div style={{ display: "inline" }}>
                                      <Tippy content={<span style={{ fontSize: "0.8rem" }}>Seconds</span>} style={{ display: "inline" }}>
                                        <div className="w-8 h-8 cursor-help bg-green-600 flex items-center justify-center rounded">
                                          <span className="text-sm font-bold text-white-1 font-mono">{seconds}</span>
                                        </div>
                                      </Tippy>
                                    </div>
                                  </>
                                )
                              }
                            }}
                          />
                        }

                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1.5 text-white-1 tracking-wide text-xs"><span>MAX <b>10 TOKENS</b></span><b>•</b><span>Price <b>1.00₦</b></span>
                  </div>
                </div>
              </div>
            </Tippy>
          </div>
        </div>
        <div className="md:max-w-[50%] flex flex-col items-center w-full flex-grow self-stretch">
          <div className="overflow-hidden w-full">
            <div>
              <img src="https://c.tenor.com/YebbLUmkg9YAAAAM/among-us.gif" alt="Flip Near" className="object-cover aspect-square tw w-screen flex-grow rounded-3xl overflow-hidden" />
              <img src="https://c.tenor.com/YebbLUmkg9YAAAAM/among-us.gif" width="1" height="1" className="absolute invisible" /></div>
          </div>
          <div className="w-full mt-4 border border-solid p-2 bg-blue-400 rounded-3xlz" >
            <div className="flex flex-col gap-1 flex-grow 3xl:hidden">
              <div className="flex items-center justify-between text-[14px] text-gray-5">
                <span >Total minted</span>
                <span><b className="text-white-1 font-lg">26%</b> (1174/4444)</span>
              </div>
              <div className="progress-bar__container">
                <div className="progress-bar__value" style={{ width: "36%" }}>
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-center justify-between flex-wrap rounded-lg p-2">
              <div className="flex gap-4 mx-auto flex-col w-full items-center">
                <div className="flex justify-between gap-6 3xl:w-full">
                  <AuthButton />
                  <div className="flex flex-col gap-1 flex-grow hidden 3xl:flex flex-col-reverse self-center">
                    <div className="flex items-center justify-between text-[14px] text-gray-5">
                      <span >Total minted</span>
                      <span> <b className="text-white-1"> 26%</b>(1174/4444)</span>
                    </div>
                    <div className="progress-bar__container">
                      <div className="progress-bar__value" style={{ width: "26%" }}>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div >
        <div className="w-full h-[1px] border border-solid border-purple-1 mt-8 mb-2 lg:mt-22 lg:mb-8">
        </div>
      </div>
      <div className="modal fade" tabIndex="-1" role="dialog" style={{ backdropFilter: "blur(20px)" }}>
      </div>
    </div>
    </>

  )
}


// this component gets rendered by App after the form is submitted
function Notification() {
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`
  return (
    <aside>
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
        {window.accountId}
      </a>
      {' '/* React trims whitespace around tags; insert literal space character when needed */}
      called method: 'setGreeting' in contract:
      {' '}
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contract.contractId}`}>
        {window.contract.contractId}
      </a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  )
}


function NotificationError(props) {
  const urlPrefix = "https://explorer." + networkId + ".near.org/accounts";

  return (
    <aside>
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
        {window.accountId}
      </a>
      {' '/* React trims whitespace around tags; insert literal space character when needed */}
      tried to call a method in Contract:
      {' '}
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contract.contractId}`}>
        {window.contract.contractId}
      </a>
      <footer>
        <div className='err'>❌ Error: <span style={{ color: "white" }}>{props.err}</span></div>
        <div>Just now</div>
      </footer>
    </aside>
  )
}

function AuthButton() {
  return (
    < >
      {
        window.walletConnection.isSignedIn() ?
          <div className='flex-col inline-flex justify-center items-center'>

            <button className='mx-auto' onClick={mintmeup}> Mint!</button>
            <button className='wallet-adapter-button inline-flex justify-center items-center rounded-md text-white-1 h-auto min-h-[44px] font-semibold border border-solid' onClick={logout} style={{ width: "350px" }} >
              Disconnect Wallet
              <img src={NearLogo} alt="Near Logo" className='nearlogo' style={{ width: "40px", height: "40px" }} />
            </button>
          </div>
          :
          <button className='wallet-adapter-button inline-flex justify-center items-center rounded-md text-white-1 h-auto min-h-[44px] font-semibold border border-solid' onClick={login} style={{ width: "350px" }} >
            Connect Wallet
            <img src={NearLogo} alt="Near Logo" className='nearlogo' style={{ width: "40px", height: "40px" }} />
          </button>
      }
    </>
  )
}