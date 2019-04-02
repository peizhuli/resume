/**
 * Created by Y on 2019/3/4.
 */
let request = require('./fly');
let config = require('../../config');
const BASEAPI = {
  baseURL: config.server + ':' + config.port
};

let API = {
  getBaseInfos: () => request.get('/getBaseInfos', null, BASEAPI),
  getSkills: () => request.get('/getSkills', null, BASEAPI),
  getExperiences: () => request.get('/getExperiences', null, BASEAPI)
};

export default API;
