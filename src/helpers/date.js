const moment = require("moment");

exports.date = () => moment().format("YYYY-MM-D");
exports.dateTime = () => moment().format("YYYY-MM-D HH:mm:ss");
exports.toDate = () => moment().toDate();
