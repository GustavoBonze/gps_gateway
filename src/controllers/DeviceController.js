const command = require("./CommandController");
const devices = [];

exports.sendToDevice = (data, connection) => connection.write(new Buffer.from(data, "hex"));

// REMOVE RASTREADOR DA LISTA DE ONLINE
exports.removeDevice = (connection) => devices.splice(devices.indexOf(connection), 1);

// PROCURA O RASTREADOR ONLINE, SE TIVER ONLINE O COMANDO É ENVIADO
exports.commandsDbToDevice = async () => {
    const commands = await command.findAllCmdDb();
    commands.forEach((cmd) => {
        const deviceConnection = findDevice(cmd.deviceId);
        deviceConnection
            ? this.sendToDevice(cmd.data, deviceConnection) + console.log(cmd.data, "enviado para: ", cmd.deviceId)
            : console.log("device", cmd.deviceId, "is offline");
    });
};

//ACRESCENTA O RASTREADOR NA LISTA DE RASTREADORES ONLINE
exports.addDeviceToList = (deviceId, connection) => {
    const Devices = { deviceId, connection };
    devices.push(Devices);
    console.log(deviceId, "inserido no array");
};

// PROCURA RASTREADOR ONLINE
findDevice = (deviceId) => {
    const dev = devices.find((device) => device.deviceId == deviceId);
    return dev ? dev.connection : false;
};

// setInterval(() => console.log(devices.length), 10000);
