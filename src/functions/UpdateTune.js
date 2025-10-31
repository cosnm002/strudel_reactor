// This file allows you to configure ESLint according to your project's needs, so that you
// can control the strictness of the linter, the plugins to use, and more.

// For more information about configuring ESLint, visit https://eslint.org/docs/user-guide/configuring/


export function updateTuneById(id, newLine, songText) {

    //get the line with the corrosponding id
    const regex = new RegExp(`.*// *@${id}`, 'g');

    //make a new string with the change
    const newText = songText.replace(regex, `${newLine} // @${id}`);
    return newText;
}


