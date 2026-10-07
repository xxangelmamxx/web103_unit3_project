import { pool } from './database.js'
import locationData from '../data/locations.js'
import eventData from '../data/events.js'

const createTables = async () => {
    const createTablesQuery = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(2) NOT NULL,
            zip VARCHAR(10) NOT NULL,
            image TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            time INTEGER NOT NULL,
            location INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
            image TEXT NOT NULL
        );
    `

    await pool.query(createTablesQuery)
    console.log('🎉 locations and events tables created successfully')
}

const seedLocationsTable = async () => {
    const insertQuery = 'INSERT INTO locations (id, name, address, city, state, zip, image) VALUES ($1, $2, $3, $4, $5, $6, $7)'

    for (const location of locationData) {
        await pool.query(insertQuery, [
            location.id,
            location.name,
            location.address,
            location.city,
            location.state,
            location.zip,
            location.image
        ])
        console.log(`✅ ${location.name} added successfully`)
    }
}

const seedEventsTable = async () => {
    const insertQuery = 'INSERT INTO events (id, title, date, time, location, image) VALUES ($1, $2, $3, $4, $5, $6)'

    for (const event of eventData) {
        await pool.query(insertQuery, [
            event.id,
            event.title,
            event.date,
            event.time,
            event.location,
            event.image
        ])
        console.log(`✅ ${event.title} added successfully`)
    }
}

try {
    await createTables()
    await seedLocationsTable()
    await seedEventsTable()
}
catch (error) {
    console.error('⚠️ error resetting database', error)
    process.exitCode = 1
}
finally {
    await pool.end()
}
