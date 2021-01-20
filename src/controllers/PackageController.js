const Package = require("../models/Package");
const date = require("../helpers/date");
const { v4: uuidv4 } = require("uuid");

exports.saveRaw = async (data, trackerModel, cmd) => {
    const id = uuidv4();
    Package.create({ id, date, data, trackerModel, cmd });
};
