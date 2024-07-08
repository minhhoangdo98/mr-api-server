const return_code = {
    NULL: "NULL",
    OK: "OK",
    ERROR: "ERROR",
};

let model_dicts = {};

class SendResponse {
    constructor(returnCode, data, message) {
        this.returnCode = returnCode;
        this.data = data;
        this.message = message;
    }
}

module.exports = {
    return_code,
    model_dicts,
    SendResponse
}