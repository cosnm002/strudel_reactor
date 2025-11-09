// This file allows you to configure ESLint according to your project's needs, so that you
// can control the strictness of the linter, the plugins to use, and more.

// For more information about configuring ESLint, visit https://eslint.org/docs/user-guide/configuring/


export function updateTuneById(id, newLine, songText) {

    const regex = new RegExp(`.*// *@${id}`, 'g');

    const newText = songText.replace(regex, `${newLine} // @${id}`);
    return newText;
}

export function muteInstrument(instrument, songText, mute) {
    
    if (!mute) {
        const regex = new RegExp(`(?<=^//@${instrument}\\r?\\n)(\\s*)(\\w+)(?=:)`, 'gm');
        const newSong = songText.replace(regex, `$1_$2`);
        return newSong;

    } else {
        const regex = new RegExp(`(?<=^//@${instrument}\\r?\\n)(\\s*)_?(\\w+)(?=:)`, 'gm');
        const newSong = songText.replace(regex, `$1$2`);
        return newSong;

    }
    

}


