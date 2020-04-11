module.exports = {
    "type": "postgres",
    "host": process.env.DATABASE_HOST,
    "port": 5432,
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "synchronize": true,
    "logging": false,
    "extra" : {
       "ssl" : true
    },
    "entities": [process.env.ENTITY_PATH],
    "migrations": [
       "src/migration/**/*.ts"
    ],
    "subscribers": [
       "src/subscriber/**/*.ts"
    ],
    "cli": {
       "entitiesDir": "src/entity",
       "migrationsDir": "src/migration",
       "subscribersDir": "src/subscriber"
    }
}