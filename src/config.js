module.exports = {
    database: {
        connectionLimit: 10,
        host: process.env.DATABASE_HOST || 'localhost',
        user: process.env.DATABASE_USER || 'root',
        password: process.env.DATABASE_PASSWORD || 'Meiven212!',
        database: process.env.DATABASE_NAME || 'db_links'
    },
    port: process.env.PORT || 4000,
    connectionString: "DRIVER={MYSQL};SERVER=127.0.0.1;UID=root;PWD=Meiven212!;DATABASE=db_links"
};