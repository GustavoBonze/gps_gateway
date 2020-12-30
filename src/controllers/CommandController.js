const Command = require("../models/Command");
const date = require("../helpers/date");
const { v4: uuidv4 } = require("uuid");

exports.sendCmdDb = async (data, trackerModel, uid) =>  {
   try{
    const id = uuidv4();
    
    Command.create({id, date, data, trackerModel, uid });
   }
    catch(e){
        console.log(e)
    }
}

exports.findAllCmdDb = async () => {
    const results = await Command.scan().exec()
    return results
}