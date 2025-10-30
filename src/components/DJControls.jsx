function DJControls() {
    return (
        <>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    p1: ON
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    p1: HUSH
                </label>
            </div>


            <div className="row pt-2">
                <span className="input-group-text" id="CpmLabel">setCMP (speed of all instruments)</span>
                <input type="text" className="form-control" placeholder="120" ></input>
            </div>

            <div className="row pt-2">
                <label for="vRange" className="form-label">Volume</label>
                <input type="range" className="form-range" min="0" max="1" step="0.1" id="vRange"></input>
            </div>


            <div className="form-check">
                <label className="form-check-label" for="drums">Drums</label>
                <input className="form-check-input" type="checkbox" value="" id="drums" style={{ borderColor: 'black' }}></input>
            </div>

            <div className="form-check">
                <label className="form-check-label" for="drums2">Drums 2</label>
                <input className="form-check-input" type="checkbox" value="" id="drums2" style={{ borderColor: 'black' }}></input>
            </div>

            <div className="form-check">
                <label className="form-check-label" for="guitar">Guitar</label>
                <input className="form-check-input" type="checkbox" value="" id="guitar" style={{ borderColor: 'black' } }></input>
            </div>



        </>
    );
}

export default DJControls;