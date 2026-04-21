const express = require('express');
const cors = require('cors');
const db = require('./db/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Get All Profiles Endpoint
app.get('/api/profiles', async (req, res) => {
    try {
        const {
            gender, age_group, country_id,
            min_age, max_age,
            min_gender_probability, min_country_probability,
            sort_by = 'created_at', order = 'desc',
            page = 1, limit = 10
        } = req.query;

        // Start Query
        let query = db('profiles');

        // Filtering Logic
        if (gender) query.where('gender', gender);
        if (age_group) query.where('age_group', age_group);
        if (country_id) query.where('country_id', country_id);
        if (min_age) query.where('age', '>=', parseInt(min_age));
        if (max_age) query.where('age', '<=', parseInt(max_age));
        if (min_gender_probability) query.where('gender_probability', '>=', parseFloat(min_gender_probability));
        if (min_country_probability) query.where('country_probability', '>=', parseFloat(min_country_probability));

        // Sorting
        const validSortFields = ['age', 'created_at', 'gender_probability'];
        const finalSort = validSortFields.includes(sort_by) ? sort_by : 'created_at';
        query.orderBy(finalSort, order.toLowerCase() === 'asc' ? 'asc' : 'desc');

        // Pagination
        const offset = (parseInt(page) - 1) * parseInt(limit);
        const data = await query.clone().limit(parseInt(limit)).offset(offset);
        
        // Get Total Count for metadata
        const totalResult = await query.clone().count('id as count').first();
        const total = totalResult.count;

        res.json({
            status: "success",
            page: parseInt(page),
            limit: parseInt(limit),
            total: parseInt(total),
            data
        });

    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));