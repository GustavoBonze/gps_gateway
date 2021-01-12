const net = require("net");
const { device } = require("./device");
const port = require("./config/index");
const Device = require("./controllers/DeviceController");
const AWS = require("aws-sdk");

//Vai entrar no .env
// CONEXÃO COM DYNAMO
let awsConfig = {
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com",
    accessKeyId: "AKIAQ6OTRVTETRSRQ5ES",
    secretAccessKey: "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",
};
AWS.config.update(awsConfig);

// ABRE CONEXÃO TCP/IP
const server = net
    .createServer((connection) => {
        let deviceId = "";
        // RECEBE DADOS TCP/IP
        connection.on("data", async (data) => {
            deviceId = await device(data, connection);
        });

        setTimeout(() => Device.addDeviceToList(deviceId, connection), 1);

        connection.on("end", () => {
            Device.removeDevice(connection);
            console.log("device disconnected");
        });
        // SE O RASTREADOR FICAR 6min SEM COMUNICAR, DERRUBO A CONEXÃO E TIRO DA LISTA DE RASTREADORES ONLINE
        connection.setTimeout(360000);
        connection.on("timeout", () => {
            connection.destroy();
            Device.removeDevice(connection);
            console.log("device timeout");
        });
    })
    .listen(port);

// EXIBE OS ERROS DE CONEXÃO E MATA A APLICAÇÃO
server.on("error", (err) => {
    console.log("Entrou nesse erro");
    throw err;
});
setInterval(() => Device.commandsDbToDevice(), 15000);
