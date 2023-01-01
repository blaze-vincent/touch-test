print('Start #################################################################');

db = db.getSiblingDB('api');
db.createUser(
  {
    user: 'api_user',
    pwd: 'api1234',
    roles: [
      { role: 'readWrite', db: 'api' },
    ],
  },
);

print('END #################################################################');