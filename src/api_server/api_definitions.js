const api_services = require('./api_services');

const api_url = '/api/';
const method = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT'
};

const api_dict = {
    SaveTestData: { url: api_url + 'save', func: api_services.saveTestData, method: method.POST },
    GetTestData: { url: api_url + 'get', func: api_services.getTestData, method: method.GET },
    TestAddData: { url: api_url + 'test_save', func: api_services.testSaveTestData, method: method.POST }
}

module.exports = {
    api_url,
    method,
    api_dict
}