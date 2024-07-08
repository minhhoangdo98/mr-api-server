const global_def = require('../common/global_definition');
const business_logic = require('./business_logic');
const helper = require('../common/helper');

async function getTestData() {
    const response = await business_logic.getTestData();
    if (response.returnCode == global_def.return_code.OK) {
        return new global_def.SendResponse(global_def.return_code.OK, response.data, "");
    }
    else {
        return new global_def.SendResponse(global_def.return_code.ERROR, "", "");
    }
}

async function saveTestData(request) {
    const response = await business_logic.saveTestData(request.body);
    if (response.returnCode == global_def.return_code.OK) {
        return new global_def.SendResponse(global_def.return_code.OK, response.data, "");
    }
    else {
        return new global_def.SendResponse(global_def.return_code.ERROR, "", "");
    }
}

async function testSaveTestData() {
    const response = await business_logic.saveTestData({
        "test_name": "test" + helper.getRandomInteger(0, 100),
        "test_type": "type" + helper.getRandomNumber(0, 100),
        "info": "none"
    });
    if (response.returnCode == global_def.return_code.OK) {
        return new global_def.SendResponse(global_def.return_code.OK, response.data, "");
    }
    else {
        return new global_def.SendResponse(global_def.return_code.ERROR, "", "");
    }
}

module.exports = {
    getTestData,
    saveTestData,
    testSaveTestData
}