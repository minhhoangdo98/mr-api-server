const mongoose = require("mongoose");

//create a test collection
const posInfo = new mongoose.Schema({
    x: Number,
    y: Number,
    z: Number
});
const PositionInfo = mongoose.model("position_infos", posInfo);

module.exports = {
    PositionInfo
}