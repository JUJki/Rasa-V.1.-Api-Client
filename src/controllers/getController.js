import {requester} from "../lib/requester";

const getStatusRasa = async (request, response) => {
  const result = await requester('status', '', {});
  response.setHeader('Content-Type', 'application/json');
  response.send(result);
}
const getVersionRasa = async (request, response) => {
  const result = await requester('version', '', {});
  response.setHeader('Content-Type', 'application/json');
  response.send(result);
}

module.exports = {
  getStatusRasa,
  getVersionRasa
}
