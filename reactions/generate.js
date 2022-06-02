const fs = require('node:fs');
const path = require('node:path');

const generate = function(interaction) {
    const smileyList = getSmileyList();
    const personList = getPersonList();

    const smileyIndex = getRandomInt(smileyList.length);
    const finalSmiley = smileyList[smileyIndex];

    const nbOfPersons = getRandomInt(2) + 2;
    let personResultList = [];

    for(let i = 0; i < nbOfPersons; i++) {
        personResultList.push(getOnePersonFromList(personList, personResultList));
    }

    const finalStr = finalSmiley + " " + personResultList.join(" - ");

    interaction.reply(finalStr);
}

const getSmileyList = function(){
    let smileyList = [];

    const smileysPath = path.join(__dirname, '../datasource/smileys');
    const smileysFiles = fs.readdirSync(smileysPath).filter(file => file.endsWith('.json'));

    for (const file of smileysFiles) {
        const filePath = path.join(smileysPath, file);
        const smileyObject = require(filePath);

        for(const key in smileyObject){
            smileyList.push(smileyObject[key]);
        }
    }

    return smileyList;
}

const getPersonList = function(){
    let personList = [];

    const personsPath = path.join(__dirname, '../datasource/persons');
    const personsFiles = fs.readdirSync(personsPath).filter(file => file.endsWith('.json'));

    for (const file of personsFiles) {
        const filePath = path.join(personsPath, file);
        const personObject = require(filePath);

        for(const key in personObject.data) {
            personList.push(key);
        }
    }

    return personList;
}

const getOnePersonFromList = function(list, resultList) {
    const onePersonIndex = getRandomInt(list.length-1);
    console.log(onePersonIndex);
    const onePerson = list[onePersonIndex];

    return resultList.includes(onePerson) ? getOnePersonFromList(list, resultList) : onePerson;
}

const getRandomInt = function(max) {
  return Math.floor(Math.random() * max);
}


module.exports = {
    generate
}