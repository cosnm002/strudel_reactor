function DJControls({ onType, onSlide, onClicks }) {
    return (
        <>

            <div className="row p-3"></div>
            <div className="row bg-black text-white p-3 rounded">
                <h4>DJ Controls</h4>
            </div>


            <div className="row p-3 justify-content-between">

                <div className="col-auto bg-secondary rounded text-white p-2 ">
                    <label className="form-label" htmlFor="cpmSet">setCPM (speed of all instruments)</label>
                    <input type="text" className="form-control" id="cpmSet" onChange={(e) => onType(e)} ></input>

                </div>
                <div className="col-5 bg-secondary text-white rounded">
                    <label htmlFor="vRange" className="form-label">Volume</label>
                    <input type="range" className="form-range" min="0" max="1" step="0.1" id="vRange" onChange={(e) => onSlide(e)}></input>

                </div>
            </div>

            <div className="row p-3 ms-1 justify-content-between bg-secondary text-white rounded">




                <div className="form-check form-switch col-auto d-flex flex-column align-items-center">
                    <div className="ps-5">
                        <label className="form-check-label" htmlFor="drums">Drums</label>
                        <input className="form-check-input" type="checkbox" value="" id="drums" style={{ borderColor: 'black' }} defaultChecked onChange={(e) => onClicks("Drums", e.target.checked)} ></input>
                    </div>

                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbBpJIraHaqlq7rC6YfyZSQeKObk4AFI1MNg&s" width="70" className="mt-2"></img>
                </div>

                <div className="form-check form-switch col-auto d-flex flex-column">
                    <div className="ps-4">
                        <label className="form-check-label" htmlFor="drums2">Drums 2</label>
                        <input className="form-check-input" type="checkbox" value="" id="drums2" style={{ borderColor: 'black' }} defaultChecked onChange={(e) => onClicks("Drums2", e.target.checked)}></input>
                    </div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbBpJIraHaqlq7rC6YfyZSQeKObk4AFI1MNg&s" width="70" className="mt-2"></img>
                </div>

                <div className="form-check form-switch col-auto d-flex flex-column">
                    <label className="form-check-label" htmlFor="guitar">Guitar</label>
                    <input className="form-check-input" type="checkbox" value="" id="guitar" style={{ borderColor: 'black' }} defaultChecked onChange={(e) => onClicks("Guitar", e.target.checked)}></input>
                </div>
                <img src="https://t4.ftcdn.net/jpg/15/27/10/19/360_F_1527101957_Lu6OB6MSOHKjJFRbHqy2li0SjomLNHSr.jpg" style={{ width: "90px", height: "70px" }}></img>
            </div>



        </>
    );
}


export default DJControls;