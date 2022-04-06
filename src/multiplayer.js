import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { logout, convertYocto, gettxsRes, menusayingsmult, fees, sendpostwithplay, startup, getRooms } from './utils'
import Confetti from 'react-confetti';
import { Modal, Row, Container, Col } from 'react-bootstrap';
import './global.css'
import './cointopright.css'
import { useSearchParams, useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import { Notification, NotificationError } from './App.js'
import { NotLogged, Loading, RecentPlays, TopPlays, TopPlayers, CreateRoom } from './components/logged';
import ParasLogoB from './assets/paras-black.svg';
import ParasLogoW from './assets/paras-white.svg';
import { Twitter, Discord } from 'react-bootstrap-icons';
import useWindowSize from 'react-use/lib/useWindowSize'
import { Link } from 'react-router-dom';
import LOGOMAIN from './assets/result.svg';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import io from 'socket.io-client';

function genrandomphrase() {
    return menusayingsmult[Math.floor(Math.random() * menusayingsmult.length)];
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
    const [ammountWon, setWonAmmount] = React.useState("")
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [show, setShow] = React.useState(false);

    const [balance, setbalance] = React.useState("")
    const [txsHashes, settxsHash] = React.useState(searchParams.get("transactionHashes"));
    const [surprisePhrase, setSurprisePhrase] = React.useState(genrandomphrase())
    const [rooms, setRooms] = React.useState([]);
    const [txsResult, settxsResult] = React.useState("");
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [ammoutNEAR, setammout] = React.useState("")
    const [processing, setprocessing] = React.useState(false);
    const [isrefreshing, setisrefreshing] = React.useState(false);

    const [socket, setSocket] = React.useState(null);

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
    const contentStyle = {
        maxWidth: "35rem",
        width: "90%",
    }

    const getTxsResult = async () => {
        let decodedstr = "";
        let decodedWonAmmountstr = "";

        settxsResult(decodedstr);
        setWonAmmount(decodedWonAmmountstr)
    }

    const joinRoom = async (roomId) => {
        setprocessing(true)
        setButtonDisabled(true)
    }


    React.useEffect(
        () => {
            //connect to server socket
            const newSocket = io(process.env.DATABASE_URL, { transports: ['websocket', 'polling', 'flashsocket'] })
            console.log(newSocket)
            setSocket(newSocket)



            // in this case, we only care to query the contract when signed in
            if (window.walletConnection.isSignedIn()) {
                //console.log("LOADING BALANCE AND HEADS OR TAILS")
                window.walletConnection.account().getAccountBalance().then(function (balance) {
                    let fullstr = convertYocto(balance.available).split(".");
                    let str = fullstr[0] + "." + fullstr[1].substring(0, 4);
                    setbalance("NEAR: " + str);
                }).catch(e => {
                    console.log('There has been a problem with getting your balance: ' + e.message);
                    setbalance("Couldn't Fetch Balance");
                });


                searchParams.delete("errorCode");
                searchParams.delete("errorMessage");
                navigate(searchParams.toString());


                getTxsResult(txsHashes);
            }

            return () => socket.disconnect();
        },
        [setSocket]
    );
    const { width, height } = useWindowSize();
    return (
        <div>
            {showNotification && <Notification />}
            {errormsg && <NotificationError err={errormsg} ismult={true} />}
            <div className='social-icons'>
                <div className='d-flex flex-sm-column justify-content-start align-items-center h-100 mt-auto'>
                    <div className='mt-3 d-flex flex-column shortcut-row'>
                        <div className='d-flex flex-sm-row ustify-content-center flex-column mb-2 toolbar mx-auto'>
                            <div className='d-flex flex-row'>
                                <div role='button' className='retro-btn warning'>
                                    <Link to="/" id="RouterNavLink">
                                        <div className='buttoncool'>
                                            <span className='btn-inner'>
                                                <span className='content-wrapper'>
                                                    <span className='btn-content'>

                                                        <span className='btn-content-inner' label="Flip Alone">
                                                        </span>
                                                    </span>
                                                </span>
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                                <Popup trigger={
                                    <div role='button' className='retro-btn danger'>
                                        <a className='buttoncool'>
                                            <span className='btn-inner'>
                                                <span className='content-wrapper'>
                                                    <span className='btn-content'>
                                                        <span className='btn-content-inner' label="ON FIRE">
                                                        </span>
                                                    </span>
                                                </span>
                                            </span>
                                        </a>
                                    </div>

                                } position="center center"
                                    modal
                                    contentStyle={contentStyle}
                                >
                                    <TopPlays />
                                </Popup>

                            </div>
                            <div className='d-flex flex-row'>
                                <Popup trigger={
                                    <div role='button' className='retro-btn'>
                                        <a className='buttoncool'>
                                            <span className='btn-inner'>
                                                <span className='content-wrapper'>
                                                    <span className='btn-content'  >
                                                        <span className='btn-content-inner' label="WHO'S PLAYIN">
                                                        </span>
                                                    </span>
                                                </span>
                                            </span>
                                        </a>
                                    </div>
                                } position="center center"
                                    modal
                                    contentStyle={contentStyle}
                                >
                                    <RecentPlays />

                                </Popup>

                                <Popup trigger={
                                    <div role='button' className='retro-btn info'>
                                        <a className='buttoncool'>
                                            <span className='btn-inner'>
                                                <span className='content-wrapper'>
                                                    <span className='btn-content'>
                                                        <span className='btn-content-inner' label="TOP PLAYERS">
                                                        </span>
                                                    </span>
                                                </span>
                                            </span>
                                        </a>
                                    </div>
                                } position="center center"
                                    modal
                                    contentStyle={contentStyle}
                                >
                                    <TopPlayers />
                                </Popup>
                            </div>

                            {!window.walletConnection.isSignedIn() ? <></> : <><div className="profile-picture-md"><img className="image rounded-circle cursor-pointer border-2" src="https://i.imgur.com/E3aJ7TP.jpg" alt="" onClick={handleShow} />
                            </div>
                                <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered >
                                    <div className='borderpixelPR'>
                                        <Modal.Body className='p-0 ' style={{ color: "black" }}>
                                            <div className='d-flex flex-column '>
                                                <div className="card-body text-center">
                                                    <h4 style={{ fontWeight: "bold" }}>USER PROFILE</h4>
                                                    <h6>
                                                        <small style={{ fontWeight: "semibold" }} className="w-30">Currently logged as:{window.accountId}!</small>
                                                    </h6>
                                                    <div className="profile-picture d-flex w-80 mb-3">
                                                        <div className="imageWrapper ms-auto me-auto">
                                                            <img className="rounded-circle cursor-pointer image-large" src="https://i.imgur.com/E3aJ7TP.jpg" alt="pfp" />
                                                            <a href="#" className="cornerLink" ><small style={{ fontSize: "0.75rem" }}>CHANGE PICTURE</small></a>
                                                        </div>
                                                    </div>
                                                    <h6>First Fliperino: </h6>
                                                    <div className="input-group">

                                                        {/*<input type="text" className="form-control" placeholder="Nickname" aria-label="Username" aria-describedby="basic-addon1" value=""/>
                        */}
                                                    </div>
                                                </div>
                                                <div className='d-flex  flex-column justify-content-center bg-light linetop' style={{ margin: "0px" }}>
                                                    <button className='w-80 mt-3 ms-3 me-3 justify-content-center mx-auto btnhover btn btn-success' style={{ fontFamily: "VCR_OSD_MONO", fontWeight: "normal", fontSize: "1.1rem" }} onClick={handleClose}>Save</button>
                                                    <button className='btn w-80 mt-2 ms-3 me-3 rounded-2 btn-danger mb-3 ' onClick={logout} style={{ fontWeight: "semibold", fontSize: "1.1rem" }}>Disconnect Wallet</button>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                    </div>
                                </Modal>
                            </>
                            }
                        </div>
                        {window.walletConnection.isSignedIn() && <h6 className="mt-1 balance-text mb-0">{balance === "" ? <Loading /> : balance}</h6>
                        }

                    </div>
                </div>
            </div>
            <div className='text-center body-wrapper h-100'>
                <div className="toast-container position-absolute top-0 start-0 p-3 top-index"></div>
                <div className="toast-container position-absolute top-0 start-0 p-3 top-index"></div>
                <div className="toast-container position-absolute top-0 start-0 p-3 top-index"></div>
                <div className="toast-container position-absolute top-0 start-0 p-3 top-index"></div>
                <div className="toast-container position-absolute top-0 start-0 p-3 top-index"></div>

                <div className='play form-signin'>
                    {txsHashes ?
                        <div className='maincenter text-center'>
                            {txsResult === "" ? <Loading /> :
                                <>
                                    {txsResult === "true" ?
                                        <>

                                            <Confetti
                                                width={width - 1}
                                                height={height - 1}
                                            />


                                            <div className="textinfowin font-weight-normal" style={{ fontSize: "2rem" }}>
                                                YOU WON!
                                            </div>
                                            <button className="button button-retro is-primary" onClick={resetGame}>
                                                Play Again
                                            </button>
                                        </>

                                        :
                                        <>
                                            <div className="textinfolose font-weight-normal" style={{ fontSize: "2rem" }}>
                                                Game Over!
                                            </div>
                                            <button className="button button-retro is-error" onClick={resetGame}>
                                                Try Again
                                            </button>
                                        </>

                                    }
                                </>
                            }
                        </div>
                        :

                        <div className='menumain' style={!window.walletConnection.isSignedIn() ? { maxWidth: "860px" } : { maxWidth: "1000px" }}>

                            <h1 className="textsurprese font-weight-normal" style={{ fontSize: "1.5rem" }}>{surprisePhrase}</h1>

                            <div className='d-flex flex-row-reverse justify-content-center mt-sm-1'>
                                <button className="button button-retro button-retro-small is-success ms-2"
                                    style={{ letterSpacing: "2px", width: "8rem" }}
                                    onClick={event => {
                                        setisrefreshing(true);
                                        getRooms().then((res) => {
                                            setisrefreshing(false);
                                            setRooms(res);
                                        }).catch((err) => {
                                            setisrefreshing(false);
                                            console.log("Couldn't refresh rooms: " + err);
                                        });
                                    }}>
                                    {processing || isrefreshing ? <Loading size={"0.8rem"} color={"text-light"} /> : "Refresh"}
                                </button>

                                <Popup trigger={
                                    <button className="button button-retro button-retro-small is-primary ms-2"
                                        style={{ letterSpacing: "2px", width: "8rem" }}>
                                        Create Room
                                    </button>
                                } position="center center"
                                    modal
                                    contentStyle={contentStyle}
                                >
                                    <CreateRoom socketobj={socket} />
                                </Popup>
                                <button className="button button-retro button-retro-small is-error ms-2"
                                    style={{ letterSpacing: "2px", width: "8rem", fontSize: "0.7rem" }}
                                    onClick={event => {
                                        setisrefreshing(true);
                                        getRooms().then((res) => {

                                            setisrefreshing(false);
                                            setRooms(res);
                                        }
                                        ).catch((err) => {
                                            setisrefreshing(false);
                                            console.log("Couldn't refresh rooms: " + err);
                                        });

                                    }}>
                                    Feeling Lucky
                                </button>

                            </div>

                            <div className='maincenter-multi text-center'>

                                {!window.walletConnection.isSignedIn() ?
                                    <>
                                        <img src={LOGOMAIN} className="logo mx-auto" alt="logo" width="240" height="240" />
                                    </> :
                                    <div className='d-flex flex-column '>

                                        {socket?.connected === false || socket?.disconnected === true || socket === undefined || socket === null ?
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
                                            {socket?.connected === false || socket?.disconnected === true || socket === undefined || socket === null ?
                                                <div className='d-flex flex-column justify-items-center text-center'>

                                                    <p style={{ fontSize: "3rem" }}>Not Connected.</p>
                                                    <button className="button button-retro is-warning bordercool d-inline-block text-center"
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
                                                                    <div className='mt-1 col col-sm-10 col-m-10 col-lg-12 col-xl-12 '>
                                                                        <button className="button button-retro is-warning bordercool d-inline-block text-center"
                                                                            style={{ overflow: "hidden", fontSize: "1rem", textOverflow: "ellipsis" }}
                                                                            onClick={() => joinRoom(room.id)}>
                                                                            <span>{roomCreator}</span>
                                                                            <p className="mb-0" style={{ color: "#dd403a" }}>{ammountNEAR} Near</p>

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
            <div className="social-icons-bottom-right">
                <div className="d-flex flex-row flex-sm-column justify-content-start align-items-center h-100"><div className="mt-3 d-flex flex-column shortcut-row">
                    <div className="text-center justify-content-center d-flex">
                        <a href="" target="_blank" rel="" className="cursor-pointer me-2">
                            <img src={ParasLogoW} alt="Paras Logo B" className='rounded mt-1 fa-nearnfts' style={{ height: "28px", width: "28px" }}
                            />
                        </a>
                        <a href="" target="_blank" rel="" className="cursor-pointer me-2">
                            <Twitter color="#1da1f2" size={30} className="rounded mt-1 fa-twitter" />
                        </a>
                        <a href="https://discord.gg/b7NJPuV5pk" target="_blank" rel="" className="cursor-pointer me-2">
                            <Discord color="#5865f2" size={31} className="rounded mt-1 fa-discord" />
                        </a>
                    </div>
                </div>
                </div>
            </div>
            <div className="social-icons-left">
                <div className="d-flex flex-row flex-sm-column justify-content-start align-items-center h-100">
                    <div className="mt-3 d-flex flex-column">
                        <div className="d-flex flex-row mb-2 toolbar">
                            {/*}
              <button className="ms-2 btn btn-outline-dark" style={{fontSize:"0.7rem"}} >
                {darkMode==="light" ? "DARK" : "LIGHT"} {darkMode==="light" ? <Moon className="fa-xs fas mb-1"/>: <Sun className="fa-xs fas mb-1"/> }
      </button>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

}
