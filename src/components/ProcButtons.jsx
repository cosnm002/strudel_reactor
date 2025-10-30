function ProcButtons({ onPlay }) {
    return (
        <>
            <div className="btn-group">
                <button id="process" className="btn btn-outline-primary">Preprocess</button>
                <button id="process_play" className="btn btn-outline-primary" onClick={onPlay}>Proc & Play</button>
            </div>
        </>
    );
}

export default ProcButtons;