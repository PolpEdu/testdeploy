import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout, mintmeup, maintitlesayings } from './utils'
import './global.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import NearLogo from './assets/logo-black.svg';
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaDiscord, FaTwitter } from "@react-icons/all-files/fa/FaBeer";



const projectName = 'Flip Near NFTs';
const totalnftammount = 555;
const info = "Flip Near 😱 is a juicy 💦 collection ❗ of 555 character NFT's 🆕 nesting on Near 😎. You mint the nft 📝, you stake it 🔒 and you win some Near daily 🤴. That's it 😐😐. I think we've covered it all 🥱🥱. hmmm. Let me think.............. OH 😵😵😵 AND YOU CAN ALSO USE IT 😲 TO FLEXD ON THIS KIDS 👀👀👀 WITH YOUR NEW PROFILE PIC LMAO🔥🤣🔥🤣💯💯🔥🤣💯🔥🤣";

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
    <div className="max-w-screen-3xl mx-auto my-4 w-full px-8">
      {errormsg && <NotificationError err={errormsg} />}
      <div className="flex flex-1 flex-col-reverse md:flex-row mx-auto gap-8 justify-between">
        <div className="flex flex-col gap-4 flex-grow md:max-w-[40%]">

          <div className="text-center text-medium border border-solid border-pink-primary rounded-md px-2 py-1 w-fit-content tracking-widest">
            {maintitle}
          </div>
          <h1 className="mt-1 text-6xl font-extrabold leading-none">
            {projectName}
          </h1>
          <div className="inline-flex gap-2 content-center w-fit-content flex-wrap pt-4">
            <Tippy content={<span style={{ fontSize: "0.8rem" }}>My devs be workin hard</span>} className="my-auto" style={{ display: "inline" }}>
              <div className="border border-solid border-purple-1 p-2 rounded-md text-white-1 h-fit-content text-[14px] flex gap-2 whitespace-nowrap">
                Super Cool Project
              </div>
            </Tippy>
            <Tippy content={<span style={{ fontSize: "0.8rem" }}>Gotta go fast 👀👀</span>} className="my-auto" style={{ display: "inline" }}>
              <div className="border border-solid border-purple-1 p-2 rounded-md text-white-1 h-fit-content text-[14px] flex gap-2 whitespace-nowrap"><span className="font-light">
                TOTAL ITEMS
              </span>
                <span className="font-bold">{totalnftammount}</span>
              </div>
            </Tippy>
            <Tippy content={<span style={{ fontSize: "0.8rem" }}>HODL 🙏🙏🙏</span>} className="my-auto" style={{ display: "inline" }}>
              <div className="border border-solid border-purple-1 p-2 rounded-md text-white-1 h-fit-content text-[14px] flex gap-2 whitespace-nowrap">
                <span className="font-light">PRICE</span>
                <span className="font-bold">1 Near</span>
              </div>
            </Tippy>


            <div className="flex items-center gap-2">
              <div aria-describedby="tippy-tooltip-10" data-original-title="Website" style={{ display: "inline" }}>
                <a target="_blank" rel="noopener noreferrer" href="https://www.nearflip.com/">
                  <img src="/static/media/globe_white.1cc8238d59c1be911999eabdeeb72b8c.svg" className="w-6 h-6 hover:opacity-80" /></a>
              </div>
              <div aria-describedby="tippy-tooltip-11" style={{ display: "inline" }}>
                <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/b7NJPuV5pk">
                  <FaDiscord className="w-6 h-6 hover:opacity-80" />
                </a>
              </div>
              <div aria-describedby="tippy-tooltip-12" data-original-title="Twitter" style={{ display: "inline" }}>
                <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/MagpieMoguls">
                  <img src="/static/media/twitter_white.646bf11eec160fc04b57653d5d95478b.svg" className="w-6 h-6 hover:opacity-80" />
                </a>
              </div>
            </div>
          </div>
          <p className="mb-4 text-gray-light">
            {info}
          </p>
          <div className="flex flex-col gap-4"><div aria-describedby="tippy-tooltip-13" data-original-title="Presale" style={{ display: "inline" }}>
            <div className="rounded-xl border border-solid border-purple-1 p-3 flex flex-col gap-6 hover:bg-purple-1 hover:cursor-help">
              <div className="flex justify-between items-center"><div><div className="flex items-center"><div className="bg-purple-3 rounded-full py-0.5 px-2 text-white-1 text-[12px] h-fit-content">Presale</div></div></div><div className="flex flex-row gap-2 text-pink-hot text-sm tracking-wide font-medium text-center uppercase items-center">Ended</div></div><div className="flex gap-1.5 text-white-1 tracking-wide text-sm"><span>WHITELIST <b>832</b></span><b>•</b><span>MAX <b>1 TOKEN</b></span><b>•</b><span>Price <b>1.00₦</b></span></div></div></div><div aria-describedby="tippy-tooltip-17" data-original-title="Public" style={{ display: "inline" }}><div className="rounded-xl border border-solid border-purple-1 p-3 flex flex-col gap-6 hover:bg-purple-1 hover:cursor-help"><div className="flex justify-between items-center"><div><div className="flex items-center"><div className="bg-purple-3 rounded-full py-0.5 px-2 text-white-1 text-[12px] h-fit-content">Public</div></div></div><div className="flex flex-row gap-2 text-pink-hot text-sm tracking-wide font-medium text-center uppercase items-center">Ends in<div className="flex gap-2 ml-auto"><div aria-describedby="tippy-tooltip-14" data-original-title="Days" style={{ display: "inline" }}><div className="w-8 h-8 cursor-help bg-purple-3 flex items-center justify-center rounded"><span className="text-sm font-bold text-white-1 font-mono">06</span></div></div>
                <div aria-describedby="tippy-tooltip-15" data-original-title="Hours" style={{ display: "inline" }}><div className="w-8 h-8 cursor-help bg-purple-3 flex items-center justify-center rounded"><span className="text-sm font-bold text-white-1 font-mono">07</span></div></div><div aria-describedby="tippy-tooltip-16" data-original-title="Minutes" style={{ display: "inline" }}><div className="w-8 h-8 cursor-help bg-purple-3 flex items-center justify-center rounded"><span className="text-sm font-bold text-white-1 font-mono">08</span></div></div></div></div></div><div className="flex gap-1.5 text-white-1 tracking-wide text-sm"><span>MAX <b>10 TOKENS</b></span><b>•</b><span>Price <b>1.00₦</b></span></div></div></div></div></div><div className="md:max-w-[50%] flex flex-col items-center w-full flex-grow self-stretch"><div className="overflow-hidden w-full mb-4 flex-grow rounded-3xl"><div>
                  <img src="https://c.tenor.com/YebbLUmkg9YAAAAM/among-us.gif" alt="Flip Near" className="object-cover aspect-square tw w-screen flex-grow rounded-3xl overflow-hidden" />
                  <img src="https://c.tenor.com/YebbLUmkg9YAAAAM/among-us.gif" width="1" height="1" className="absolute invisible" /></div></div><div className="w-full"><div className="flex flex-col gap-1 flex-grow 3xl:hidden"><div className="flex items-center justify-between text-[14px] text-gray-5"><span >Total minted</span><span><b className="text-white-1">26%</b> (1174/4444)</span></div><div className="progress-bar__container"><div className="progress-bar__value" style={{ width: "26%" }}></div></div></div><div className="flex gap-4 items-center justify-between flex-wrap rounded-lg bg-purple-2 p-4 mt-4"><div className="flex gap-4 mx-auto flex-col w-full items-center"><div className="flex justify-between gap-6 3xl:w-full">

                    <AuthButton />
                    <div className="flex flex-col gap-1 flex-grow hidden 3xl:flex flex-col-reverse self-center">
                      <div className="flex items-center justify-between text-[14px] text-gray-5">
                        <span >Total minted</span>
                        <span> <b className="text-white-1"> 26%</b>(1174/4444)</span>
                      </div>
                      <div className="progress-bar__container"><div className="progress-bar__value" style={{ width: "26%" }}>
                      </div></div></div></div></div></div></div></div></div><div ><div className="w-full h-[1px] border border-solid border-purple-1 mt-12 mb-4 lg:mt-32 lg:mb-10"></div></div><div><div className="flex flex-1 flex-col md:flex-row mx-auto gap-32 pb-20 justify-between"><div className="flex flex-col gap-4 flex-grow md:w-[40%]"><h1 className="mt-1 text-[58px] font-extrabold leading-none">Flip Near</h1><div className="flex flex-wrap gap-4"><a href="https://docs.magpiemoguls.com/" target="_blank" rel="noreferrer noopener" className="border border-solid border-purple-1 flex items-center gap-2 w-fit rounded-full px-2.5 py-1.5 text-white-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20" color="#e42575"><path stroke="#F5F3F7" strokeLinecap="round" strokeLinejoin="round" d="M15 10.833v5a1.666 1.666 0 01-1.667 1.667H4.167A1.667 1.667 0 012.5 15.833V6.667A1.667 1.667 0 014.167 5h5M12.5 2.5h5v5M8.332 11.667L17.499 2.5"></path></svg><span>Whitepaper</span></a><a href="https://www.magpiemoguls.com/" target="_blank" rel="noreferrer noopener" className="border border-solid border-purple-1 flex items-center gap-2 w-fit rounded-full px-2.5 py-1.5 text-white-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20" color="#e42575">
                        <path stroke="#F5F3F7" strokeLinecap="round" strokeLinejoin="round" d="M15 10.833v5a1.666 1.666 0 01-1.667 1.667H4.167A1.667 1.667 0 012.5 15.833V6.667A1.667 1.667 0 014.167 5h5M12.5 2.5h5v5M8.332 11.667L17.499 2.5"></path></svg><span>Website</span></a>
                        <a href="https://discord.gg/b7NJPuV5pk" target="_blank" rel="noreferrer noopener" className="border border-solid border-purple-1 flex items-center gap-2 w-fit rounded-full px-2.5 py-1.5 text-white-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20" color="#e42575"><path stroke="#F5F3F7" strokeLinecap="round" strokeLinejoin="round" d="M15 10.833v5a1.666 1.666 0 01-1.667 1.667H4.167A1.667 1.667 0 012.5 15.833V6.667A1.667 1.667 0 014.167 5h5M12.5 2.5h5v5M8.332 11.667L17.499 2.5"></path></svg><span>Discord</span></a><a href="https://twitter.com/MagpieMoguls" target="_blank" rel="noreferrer noopener" className="border border-solid border-purple-1 flex items-center gap-2 w-fit rounded-full px-2.5 py-1.5 text-white-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20" color="#e42575"><path stroke="#F5F3F7" strokeLinecap="round" strokeLinejoin="round" d="M15 10.833v5a1.666 1.666 0 01-1.667 1.667H4.167A1.667 1.667 0 012.5 15.833V6.667A1.667 1.667 0 014.167 5h5M12.5 2.5h5v5M8.332 11.667L17.499 2.5"></path></svg><span>Twitter</span></a><a href="https://explorer.solana.com/address/9UaTjLVUTtJF3n9sG8VfvYt4pdYGf7Y59qYZFBRx4kLo" target="_blank" rel="noreferrer noopener" className="border border-solid border-purple-1 flex items-center gap-2 w-fit rounded-full px-2.5 py-1.5 text-white-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20" color="#e42575"><path stroke="#F5F3F7" strokeLinecap="round" strokeLinejoin="round" d="M15 10.833v5a1.666 1.666 0 01-1.667 1.667H4.167A1.667 1.667 0 012.5 15.833V6.667A1.667 1.667 0 014.167 5h5M12.5 2.5h5v5M8.332 11.667L17.499 2.5"></path></svg><span>Contract 9UaT...4kLo</span></a></div><div><h2 className="text-white-1 text-xl pt-1 pb-3" level="1">Description</h2>
                          <p className="text-gray-light mb-3 text-[16] tx-line-[24]">Flip Near is a generative art collection of 4,444 characters on Solana, intended to be used as profile pictures or collected as artwork.  Our project focuses on high quality art that the NFT community will love to display, and innovative utilities.  Our collection will feature a companion app that allows our community to connect their wallet and grow their Magpies Nest.</p>
                          <p className="text-gray-light mb-3 text-[16] tx-line-[24]">The more space available in a holders nest, the more room for airdrops.  Airdrops will be rewarded uniquely to our holders and will not be all the same.  We will also be launching our own token $NEST.  Our token will be rewarded daily to our holders who use their Magpie Mogul as their Twitter profile picture, and we will verify this via image recognition.  It will also be available on a DEX.  Using our Token our holders will be able to expand the room in their nest, collect unique airdrops, and get ready for the launch of our companion collection.  The airdrops in a holders nest will directly impact the rarity of the mate they get when we release the female collection.  All of this is based on how Magpies in the real world behave.</p>
                          <p className="text-gray-light mb-3 text-[16] tx-line-[24]"><img className="rounded-xl" src="https://dl.airtable.com/.attachmentThumbnails/2b4b3bb9ecc5fe8717d689c30fcf5692/14d426cb" alt="Flip Near" /></p></div></div><div className="flex flex-col gap-4 flex-grow md:w-[50%]"><div className="w-full self-stretch"><div className="flex gap-8 lg:gap-16"><div className="relative me-tab2 flex cursor-pointer mr-2 py-2 px-4 is-active text-white-2 font-medium text-lg"><span className="me-tab2-title">Roadmap</span></div><div className="relative me-tab2 flex cursor-pointer mr-2 py-2 px-4 text-white-2 font-medium text-lg"><span className="me-tab2-title">Team</span></div></div></div><div className="p-4"><div className="my-1"><p className="text-gray-light text-md text-[14px]">After our public mint we will be working to release our dAPP + Token.  With this, our holders will be rewarded with $NEST and Airdrops simply by having their Magpie Mogul as their profile picture on social media.</p><br /></div>
                            <div className="my-1"><p className="text-gray-light text-md text-[14px]">Using our companion app you will be able to stake your airdrops to earn more $NEST.  In order to stake more airdrops you must increase the capacity of your Nest by obtaining our $NEST Token.  The airdrops you receive will also come with multipliers and bonuses to help you earn more tokens and other rewards!</p><br /></div>
                            <div className="my-1"><p className="text-gray-light text-md text-[14px]">The airdrops you stake will also directly impact the mate you attract when we launch our Magpie Mates collection.  Magpies collect all kinds of cool, shiny objects and put them in their nests to attract mates and, well, just look cool.  Now you can do this too, in a rewarding and utility focused ecosystem.</p><br /></div>
                            <div className="my-1"><p className="text-gray-light text-md text-[14px]">As you evolve your nest, collect airdrops, and build up your token balance our holders will be able to unlock more benefits in the near future.  We plan on launching the Magpie Mates collection, and several other utility based collections after that!  Our goal for this project is to create a sustainable and rewarding ecosystem for our holders.</p><br /></div>
                            <div className="my-1"><p className="text-gray-light text-md text-[14px]"><a className="text-pink-hot block text-md text-[14px]" href="https://docs.magpiemoguls.com/roadmap" target="_blank" rel="noreferrer">Roadmap</a></p><br /></div></div></div></div></div><div className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true" style={{ backdropFilter: "blur(20px)" }}><div className="modal-dialog modal-dialog-centered" role="document"><div className="modal-content position-relative bg-gray-100 rounded-xl p-4 border-gray-500"><div className="modal-body"><div className="flex flex-col w-full items-center">

                            </div>
                            </div>
                            </div>
                            </div>
      </div>
    </div>

  )
}
/*
      <div className='max-w-screen-2xl mx-auto my-4 w-full px-8' >
        
        <div className='flex flex-1 flex-col-reverse md:flex-row mx-auto gap-8 justify-between' >

        </div>

        
        <main>
          <button onClick={mintmeup} disabled={!window.walletConnection.isSignedIn()}>
            YOOOO

          </button>
        </main>
      </div>*/
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
          <button className='wallet-adapter-button inline-flex justify-center items-center rounded-md text-white-1 h-auto min-h-[44px] font-semibold ' onClick={logout} style={{ width: "350px" }} >
            Sign out
            <img src={NearLogo} alt="Near Logo" className='nearlogo' style={{ width: "40px", height: "40px" }} />
          </button>
          :
          <button className='wallet-adapter-button inline-flex justify-center items-center rounded-md text-white-1 h-auto min-h-[44px] font-semibold' onClick={login} style={{ width: "350px" }} >
            Connect Wallet
            <img src={NearLogo} alt="Near Logo" className='nearlogo' style={{ width: "40px", height: "40px" }} />
          </button>
      }
    </>
  )
}