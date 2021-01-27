const dynamoose = require("dynamoose");

const PackageSchema = new dynamoose.Schema({
    id: String,
    data: { type: String },
    trackerModel: String,
    date: Date,
    cmd: {
        type: String,
        index: {
            global: true,
            name: "cmdIndex",
        },
    },
});

module.exports = dynamoose.model("Package", PackageSchema);
