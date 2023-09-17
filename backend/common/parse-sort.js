const parseSort = sort => {
    if (sort == null) {
        return null;
    }

    const _sort = { };

    const fields = sort?.split(',')?.filter(Boolean);
    for (const field of fields) {
        if (field.startsWith('-')) {
            _sort[field.substring(1)] = -1;
        }
        else if (field.startsWith('+')) {
            _sort[field.substring(1)] = 1;
        }
        else {
            _sort[field] = 1;
        }
    }

    return _sort;
};

export default parseSort;