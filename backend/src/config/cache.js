const NodeCache = require("node-cache");

// TTL: 60 segundos — após isso o cache expira e vai ao banco de novo
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

module.exports = cache;
