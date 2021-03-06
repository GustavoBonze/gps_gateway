const Package = require("./controllers/PackageController");
const Device = require("./controllers/DeviceController");

// RESPONDENDO OS COMANDOS DO E3
commandHandlingE3 = (cmd, trackerModel, data, connection, convertedData) => {
    switch (cmd) {
        case "RG":
        case "TX":
        case "MQ":
        case "JZ":
            Device.sendToDevice(data, connection);
            break;
        default:
            Package.saveRaw(convertedData, trackerModel, cmd);
    }
};

// PEGANDO MODELO DO EQUIPAMENTO
recognizeModel = (data) => {
    const TrackerModel = {
        "*E": "E3",
        xx: "GT06",
        SA: "SUNTECH",
        default: "MODEL NOT FOUND",
    };
    return TrackerModel[data] || TrackerModel.default;
};

// RECEBE CONEXÃO DO RASTREADOR, DESCOBRE O MODELO DO RASTREADOR E VOLTA A INFORMAÇÃO 'TRACKERMODEL'
exports.device = async (data, connection) => {
    let convertedData = data.toString();
    const trackerModel = await recognizeModel(convertedData.substr(0, 2));
    let parts = {};
    if (trackerModel == "E3") {
        const str = convertedData.split(",");
        parts = {
            start: str[0],
            device_id: str[1],
            cmd: str[2].substr(0, 2),
        };
        commandHandlingE3(parts.cmd, trackerModel, data, connection, convertedData);
    }
    Package.writeLog(parts.device_id, convertedData);
    return parts.device_id;
};
