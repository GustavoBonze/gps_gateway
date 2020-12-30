const command = require("./CommandController");
const devices = [];

var sendToDevice = exports.sendToDevice = (data, connection) => connection.write(new Buffer.from(data, "hex"));

// REMOVE RASTREADOR DA LISTA DE ONLINE
exports.removeDevice = (connection) => devices.splice(devices.indexOf(connection), 1);

// PROCURA O RASTREADOR ONLINE, SE TIVER ONLINE O COMANDO É ENVIADO
exports.commandsDbToDevice = async () => {
    const commands = await command.findAllCmdDb();

    commands.forEach((cmd) => {
        const deviceConnection = findDevice(cmd.uid);
        deviceConnection ? sendToDevice(cmd.data, deviceConnection) : console.log("device", cmd.uid, "is offline");
    });
};

//ACRESCENTA O RASTREADOR NA LISTA DE RASTREADORES ONLINE
exports.addDeviceToList = (uid, connection) => {
    const Devices = { uid, connection };
    devices.push(Devices);
};

// PROCURA RASTREADOR ONLINE
findDevice = (deviceId) => {
    const dev = devices.find((device) => device.uid == deviceId);
    return dev ? dev.connection : false;
};