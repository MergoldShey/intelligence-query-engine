const parseQuery = (queryStr) => {
    const filters = {};
    const lowerQuery = queryStr.toLowerCase();

    // 1. Gender Parsing
    if (lowerQuery.includes('female')) {
        filters.gender = 'female';
    } else if (lowerQuery.includes('male')) {
        filters.gender = 'male';
    }

    // 2. Age Group & "Young" Mapping
    if (lowerQuery.includes('young')) {
        filters.min_age = 16;
        filters.max_age = 24;
    }
    if (lowerQuery.includes('teenager')) filters.age_group = 'teenager';
    if (lowerQuery.includes('adult')) filters.age_group = 'adult';
    if (lowerQuery.includes('senior')) filters.age_group = 'senior';

    // 3. Specific Age Constraints ("above 30", "below 20")
    const aboveMatch = lowerQuery.match(/above (\d+)/);
    if (aboveMatch) filters.min_age = parseInt(aboveMatch[1]);

    const belowMatch = lowerQuery.match(/below (\d+)/);
    if (belowMatch) filters.max_age = parseInt(belowMatch[1]);

    // 4. Country Parsing (Mapping names to ISO codes)
    // You can expand this list based on your profiles.json
    const countryMap = {
        'nigeria': 'NG',
        'kenya': 'KE',
        'angola': 'AO',
        'spain': 'ES',
        'japan': 'JP',
        'united states': 'US'
    };

    for (const [name, id] of Object.entries(countryMap)) {
        if (lowerQuery.includes(name)) {
            filters.country_id = id;
            break;
        }
    }

    // Validation: If no filters were identified, return error
    if (Object.keys(filters).length === 0) return null;

    return filters;
};

module.exports = { parseQuery };