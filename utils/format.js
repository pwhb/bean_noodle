const { table, getBorderCharacters } = require('table');


module.exports = {
    getUserString: (user) => {
        const { username, discriminator } = user
        const userString = `${username}#${discriminator}`
        return userString
    },
    getVSString: (player1, player2, player1Move, player2Move) => {
        const data = [
            [player1, "", player2],
            [player1Move, "   vs   ", player2Move]
        ];
        const output = table(data, {
            border: getBorderCharacters('void'),
            columnDefault: {
                paddingLeft: 0,
                paddingRight: 1
            },
            drawHorizontalLine: () => false
        }
        );
        return output
    }
}