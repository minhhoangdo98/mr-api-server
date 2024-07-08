const mongoose = require("mongoose");

//create a test collection
const testInfo = new mongoose.Schema({
    test_name: String,
    test_type: String,
    info: String
});
const TestInfo = mongoose.model("test_infos", testInfo);

module.exports = {
    TestInfo
}