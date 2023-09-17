import isValidJson from './is-valid-json.js';

const parseFilter = queryFilter => {

    let fields = [];
    if (queryFilter !== null && isValidJson(queryFilter)) {
        fields = JSON.parse(queryFilter)
    }

    const operators = {
        'regex': '$regex',
        'in': '$in',
        'lt': '$lt',    // lower than
        'lte': '$lte',  // lower than or equal to
        'gt': '$gt',    // greater than
        'gte': '$gte',  // greater than or equal to
        'ne': '$ne',    // not equal to
    };

    const filter = {};

    for (const path in fields) {
        if (typeof fields[path] === 'object') {
            for (const operator in operators) {
                if (fields[path][operator] != null) {
                    if (operator === 'in') {
                        filter[path] = {
                            ...filter[path],
                            [operators[operator]]: fields[path][operator]
                        };
                    }
                    else {
                        filter[path] = {
                            ...filter[path],
                            [operators[operator]]: fields[path][operator]
                        };
                    }
                }
            }
        }
        else if (typeof fields[path] === 'string') {
            filter[path] = {
                ...filter[path],
                [operators['regex']]: fields[path],
                ['$options']: 'i'
            }
        }
    }

    return filter;
};

export default parseFilter