require("dotenv").config();
const net = require("net");
const { device } = require("./device");
const port = require("./config/index");
const Device = require("./controllers/DeviceController");
const AWS = require("aws-sdk");
const writeLog = require("../src/helpers/writeLog");

let awsConfig = {
    region: process.env.REGION,
    endpoint: process.env.ENDPOINT,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
};
AWS.config.update(awsConfig);

const server = net
    .createServer((connection) => {
        let deviceId = "";
        connection.on("data", async (data) => {
            deviceId = await device(data, connection);
        });

        setTimeout(() => Device.addDeviceToList(deviceId, connection), 1000);

        connection.on("end", () => {
            const device = Device.findDeviceByConnection(connection);
            writeLog.writeLog(`device: ${device}`, `disconnected`);
            Device.removeDevice(connection);
        });

        connection.setTimeout(360000);
        connection.on("timeout", () => {
            const device = Device.findDeviceByConnection(connection);
            writeLog.writeLog(`device: ${device}`, `timeout`);
            connection.destroy();
            Device.removeDevice(connection);
        });
    })
    .listen(port);

server.on("error", (err) => {
    console.log(err);
});
console.log(`🚀 Server started! port: ${port.port}`);

setInterval(() => Device.commandsDbToDevice(), 15000);
