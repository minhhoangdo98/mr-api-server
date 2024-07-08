const global_def = require('../common/global_definition');
const data_services = require('../data_server/data_services');

async function getTestData() {
    const response = await data_services.findData("test_infos");
    if (response) {
        return new global_def.SendResponse(global_def.return_code.OK, response, "");
    }
    else {
        return new global_def.SendResponse(global_def.return_code.ERROR, "", "");
    }
}

async function saveTestData(data) {
    // const response = await data_services.upsertData("test_infos", {}, data);
    const response = await data_services.insertListData("test_infos", [data]);
    if (response) {
        return new global_def.SendResponse(global_def.return_code.OK, response, "");
    }
    else {
        return new global_def.SendResponse(global_def.return_code.ERROR, "", "");
    }
}

module.exports = {
    getTestData,
    saveTestData
}