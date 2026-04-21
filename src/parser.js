const parseQuery = (queryStr) => {
    const filters = {};
    const lowerQuery = queryStr.toLowerCase();

    if (lowerQuery.includes('female')) {
        filters.gender = 'female';
    } else if (lowerQuery.includes('male')) {
        filters.gender = 'male';
    }

    if (lowerQuery.includes('young')) {
        filters.min_age = 16;
        filters.max_age = 24;
    }
    
    // Mapping country names to codes for the official data
    const countryMap = {
        'nigeria': 'NG',
        'kenya': 'KE',
        'tanzania': 'TZ',
        'uganda': 'UG',
        'ghana': 'GH'
    };

    for (const [name, id] of Object.entries(countryMap)) {
        if (lowerQuery.includes(name)) {
            filters.country_id = id;
            break;
        }
    }

    return Object.keys(filters).length === 0 ? null : filters;
};

module.exports = { parseQuery };