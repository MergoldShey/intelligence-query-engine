const { uuidv7 } = require('uuidv7');
const fs = require('fs');
const path = require('path');

exports.seed = async function(knex) {
  // 1. Clear existing data (Optional, but the task says "should not create duplicate records")
  // We use .onConflict('name').ignore() later to handle duplicates properly.
  
  // 2. Load your data
  // Assuming you saved the 2026 profiles to a file named profiles.json
  const filePath = path.join(__dirname, '../../profiles.json');
  
  if (!fs.existsSync(filePath)) {
    console.error("profiles.json not found! Please create it in the root directory.");
    return;
  }

  const rawData = fs.readFileSync(filePath);
  const profiles = JSON.parse(rawData);

  // 3. Transform data to include UUID v7
  const profilesWithIds = profiles.map(profile => ({
    id: uuidv7(),
    name: profile.name,
    gender: profile.gender,
    gender_probability: profile.gender_probability,
    age: profile.age,
    age_group: profile.age_group,
    country_id: profile.country_id,
    country_name: profile.country_name,
    country_probability: profile.country_probability,
    // created_at is handled by default value in DB
  }));

  // 4. Insert data with duplicate handling
  console.log(`Seeding ${profilesWithIds.length} profiles...`);
  
  return knex('profiles')
    .insert(profilesWithIds)
    .onConflict('name') 
    .ignore(); 
};