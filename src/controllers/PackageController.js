const Package = require("../models/Package");
const date = require("../helpers/date");
const { v4: uuidv4 } = require("uuid");

exports.saveRaw = async (data, trackerModel, cmd) => {
    const id = uuidv4();
    Package.create({ id, date, data, trackerModel, cmd });
};

//crud basic functions(uncomment if necessary)
// exports.index = async (id) => {
//     Package.get(id)
// }

// exports.delete = async(id) => {
//     Package.delete(id)
// }

// exports.update = async(id, date, data, trackerModel, cmd) => {
//     Package.update({"id": id}, {"date": date}, {"data": data}, {"trackerModel": trackerModel}, {"cmd": cmd})
// }