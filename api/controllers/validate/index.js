const _ = require('lodash');

const error = 'DATA_NOT_FOUND';

 function validateRequest(res, data, field = null) {
    if (!data || _.isEmpty(data)) {
        res.status(400).json({ error: field ? `Unable to find data for field: ${field}` : error });
        return true;
    }
    return false;
}

module.exports = validateRequest;