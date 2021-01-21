const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const getPage = async (req, res, next) => {
    try {
        const codes = await readFile('files/codes.json');
        const codesArray = JSON.parse(codes, 'utf8');

        let codeToShow = '';
        let indexOfCode = 0;
        let countOfCurrentCode = 0;

        for(let i = 0; i < codesArray.length; i++){
            if(codesArray[i].count > 0){
                console.log(codesArray[i].count);
                codeToShow = codesArray[i].code;
                indexOfCode = i;
                countOfCurrentCode = codesArray[i].count--;
                break;
            }
        }

        await writeFile('files/codes.json', JSON.stringify(codesArray));

        const html = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Home ${countOfCurrentCode}</title>
            </head>
                <body>
                ${codeToShow}
                </body>
            </html>`;
    
    
        res.render('index', { code : html});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getPage
}