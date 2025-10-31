import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune, simple_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJControls from './components/DJControls';
import PlayButtons from './components/PlayButtons';
import ProcButtons from './components/ProcButtons';
import PreprocessTextArea from './components/PreprocessTextArea';
import { handleCpm, updateTuneById } from './functions/UpdateTune';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};


export default function StrudelDemo() {

    const hasRun = useRef(false);

    //Play button
    const handlePlay = () => {
        globalEditor.evaluate();
    }

    //Stop button
    const handleStop = () => {
        globalEditor.stop();
    }

    //Process and Play button
    const procAndPlay = () => {
        globalEditor.evaluate();

    }


    const [songText, setSongText] = useState(simple_tune);



    //handle the change of cpm text box
    const handleCpm = (e) => {
        const value = e.target.value;
        const newSong = updateTuneById("setCpm", `setCpm(${value})`, songText);
        setSongText(newSong);
    }




    useEffect(() => {

        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });

            document.getElementById('proc').value = simple_tune
            //SetupButtons()
            //Proc()
        }
        globalEditor.setCode(songText);
    }, [songText]);


    return (
        <div>
            <div class="row bg-black text-white p-3">
                <h2>Strudel Demo</h2>
            </div>
            <main>

                <div className="container-fluid">
                    <div className="row pt-5">
                        <div className="col-3">
                            <button className="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#textArea" aria-expanded="false" aria-controls="textArea">Edit Text &#129035;</button>
                        </div>
                        <div className="col-5"></div>
                        <div className="col-md-4">

                            <nav>
                                <ProcButtons onPlay={procAndPlay} />
                                <br />
                                <PlayButtons onPlay={handlePlay} onStop={handleStop} />

                            </nav>
                        </div>
                        <div className="collapse collapse-horizontal" id="textArea">

                            <PreprocessTextArea defauleValue={songText} onChange={(e) => setSongText(e.target.value)} />

                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <div id="editor" />
                            <div id="output" />
                        </div>

                        <div className="col-md-4">
                            <DJControls onType={handleCpm} />
                        </div>
                    </div>
                </div>
                <canvas id="roll"></canvas>

            </main >
        </div >
    );


}