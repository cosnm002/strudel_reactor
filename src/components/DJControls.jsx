function DJControls({ onType, onSlide, onClicks, onPlay }) {
    return (
        <>

            <div className="container-fluid mt-3" style={{ backgroundColor: "rgb(62, 65, 70)" }}>
                <div className="row bg-black text-white p-3">
                    <div className="col-4">
                        <h4>DJ Controls</h4>
                    </div>
                    <div className="col-8 d-flex justify-content-end">
                        <button className="btn btn-success" onClick={onPlay}>Submit</button>
                    </div>
                </div>

                <div className="row p-3 justify-content-between" >

                    <div className="col-3 bg-secondary rounded text-white p-2 ">
                        <label className="form-label" htmlFor="cpmSet">setCPM (speed of all instruments)</label>
                        <input type="text" className="form-control" id="cpmSet" onChange={(e) => onType("setCpm", "setCpm",e)} ></input>

                    </div>
                    <div className="col-5 bg-secondary text-white rounded">
                        <label htmlFor="vRange" className="form-label">Volume</label>
                        <input type="range" className="form-range" min="0" max="1" step="0.1" id="vRange" onChange={(e) => onSlide(e)}></input>

                    </div>
                </div>

                <div className="row p-1 justify-content-between bg-secondary text-white rounded m-1">

                    <div className="form-check form-switch col-auto d-flex flex-column align-items-center">
                        <div className="ps-5">
                            <label className="form-check-label" htmlFor="drums">Drums</label>
                            <input className="form-check-input" type="checkbox" value="" id="drums" defaultChecked onChange={(e) => onClicks("Drums", e.target.checked)} ></input>
                        </div>

                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbBpJIraHaqlq7rC6YfyZSQeKObk4AFI1MNg&s" width="70" className="mt-2"></img>
                    </div>

                    <div className="form-check form-switch col-auto d-flex flex-column">
                        <div className="ps-4">
                            <label className="form-check-label" htmlFor="drums2">Drums 2</label>
                            <input className="form-check-input" type="checkbox" value="" id="drums2" defaultChecked onChange={(e) => onClicks("Drums2", e.target.checked)}></input>
                        </div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbBpJIraHaqlq7rC6YfyZSQeKObk4AFI1MNg&s" width="70" className="mt-2"></img>
                    </div>

                    <div className="form-check form-switch col-auto d-flex flex-column pe-5 me-5">
                        <div className="ps-5">
                            <label className="form-check-label" htmlFor="guitar">Guitar</label>
                            <input className="form-check-input" type="checkbox" value="" id="guitar" defaultChecked onChange={(e) => onClicks("Guitar", e.target.checked)}></input>
                        </div>
                        <img src="https://t4.ftcdn.net/jpg/15/27/10/19/360_F_1527101957_Lu6OB6MSOHKjJFRbHqy2li0SjomLNHSr.jpg" style={{ width: "80px", height: "70px" }} className="mt-2 ms-2 ps-1"></img>

                    </div>
                </div>
                <div className="row m-1">
                    <div className="col-3 bg-secondary rounded mt-1 text-white">
                        <label htmlFor="vRang3e" className="form-label">lpf</label>
                        <input type="number" className="form-control" min="0" max="20000" step="100" id="vRang3e" onChange={(e) => onType("D1.lpf", ".lpf",e)}></input>

                    </div>
                </div>
            </div>



        </>
    );
}


export default DJControls;

