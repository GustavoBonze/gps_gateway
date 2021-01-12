const dynamoose = require("dynamoose");

const SendCommandSchema = new dynamoose.Schema({
    id: String,
    data: String,
    trackerModel: String,
    date: Date,
    deviceId: String,
});

module.exports = dynamoose.model("SendCommand", SendCommandSchema);

// *ET,354522180006087,CX#
