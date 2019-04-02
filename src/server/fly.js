/**
 * Created by Y on 2019/3/4.
 */
let request = require('flyio');
request.config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

request.interceptors.request.use( req => {
  // req.withCredentials = true;
  return req;
});

request.interceptors.response.use( (res, promise) => {
  return promise.resolve(res.data);
}, (err, promise) => {
  console.log(err);
  return promise.reject();
});

module.exports = request;
