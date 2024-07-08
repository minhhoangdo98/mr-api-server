const global_def = require("../common/global_definition.js");

/**
 * Check if data model is empty
 * @param {String} dataType type of data in db
 * @param {String} dataName name of collection
 * @returns true if empty, false if not empty
 */
async function checkEmptyCollection(collectionName) {
    const dataFind = await global_def.model_dicts[collectionName].findOne().exec();
    if (dataFind) {
        return false;
    }
    return true;
}

/**
 * Find railway data by data type and data name.
 * @param {String} dataTypetype of data in db
 * @param {String} dataNamename of collection
 * @returns the railway data according to data type and data name
 */
async function findData(collectionName) {
    return await global_def.model_dicts[collectionName].find().exec();
}

/**
 * Insert data from list data
 * @param {string} collectionName name of collection
 * @param {json[]} dataList list data to insert
 * @returns true if success or error
 */
async function insertListData(collectionName, dataList) {
    const result = await global_def.model_dicts[collectionName].insertMany(dataList);
    return true;
  }

/**
 * Update or insert data
 * @param {String} collectionName name of collection
 * @param {dictionary} filter condition to filter data for update
 * @param {json} data data to update or insert
 * @returns true if success, false if not
 */
async function upsertData(collectionName, filter, data) {
    const dataUpsert = await global_def.model_dicts[collectionName].findOneAndUpdate(filter, data, {
        new: true,
        upsert: true
    });
    return dataUpsert;
}

/**
 * delete list data by on filter
 * @param {String} collectionName name of collection
 * @param {dictionary} filter condition to filter data for delete
 * @returns true if success, false if not
 */
async function deleteListData(collectionName, filter) {
    await global_def.model_dicts[collectionName].deleteMany(filter);
    return true;
  }

module.exports = {
    checkEmptyCollection,
    findData,
    upsertData,
    deleteListData,
    insertListData
}