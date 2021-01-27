const dynamoose = require("dynamoose");

const SendCommandSchema = new dynamoose.Schema({
    id: String,
    data: String,
    trackerModel: String,
    date: Date,
    deviceId: {
        type: String,
        index: {
            global: true,
            name: "deviceIdIndex",
        },
    },
});

module.exports = dynamoose.model("SendCommand", SendCommandSchema);
