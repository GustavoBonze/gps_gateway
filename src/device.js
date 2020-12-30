const Package = require("./controllers/packageController");
const Device = require("./controllers/DeviceController");

// RESPONDENDO OS COMANDOS DO E3
commandHandlingE3 = (cmd, trackerModel, data, connection, convertedData) => {
    const Commands = {
        RG: Device.sendToDevice(data, connection),
        TX: Device.sendToDevice(data, connection),
        "MQ#": Device.sendToDevice(data, connection),
        default: Package.saveRaw(convertedData, trackerModel, cmd),
    };
    return Commands[cmd] || Commands.default;
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
            cmd: str[2],
        }
        commandHandlingE3(parts.cmd, trackerModel, data, connection, convertedData);
    }

    //ACRESCENTA O RASTREADOR NA LISTA DE RASTREADORES ONLINE
    Device.addDeviceToList(parts.device_id, connection);
};

//E3 ASCII
//*ET,135790246811221,HB,A,050915,0C2A27,00CE5954,04132263,0000,F000,01000000,20,4,0000,00F123,1 00, 4845423835

//GT06 HEXADECIMAL
// 78 78 0D 01 01 23 45 67 89 01 23 45 00 01 8C DD 0D 0A   << HEX
// xx\r\01\01#Eg\89\01#E\00\01\8c\dd\r\n                   << ASCII

// SUNTECH ASCII
// SA200STT;102122;393;20201208;02:37:56;10848;-22.914514;-043.270738;000.000;000.00;0;0;33293593;12.96;000000;1;4502;302423;4.2;0