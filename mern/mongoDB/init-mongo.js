db = db.getSiblingDB('doan');
db.createUser(
    {
        user: 'root',
        pwd: 'root',
        roles: [{ role: 'readWrite', db: 'doan' }],quit
    },
);