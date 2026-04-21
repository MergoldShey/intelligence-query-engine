const { uuidv7 } = require('uuidv7');
const fs = require('fs');
const path = require('path');

exports.seed = async function(knex) {
  // 1. Clear existing manual data to start fresh
  await knex('profiles').del();

  // 2. Load the official seed_profiles.json
  const filePath = path.join(__dirname, '../../seed_profiles.json');
  
  if (!fs.existsSync(filePath)) {
    console.error("seed_profiles.json not found in the root directory!");
    return;
  }

  const rawData = fs.readFileSync(filePath);
  const jsonData = JSON.parse(rawData);
  
  // Access the 'profiles' array from your JSON file
  const profileList = jsonData.profiles;

  // 3. Transform data to include UUID v7
  const profilesWithIds = profileList.map(profile => ({
    id: uuidv7(),
    name: profile.name,
    gender: profile.gender,
    gender_probability: profile.gender_probability,
    age: profile.age,
    age_group: profile.age_group,
    country_id: profile.country_id,
    country_name: profile.country_name,
    country_probability: profile.country_probability
  }));

  // 4. Insert the new official data
  console.log(`Seeding ${profilesWithIds.length} official profiles...`);
  
  return knex('profiles').insert(profilesWithIds);
};