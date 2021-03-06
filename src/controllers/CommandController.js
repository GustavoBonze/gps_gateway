const Command = require("../models/Command");
const handleDate = require("../helpers/date");
const { v4: uuidv4 } = require("uuid");

exports.sendCmdDb = async (data, trackerModel, deviceId) => {
    try {
        const date = handleDate.toDate();
        const id = uuidv4();
        Command.create({ id, date, data, trackerModel, deviceId });
    } catch (e) {
        console.log(e);
    }
};

exports.findAllCmdDb = async () => {
    const results = await Command.scan().exec();
    return results;
};
