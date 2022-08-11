import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Confetti from 'react-confetti';
import { Modal, Row, Container, Col } from 'react-bootstrap';
import { useSearchParams, useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import useWindowSize from 'react-use/lib/useWindowSize'
import io from 'socket.io-client';



import './global.css'
import './cointopright.css'

import { Notification, NotificationError } from './App.js'
import { NotLogged, Loading, CreateRoom, SelfMatches } from './components/logged';
import FooterComponent from './components/FooterComponent'
import HeaderButtons from './components/HeaderComponents';

import { convertYocto, gettxsRes, menusayingsmult, sendpostwithplay, startup, getRooms, getRoomInfoFromTxs } from './utils'
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

    const [surprisePhrase, setSurprisePhrase] = React.useState(genrandomphrase())
    const [txsResult, settxsResult] = React.useState("");
    const [processing, setprocessing] = React.useState(false);
    const [isrefreshing, setisrefreshing] = React.useState(false);

    const [rooms, setRooms] = React.useState([]);
    const socketRef = React.useRef();


    React.useEffect(
        () => {
            // in this case, we only care to query the contract when signed in
            if (window.walletConnection.isSignedIn()) {
                socketRef.current = io(process.env.DATABASE_URL, { transports: ['websocket', 'polling', 'flashsocket'] })


                socketRef.current.on('connect', () => {
                    console.log('Connected to server socket');
                    socketRef.current.emit('gettables');
                });

                socketRef.current.on('rooms', (data) => {
                    setRooms(data);
                    setisrefreshing(false);

                });

                let hash = searchParams.get("transactionHashes");
                if (hash) {
                    socketRef.current.emit('createNewGame')

                    //redirect player to /room/:gameId
                    getRoomInfoFromTxs(hash).then(room => {
                        if (room) {
                            navigate(`/room/${room.Id}`)
                        }
                    })
                }




                searchParams.delete("errorCode");
                searchParams.delete("errorMessage");
                navigate(searchParams.toString());


                getTxsResult(txsHashes);
            }

            return () => socketRef.current.disconnect();
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


    const getTxsResult = async () => {
        let decodedstr = "";
        let sidebetstr = "";
        let nearbetstr = "";

        await gettxsRes(txsHashes).then(res => {
            console.log(res)
            setShowNotification(true)

            let decoded = Buffer.from(res.status.SuccessValue, 'base64')
            decodedstr = decoded.toString("ascii")

            let sideBet = Buffer.from(res.transaction.actions[0].FunctionCall.args, 'base64')

            sidebetstr = sideBet.toString("ascii")
            sidebetstr = JSON.parse(sidebetstr)
            sidebetstr = sidebetstr.face;

            let betAmm = Buffer.from(res.transaction.actions[0].FunctionCall.deposit, 'base64')
            nearbetstr = convertYocto(betAmm)

            console.log("decoded result: " + decodedstr)
            console.log("side bet: " + sidebetstr)
            console.log("near bet: " + nearbetstr)

            settxsResult(decodedstr)
            setSideBet(sidebetstr)
            setBetAmmount(nearbetstr)



        }).catch(e => {
            if (!e instanceof TypeError) {
                console.error(e)
            }

        })

    }


    const joinRoom = async (roomId) => {
        setprocessing(true)

        socketRef.current.emit('playerJoinGame', roomId);
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
                        <div className='maincenter text-center' style={{ maxWidth: "32rem" }}>
                            {txsResult === "" || sideChoosen === null ? <Loading /> :
                                <>
                                    {txsResult === "true" ?
                                        <>

                                            <div className="textinfoyellow font-weight-normal" style={{ fontSize: "2rem" }}>
                                                Waiting for opponent...
                                            </div>
                                            <div className="d-flex mt-4">
                                                <div className="flip-box mb-2 mx-auto h-full" style={{ width: "55%" }}>
                                                    <div className='d-flex justify-content-center flex-row borderpixelSMALL'>
                                                        <div className="flip-box-inner d-flex justify-content-center flex-column mx-auto" style={{ fontWeight: "500", color: "white", fontSize: "1.45rem", width: "70%" }}>
                                                            <span className='mb-4'>
                                                                Flip Ammount:
                                                            </span>


                                                            <span className='text-danger text-center pt-3' style={{ fontSize: "0.75rem" }}>
                                                                {Math.round(ammoutNEAR * 1000000) / 1000000} Near after Fees.
                                                            </span>

                                                        </div>
                                                    </div>


                                                </div>
                                                <div className="flip-box logo mb-2 mx-auto" style={{ width: "40%" }}>
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
                                                    setisrefreshing(true);
                                                    socketRef.current.emit('gettables');
                                                }}>
                                                {processing || isrefreshing ? <Loading size={"0.8rem"} color={"text-light"} /> : "Refresh"}
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
                                                <SelfMatches socket={socketRef.current} />
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
                                                <CreateRoom socket={socketRef.current} />
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

                                        {socketRef.current?.connected === false || socketRef.current?.disconnected === true || socketRef.current === undefined || socketRef.current === null ?
                                            <>
                                                <div id="game" className="game">
                                                    <h4 className="text-uppercase mt-3 start-error">ERROR</h4>
                                                </div>

                                            </>
                                            :
                                            <div id="game" className="game">
                                                <h4 className="text-uppercase mt-3 start-mult">
                                                    Select Player</h4>
                                            </div>
                                        }

                                        <hr className="mt-1" />


                                        {/* display in a grid system the objects in the rooms array */}
                                        <Container className="d-flex flex-wrap justify-content-center">
                                            {socketRef.current?.connected === false || socketRef.current === undefined || socketRef.current?.disconnected === true || socketRef.current === null ?
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
                                                                            onClick={() => joinRoom(room.id)}>
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
