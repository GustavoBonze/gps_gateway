require("dotenv").config();
const net = require("net");
const { device } = require("./device");
const port = require("./config/index");
const Device = require("./controllers/DeviceController");
const AWS = require("aws-sdk");

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

        setTimeout(() => Device.addDeviceToList(deviceId, connection), 100);

        connection.on("end", () => {
            Device.removeDevice(connection);
            console.log("device disconnected");
        });
        connection.setTimeout(360000);
        connection.on("timeout", () => {
            connection.destroy();
            Device.removeDevice(connection);
            console.log("device timeout");
        });
    })
    .listen(port);

server.on("error", (err) => {
    throw err;
});
setInterval(() => Device.commandsDbToDevice(), 15000);
