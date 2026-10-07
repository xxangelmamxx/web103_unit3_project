import { pool } from '../config/database.js'

const selectEventsQuery = `
    SELECT
        id,
        title,
        TO_CHAR(date, 'Mon DD, YYYY') AS date,
        time,
        location,
        image,
        AGE(date, CURRENT_DATE) AS remaining
    FROM events
`

const getEvents = async (_, res) => {
    try {
        const results = await pool.query(`${selectEventsQuery} ORDER BY id ASC`)
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getEventById = async (req, res) => {
    try {
        const results = await pool.query(`${selectEventsQuery} WHERE id = $1`, [req.params.id])

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' })
        }

        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getEventsByLocation = async (req, res) => {
    try {
        const results = await pool.query(
            `${selectEventsQuery} WHERE location = $1 ORDER BY id ASC`,
            [req.params.id]
        )
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    getEvents,
    getEventById,
    getEventsByLocation
}
