const command = require("./CommandController");
const devices = [];
const writeLog = require("../helpers/writeLog");

exports.sendToDevice = (data, connection) => connection.write(new Buffer.from(data, "hex"));

// REMOVE RASTREADOR DA LISTA DE ONLINE
exports.removeDevice = (connection) => devices.splice(devices.indexOf(connection), 1);

// PROCURA O RASTREADOR ONLINE, SE TIVER ONLINE O COMANDO É ENVIADO
exports.commandsDbToDevice = async () => {
    const commands = await command.findAllCmdDb();
    commands.forEach((cmd) => {
        const deviceConnection = findDevice(cmd.deviceId);
        deviceConnection
            ? this.sendToDevice(cmd.data, deviceConnection) +
              console.log(cmd.data, "enviado para: ", cmd.deviceId) +
              writeLog.writeLog(cmd.deviceId, cmd.data)
            : console.log("device", cmd.deviceId, "is offline");
    });
};

//ACRESCENTA O RASTREADOR NA LISTA DE RASTREADORES ONLINE
exports.addDeviceToList = (deviceId, connection) => {
    const Devices = { deviceId, connection };
    objIndex = devices.findIndex((device) => device.deviceId == deviceId);
    devices[objIndex]?.connection ? (devices[objIndex].connection = connection) : devices.push(Devices);
};

// PROCURA RASTREADOR ONLINE PELO IMEI
findDevice = (deviceId) => {
    const dev = devices.find((device) => device.deviceId == deviceId);
    return dev ? dev.connection : false;
};

// PROCURA RASTREADOR ONLINE PELA CONEXÃO
exports.findDeviceByConnection = (connection) => {
    const dev = devices.find((device) => device.connection == connection);
    return dev ? dev.deviceId : false;
};
