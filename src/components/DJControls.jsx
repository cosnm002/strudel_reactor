import './DJControls.css'
import Dropdown from './Dropdown';
import { useEffect, useState, useRef } from 'react';
import jsonSettings from '../JSONSettings/settings.json';
import { parse } from '@strudel/mini';

function DJControls({ onType, onSlide, onClicks, onPlay, onDropChange }) {

    const [inputs, setInputs] = useState(jsonSettings);
    const [jsonString, setJsonString] = useState("");

    useEffect(() => {

    }, [inputs]);
    //get all inputs to store settings
    let d1Vol = document.getElementById("d1Vol");
    let d1lpf = document.getElementById("D1.lpf");
    let d2Vol = document.getElementById("d2Vol");
    let d2lpf = document.getElementById("D2.lpf");
    let g1Vol = document.getElementById("g1Vol");
    let g1lpf = document.getElementById("G1.lpf");
    let g1leg = document.getElementById("G1.leg");
    let g1chop = document.getElementById("G1.chop");

    let saveInputs = () => {
        let settings = {
            d1Vol: Number(d1Vol.value),
            d1lpf: Number(d1lpf.value),
            d2Vol: Number(d2Vol.value),
            d2lpf: Number(d2lpf.value),
            g1Vol: Number(g1Vol.value),
            g1lpf: Number(g1lpf.value),
            g1leg: Number(g1leg.value),
            g1chop: Number(g1chop.value)

        }
        setJsonString(JSON.stringify(settings, null, 2));


    }
    const loadInputs = () => {

        const parsed = JSON.parse(jsonString);
        setInputs(parsed);


        //trigger D1 changes
        d1Vol.value = parsed.d1Vol;
        onType("setD1Vol", "const d1Gain = ", { target: d1Vol });

        d1lpf.value = parsed.d1lpf;
        onType("D1.lpf", ".lpf", { target: d1lpf });

        //trigger D2 changes
        d2Vol.value = parsed.d2Vol;
        onType("setD2Vol", "const d2Gain = ", { target: d2Vol });

        d2lpf.value = parsed.d2lpf;
        onType("D2.lpf", ".lpf", { target: d2lpf });

        //trigger Guitar Changes
        g1Vol.value = parsed.g1Vol;
        onType("setG1Vol", "const g1Gain = ", { target: g1Vol });

        g1lpf.value = parsed.g1lpf;
        onType("G1.lpf", ".lpf", { target: g1lpf });

        g1leg.value = parsed.g1leg;
        onType("G1.leg", ".legato", { target: g1leg });

        g1chop.value = parsed.g1chop;
        onType("G1.chop", ".chop", { target: g1chop });


    }

    return (
        <>

            <div className="container-fluid mt-3 colour-container">
                <div className="row bg-black text-white p-3">
                    <div className="col-4">
                        <h4>DJ Controls</h4>
                    </div>
                    <div className="col-8 d-flex justify-content-end">
                        <div className="p-1">
                            <button className="btn btn-success" onClick={saveInputs}>Save</button>
                        </div>
                        <div className="p-1">
                            <button className="btn btn-secondary" onClick={loadInputs}>Load</button>
                        </div>
                    </div>
                </div>

                <div className="row p-3 justify-content-between" >

                    <div className="col-3 bg-secondary rounded text-white p-2 ">
                        <label className="form-label" htmlFor="cpmSet">setCPM (speed of all instruments)</label>
                        <input type="text" className="form-control" id="cpmSet" onChange={(e) => onType("setCpm", "setCpm", e)} ></input>

                    </div>
                    <div className="col-3 bg-secondary rounded text-white">
                        <label className="form-label" htmlFor="setKey">Set Key</label>
                        <Dropdown id="dropDown" onChange={(e) => onDropChange(e)}></Dropdown>
                    </div>


                    <div className="col-3 bg-secondary text-white rounded">
                        <label htmlFor="vRange" className="form-label">Master Volume</label>
                        <input type="range" className="form-range" min="0" max="1" step="0.1" defaultValue={inputs.masterVol} id="vRange" onChange={(e) => onSlide(e)}></input>

                    </div>
                </div>


                {/* Instruments */}
                <div className="row m-1 justify-content-between pb-3">

                    {/*Drums 1 */}
                    <div className="col-3 bg-secondary rounded mt-1 text-white pb-3 pt-2">

                        {/*Switch Button*/}
                        <div className="form-switch d-flex flex-column align-items-center">
                            <input className="form-check-input big-switch" type="checkbox" value="" id="drums" defaultChecked onChange={(e) => onClicks("Drums", e.target.checked)}></input>
                            <label className="form-check-label switch-label" htmlFor="drums">Drums</label>
                        </div>

                        {/*Volume Slider*/}
                        <label htmlFor="d1Vol" className="form-label">Volume</label>
                        <input type="range" className="form-range" ref={d1Vol} min="0" max="1" step="0.1" id="d1Vol" onChange={(e) => onType("setD1Vol", "const d1Gain = ", e)}></input>

                        {/*LPF Input*/}
                        <label htmlFor="D1.lpf" className="form-label">Low-Pass Filter</label>
                        <input type="range" className="form-range" min="0" max="20000" step="100" id="D1.lpf" defaultValue="1000" onChange={(e) => onType("D1.lpf", ".lpf", e)}></input>

                        {/*Set Speed*/}
                        <label htmlFor="D1.cpm" className="form-label">Set Speed: </label>
                        <input type="number" className="form-0-quantity" min="0" max="120" step="20" defaultValue="30" onChange={(e) => onType("D1.cpm", ".cpm", e)}></input>
                    </div>

                    {/*Drums 2 */}
                    <div className="col-3 bg-secondary rounded mt-1 text-white pb-3 pt-2">

                        {/*Switch Button*/}
                        <div className="form-switch d-flex flex-column align-items-center">
                            <input className="form-check-input big-switch" type="checkbox" value="" id="drums2" defaultChecked onChange={(e) => onClicks("Drums2", e.target.checked)}></input>
                            <label className="form-check-label switch-label" htmlFor="drums2">Drums 2</label>
                        </div>

                        {/*Volume Slider*/}
                        <label htmlFor="d2Vol" className="form-label">Volume</label>
                        <input type="range" className="form-range" min="0" max="1" step="0.1" id="d2Vol" onChange={(e) => onType("setD2Vol", "const d2Gain = ", e)}></input>

                        {/*LPF Input*/}
                        <label htmlFor="D2.lpf" className="form-label">Low-Pass Filter</label>
                        <input type="range" className="form-range" min="0" max="20000" step="100" id="D2.lpf" defaultValue="20000" onChange={(e) => onType("D2.lpf", ".lpf", e)}></input>

                        {/*Set Speed*/}
                        <label htmlFor="D2.cpm" className="form-label">Set Speed: </label>
                        <input type="number" className="form-0-quantity" min="0" max="120" step="20" defaultValue="30" onChange={(e) => onType("D2.cpm", ".cpm", e)}></input>

                    </div>

                    {/*Guitar 1 */}
                    <div className="col-3 bg-secondary rounded mt-1 text-white pb-3 pt-2">

                        {/*Switch Button*/}
                        <div className="form-switch d-flex flex-column align-items-center">
                            <input className="form-check-input big-switch" type="checkbox" value="" id="guitar" defaultChecked onChange={(e) => onClicks("Guitar", e.target.checked)}></input>
                            <label className="form-check-label switch-label" htmlFor="guitar">Guitar</label>
                        </div>

                        {/*Volume Slider*/}
                        <label htmlFor="g1Vol" className="form-label">Volume</label>
                        <input type="range" className="form-range" min="0" max="1" step="0.1" id="g1Vol" onChange={(e) => onType("setG1Vol", "const g1Gain = ", e)}></input>

                        {/*LPF Input*/}
                        <label htmlFor="G1.lpf" className="form-label">Low-Pass Filter</label>
                        <input type="range" className="form-range" min="0" max="20000" step="100" id="G1.lpf" defaultValue="20000" onChange={(e) => onType("G1.lpf", ".lpf", e)}></input>


                        {/* Legato Slider */}
                        <label htmlFor="G1.leg" className="form-label">Legato (length of each note)</label>
                        <input type="range" className="form-range" min="0" max="2" step="0.1" id="G1.leg" defaultValue="0.2" onChange={(e) => onType("G1.leg", ".legato", e)}></input>

                        {/* Chop Slider */}
                        <label htmlFor="G1.chop" className="form-label">Chop (number per note)</label>
                        <input type="range" className="form-range" min="0" max="20" step="1" id="G1.chop" defaultValue="8" onChange={(e) => onType("G1.chop", ".chop", e)}></input>


                    </div>

                </div>
            </div>




        </>
    );
}


export default DJControls;

