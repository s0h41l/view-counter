const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const getPage = async (req, res, next) => {
    try {    
        res.render('index');
    } catch (error) {
        next(error);
    }
}

const getCode = async (req, res, next) => {
    try {
        const { seenCodes } = req.body;
        
        const codes = await readFile('files/codes.json');
        const codesArray = JSON.parse(codes, 'utf8');

        let codeToShow = '';
        let indexOfCode = 0;
        let countOfCurrentCode = 0;
        let codeId = 0;

        if(seenCodes.length == 0){
            for(let i = 0; i < codesArray.length; i++){
                if(codesArray[i].count > 0){
                    codeToShow = codesArray[i].code;
                    codeId = codesArray[i].id;
                    indexOfCode = i;
                    countOfCurrentCode = codesArray[i].count--;
                    break;
                }
            }
    
            await writeFile('files/codes.json', JSON.stringify(codesArray));
            return res.json({
                id: codeId,
                code: codeToShow,
                count: countOfCurrentCode
            }); 
        }

        for(let i = 0; i < codesArray.length; i++){
            if(codesArray[i].count > 0 && !seenCodes.includes(codesArray[i].id)){
                codeToShow = codesArray[i].code;
                codeId = codesArray[i].id;
                indexOfCode = i;
                countOfCurrentCode = codesArray[i].count--;
                break;
            }
        }

        await writeFile('files/codes.json', JSON.stringify(codesArray));

        return res.json({
            id: codeId,
            code: codeToShow,
            count: countOfCurrentCode
        }); 
        
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getPage,
    getCode
}