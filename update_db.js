const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'frontend/apps/mock-server/db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

let carIdCounter = 1;

db.campaigns.forEach(campaign => {
    if (campaign.cars) {
        campaign.cars.forEach(car => {
            if (!car.id) {
                car.id = carIdCounter++;
            }
        });
    }
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 4));
console.log('Updated db.json with car IDs');
