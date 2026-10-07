import express from 'express'
import LocationsController from '../controllers/locations.js'
import EventsController from '../controllers/events.js'

const router = express.Router()

router.get('/', LocationsController.getLocations)
router.get('/events/:id', EventsController.getEventsByLocation)
router.get('/:id', LocationsController.getLocationById)

export default router
