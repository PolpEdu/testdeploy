import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Confetti from 'react-confetti';
import { Modal, Row, Container, Col } from 'react-bootstrap';
import { useSearchParams, useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';

import './global.css'
import './cointopright.css'

import { Notification, NotificationError } from './App.js'
import { NotLogged, Loading, CreateRoom, SelfMatches } from './components/logged';
import FooterComponent from './components/FooterComponent'
import HeaderButtons from './components/HeaderComponents';

import { convertYocto, gettxsRes, menusayingsmult, processEvent, startup, getRooms, getRoomInfoFromTxs, joinMultiplayer, listenToRoom, storageRent } from './utils'
import LOGOMAIN from './assets/result.svg'
import LOGOBACK from './assets/nearcoin.svg'

function genrandomphrase() {
    return menusayingsmult[Math.floor(Math.random() * menusayingsmult.length)];
}
const contentStyle = {
    maxWidth: "35rem",
    width: "90%",
}
export default function Mult() {
    startup();

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const [showNotification, setShowNotification] = React.useState(false)
    let msg = "";
    if (searchParams.get("errorCode")) {
        msg = searchParams.get("errorCode") + ", " + (searchParams.get("errorMessage").replaceAll("%20", " ")) + ".";
    }

    const [errormsg, setErrormsg] = React.useState(msg);
    const [txsHashes, settxsHash] = React.useState(searchParams.get("transactionHashes"));
    const [sideChoosen, setSideBet] = React.useState(null);
    const [ammoutNEAR, setBetAmmount] = React.useState(null);
    const [errorHappend, setErrorHappend] = React.useState(false);

    const [surprisePhrase, setSurprisePhrase] = React.useState(genrandomphrase())
    const [txsResult, settxsResult] = React.useState("");
    const [processing, setprocessing] = React.useState(true);

    const [rooms, setRooms] = React.useState([]);


    React.useEffect(
        () => {
            // in this case, we only care to query the contract when signed in
            if (window.walletConnection.isSignedIn()) {
                console.log(txsHashes)
                if (txsHashes) {
                    gettxsRes(txsHashes).then(res => {
                        let decodedstr = "";
                        let sidebetstr = "";
                        let nearbetstr = "";
                        setShowNotification(true)
                        try {
                            let decoded = Buffer.from(res.status.SuccessValue, 'base64')
                            decodedstr = decoded.toString("ascii")

                            let sideBet = Buffer.from(res.transaction.actions[0].FunctionCall.args, 'base64')

                            sidebetstr = sideBet.toString("ascii")
                            sidebetstr = JSON.parse(sidebetstr)
                            sidebetstr = sidebetstr.face;

                            let betAmm = (res.transaction.actions[0].FunctionCall.deposit - storageRent).toLocaleString('fullwide', { useGrouping: false })
                            console.log(betAmm)
                            nearbetstr = convertYocto(betAmm)
                        } catch (error) {
                            console.log(error)
                            setErrormsg("Error while decoding the transaction")
                            setErrorHappend(true)
                        }
                        if (decodedstr !== "true") {
                            setErrormsg("Error while decoding the transaction")
                            setErrorHappend(true)
                        }

                        console.log("side bet: " + sidebetstr)
                        console.log("near bet: " + nearbetstr)

                        //set the info using the txs result
                        setprocessing(false)
                        settxsResult(decodedstr)
                        setSideBet(sidebetstr)
                        setBetAmmount(nearbetstr)
                        listenToRoom(processEvents)
                        console.log("hello: " + processing)
                    }).catch(e => {
                        if (!e instanceof TypeError) {
                            console.error(e)
                        }
                        setErrorHappend(true)
                        setprocessing(false)
                    })
                    return;
                }
            }

            getRooms().then(data => {
                setRooms(data);
                setprocessing(false);
            }).catch(err => {
                console.log(err);
                setprocessing(false);
                setErrorHappend(true);
            });


            searchParams.delete("errorCode");
            searchParams.delete("errorMessage");
            navigate(searchParams.toString());
        },
        []
    );

    const resetGame = () => {
        setTailsHeads(Math.random() < 0.5 ? "tails" : "heads")
        settxsHash("")
        settxsResult("")
        setErrormsg("")
        setWonAmmount("")
        setprocessing(false)


        searchParams.delete("transactionHashes")
        searchParams.delete("errorCode")
        searchParams.delete("errorMessage")
        navigate(searchParams.toString());
    }
    const processEvents = (events) => {
        // console.log(events);
        events = events.flatMap(processEvent);
        events.reverse();

    };



    const joinRoom = async (roomId, ammount, roomCreator) => {
        setprocessing(true)

        console.log("join room: " + roomId)
        console.log("ammount: " + ammount)
        console.log("room creator: " + roomCreator)

        //navigate to the room


    }

    const cancelMatch = async (roomId) => {
        setprocessing(true)
        deleteMatch(roomId)
    }

    return (
        <div>
            {showNotification && <Notification />}
            {errormsg && <NotificationError err={errormsg} ismult={true} />}
            <HeaderButtons />
            <div className='text-center body-wrapper h-100'>
                <div className='play form-signin'>
                    {txsHashes ?
                        <div className='maincenter text-center' style={{ maxWidth: "34rem" }}>
                            {txsResult === "" || sideChoosen === null ? <Loading /> :
                                <>
                                    {txsResult === "true" ?
                                        <>
                                            <div className="textinfoyellow font-weight-normal" style={{ fontSize: "2rem" }}>
                                                WAITING FOR OPPONENT
                                            </div>
                                            <div className="d-flex my-auto">
                                                <div className="flip-box mb-2 mx-auto h-full " style={{ width: "50%", marginTop: "20%" }}>
                                                    <div className='d-flex justify-content-center flex-row borderpixelSMALL'>
                                                        <div className="flip-box-inner d-flex justify-content-center flex-column mx-auto my-auto" style={{ fontWeight: "500", color: "white", fontSize: "1.45rem", width: "70%" }}>
                                                            <span className='my-auto'>
                                                                Flip Ammount: {ammoutNEAR}
                                                            </span>

                                                            <span className='text-danger text-center pt-3' style={{ fontSize: "0.75rem" }}>
                                                                Logged as: <span className='text-center rounded'>{window.window.accountId}</span>.
                                                            </span>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flip-box logo mb-2 mx-auto" style={{ width: "40%", marginTop: "10%" }}>
                                                    <div className={sideChoosen === true ? "flip-box-inner my-auto" : "flip-box-inner-flipped my-auto"}>
                                                        <div className="flip-box-front ">
                                                            <img src={LOGOMAIN} alt="logo" width="220" height="220" onClick={() => { toggleHeadsTails() }} />
                                                        </div>
                                                        <div className="flip-box-back">
                                                            <img src={LOGOBACK} alt="logoback" width="220" height="220" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="button button-retro is-error" onClick={resetGame}>
                                                Cancel
                                            </button>
                                        </>
                                        :
                                        <>
                                            <div className="textinfolose font-weight-normal" style={{ fontSize: "2rem" }}>
                                                ERROR
                                            </div>
                                            <button className="button button-retro is-error" onClick={resetGame}>
                                                Some Error Ocurred... Try again.
                                            </button>
                                        </>

                                    }
                                </>
                            }
                        </div>
                        :
                        <div className='menumain' style={!window.walletConnection.isSignedIn() ? { maxWidth: "860px" } : { maxWidth: "1000px" }}>
                            <h1 className="textsurprese font-weight-normal" style={{ fontSize: "1.5rem" }}>{surprisePhrase}</h1>
                            {
                                window.walletConnection.isSignedIn() ?
                                    <>
                                        <div className='d-flex flex-row-reverse justify-content-center mt-sm-1'>
                                            <button className="button button-retro button-retro-small is-success ms-2"
                                                style={{ letterSpacing: "2px", width: "8rem" }}
                                                onClick={event => {
                                                    setprocessing(true)

                                                    getRooms().then(res => {
                                                        console.log(res)
                                                        setprocessing(false)
                                                        setTables(res)
                                                    }).catch(e => {
                                                        setprocessing(false)
                                                        setErrorHappend(true)
                                                    })
                                                }}>
                                                {processing ? <Loading size={"0.8rem"} color={"text-light"} /> : "Refresh"}
                                            </button>
                                            <Popup trigger={
                                                <button className="button button-retro button-retro-small is-yellow ms-2"
                                                    style={{ letterSpacing: "2px", width: "8rem" }}>
                                                    Your Matches
                                                </button>
                                            } position="center center"
                                                modal
                                                contentStyle={contentStyle}
                                            >
                                                <SelfMatches />
                                            </Popup>
                                            <Popup trigger={
                                                <button className="button button-retro button-retro-small is-primary ms-2"
                                                    style={{ letterSpacing: "2px", width: "8rem" }}>
                                                    Create Room
                                                </button>
                                            } position="center center"
                                                modal
                                                contentStyle={contentStyle}
                                            >
                                                <CreateRoom />
                                            </Popup>

                                            <button className="button button-retro button-retro-small is-error ms-2"
                                                style={{ letterSpacing: "2px", width: "8rem", fontSize: "0.7rem" }}
                                                onClick={event => {


                                                }}>
                                                Feeling Lucky
                                            </button>
                                        </div>
                                    </>
                                    : <></>
                            }

                            <div className='maincenter-multi text-center'>

                                {!window.walletConnection.isSignedIn() ?
                                    <>
                                        <img src={LOGOMAIN} className="logo mx-auto" alt="logo" width="240" height="240" />
                                    </> :
                                    <div className='d-flex flex-column '>
                                        <div id="game" className="game">
                                            <h4 className="text-uppercase mt-3 start-mult">
                                                Select Player
                                            </h4>
                                        </div>
                                        <hr className="mt-1" />
                                        {/* display in a grid system the objects in the rooms array */}
                                        <Container className="d-flex flex-wrap justify-content-center">
                                            {processing === true ?
                                                <div className='d-flex flex-column justify-items-center text-center'>
                                                    <p style={{ fontSize: "2rem" }}>Connecting</p>
                                                    <div className='mx-auto'>
                                                        <Loading size={40} color={"text-light"} />
                                                    </div>
                                                    <button className="button button-retro is-warning bordercool d-inline-block text-center mt-2"
                                                        style={{ overflow: "hidden", fontSize: "1rem", textOverflow: "ellipsis" }}
                                                        onClick={() => { window.location.reload(false) }}>
                                                        <p className="mb-0" style={{ color: "#00000" }}>Refresh</p>

                                                    </button>
                                                </div>
                                                : <>
                                                    {rooms === undefined || rooms.length === 0 ?
                                                        <div className='d-flex flex-column'>
                                                            <p>No rooms available.</p>
                                                            <p>Try to create on for yourself!</p>
                                                        </div>
                                                        :
                                                        <Row className="justify-content-center align-items-center" >

                                                            {rooms.map((room, index) => {
                                                                {/* check if the room creator is greater than 25, if so cut the name to 25 characters */ }
                                                                let roomCreator = room.creator;
                                                                let ammountNEAR = convertYocto(room.entry_price.toLocaleString('fullwide', { useGrouping: false }));

                                                                if (roomCreator.length > 18) {
                                                                    roomCreator = roomCreator.substring(0, 17) + "…";
                                                                }

                                                                return (
                                                                    <div className='mt-1 col col-sm-10 col-m-5 col-lg-5 col-xl-5 '>
                                                                        <button className="button button-retro is-warning bordercool d-inline-block text-center"
                                                                            style={{ overflow: "hidden", fontSize: "1rem", textOverflow: "ellipsis" }}
                                                                            onClick={() => joinRoom(room.id, ammountNEAR, room.creator)}>
                                                                            <span>{roomCreator}</span>
                                                                            <p className="mb-0" style={{ color: "#dd403a" }}>{Math.round(ammountNEAR * 10000000) / 10000000} Near</p>

                                                                        </button>
                                                                    </div>
                                                                )
                                                            })}
                                                        </Row>
                                                    }
                                                </>
                                            }
                                        </Container>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
                {!window.walletConnection.isSignedIn() ? <NotLogged /> : <></>}
            </div>
            <FooterComponent />
        </div >
    )

}
