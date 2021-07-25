const Paginator = require('../paginator/paginator')
class APIError {
    constructor(code, message, ...propertiesAndValues) {
        propertiesAndValues = Paginator.paginate(propertiesAndValues, 2)
        var extend = {data: Object.fromEntries(propertiesAndValues)}
        return Object.assign({status: "error", code, message}, extend)
    }
}
module.exports = APIError