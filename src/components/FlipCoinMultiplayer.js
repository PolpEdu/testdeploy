import React from 'react'

function FlipCoinMultiplayer(props) {
    const [processing, setprocessing] = React.useState(true)

    React.useEffect(() => {

        setTimeout(function () {
            setprocessing(false)
        }, 5000)
    }, [])

    res = () => {
        props.reset()
    }

    return (
        <>
            <div id="cointainer" className=''>
                <video autoPlay muted playsInline className="video-container d-flex justify-content-center flex-row borderpixelSMALL" style={{ marginTop: "3rem" }}>
                    <source src={props.result === "heads" ? logoH : logoH} type="video/mp4" />
                </video>
            </div>
            <div className={processing === false ? 'fadein' : 'fadein fadeout'}>
                {props.won === "true" ? <>
                    <Confetti
                        width={props.width - 1}
                        height={props.height - 1}
                    />
                    <div className="textinfowin font-weight-normal mb-2" style={{ fontSize: "2rem" }}>
                        YOU WON!
                    </div>
                    <button className="button button-retro is-primary" onClick={res}>
                        Play Again
                    </button>
                </>
                    :
                    <>
                        <div className="textinfolose font-weight-normal" style={{ fontSize: "2rem" }}>
                            Game Over!
                        </div>
                        <button className="button button-retro is-error mb-2" onClick={this.res}>
                            Try Again
                        </button>
                    </>
                }
            </div>
        </>
    )
}

export default FlipCoinMultiplayer