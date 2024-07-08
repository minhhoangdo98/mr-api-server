const ApiDef = require("./api_definitions");
const global_def = require("../common/global_definition");
const model = require("../data_server/models");

function initmodels() {
    global_def.model_dicts["test_infos"] = model.TestInfo;
}

/**
 * Register api
 * @param {express_app} app from express()
 */
async function ApiReceptionRegistration(app) {
    Object.entries(ApiDef.api_dict).forEach(([key, api]) => {
        switch (api.method) {
            case ApiDef.method.GET:
                app.get(api.url, async function (req, res) {
                    const executeFunc = await api.func(req);
                    res.send(JSON.stringify(executeFunc));
                });
                break;

            case ApiDef.method.POST:
                app.post(api.url, async function (req, res) {
                    const executeFunc = await api.func(req);
                    res.send(JSON.stringify(executeFunc));
                });
                break;

            case ApiDef.method.PUT:
                app.put(api.url, async function (req, res) {
                    const executeFunc = await api.func(req);
                    res.send(JSON.stringify(executeFunc));
                });
                break;

            default:
                console.log("Method not define");
                break;
        }
    });
}

/**
 * Fetch data from database
 * @param {String} requestUrl http url
 * @returns json
 */
async function fetchData(requestUrl, params) {
    let url = requestUrl.replace(ApiDef.API_URL, "");
    let apiUrl = ""
    let listString = url.split("/");
    let index = 0;
    if (!params) {
        params = [""];
    }
    for (let i = 0; i < listString.length; i++) {
        if (listString[i].includes("=")) {
            let childStrings = listString[i].split("=");
            for (let j = 0; j < childStrings.length; j++) {
                let stringChildRes = checkAndReplaceParam(childStrings[j], params[index], index);
                apiUrl += stringChildRes.stringResult;
                index = stringChildRes.index;
                if (j < childStrings.length - 1) {
                    apiUrl += "=";
                }
            }
        }
        else {
            let stringRes = checkAndReplaceParam(listString[i], params[index], index);
            apiUrl += stringRes.stringResult;
            index = stringRes.index;
        }
        if (i < listString.length - 1) {
            apiUrl += "/";
        }
    }
    const response = await fetch(`${process.env.SERVER_API_URL}/${apiUrl}`, {
        method: 'GET'
    });
    return await response.json();
}

async function storeData(requestUrl, params, requestBody) {
    let url = requestUrl.replace(ApiDef.API_URL, "");
    let apiUrl = ""
    let listString = url.split("/");
    let index = 0;
    if (!params) {
        params = [""];
    }
    for (let i = 0; i < listString.length; i++) {
        if (listString[i].includes("=")) {
            let childStrings = listString[i].split("=");
            for (let j = 0; j < childStrings.length; j++) {
                let stringChildRes = checkAndReplaceParam(childStrings[j], params[index], index);
                apiUrl += stringChildRes.stringResult;
                index = stringChildRes.index;
                if (j < childStrings.length - 1) {
                    apiUrl += "=";
                }
            }
        }
        else {
            let stringRes = checkAndReplaceParam(listString[i], params[index], index);
            apiUrl += stringRes.stringResult;
            index = stringRes.index;
        }
        if (i < listString.length - 1) {
            apiUrl += "/";
        }
    }
    const response = await fetch(`${process.env.SERVER_API_URL}/${apiUrl}`, {
        method: 'POST',
        body: requestBody,
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
}

/**
 * Check url and replace with input param
 * @param {string} stringCheck the string contains character '?' in url
 * @param {any} paramReplace replace that string with this value
 * @param {number} paramIndex the index number of param in url
 * @returns string after replace and index
 */
function checkAndReplaceParam(stringCheck, paramReplace, paramIndex) {
    let stringResult = "";
    let index = paramIndex;
    if (stringCheck.includes(":")) {
        let stringRep = stringCheck.substring(stringCheck.indexOf(':'), stringCheck.length);
        stringResult = stringCheck.replace(stringRep, paramReplace);
        index++;
    }
    else {
        stringResult = stringCheck;
    }
    return { stringResult: stringResult, index: index };
}

module.exports = {
    initmodels,
    ApiReceptionRegistration,
    fetchData,
    storeData
}