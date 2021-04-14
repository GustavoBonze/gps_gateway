const Package = require("../models/Package");
const { v4: uuidv4 } = require("uuid");
const handleDate = require("../helpers/date");
const writeLog = require("../helpers/writeLog");

exports.saveRaw = async (data, trackerModel, cmd) => {
    const id = uuidv4();
    const date = handleDate.toDate();
    Package.create({ id, date, data, trackerModel, cmd });
};

exports.writeLog = (device_id, data) => {
    writeLog.writeLog(device_id, data);
};
