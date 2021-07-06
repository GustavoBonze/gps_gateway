const fs = require("fs");
const handleDate = require("./date");

// exports.writeLog = (device_id, data) => {
//     // ainda falta colocar pra gravar no bucket AWS
//     fs.writeFile(
//         `./log/${handleDate.date()} ${device_id}.log`,
//         `${handleDate.dateTime()}: ${data}\n`,
//         { enconding: "utf-8", flag: "a" },
//         (err) => {
//             if (err) console.error(err);
//         }
//     );
// };
exports.writeLog = (device_id, data) => {
    console.log(`${device_id} - ${handleDate.dateTime()}: ${data}\n`);
};
