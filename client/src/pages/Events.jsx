import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import '../css/Events.css'

const Events = () => {
    const [locations, setLocations] = useState([])
    const [events, setEvents] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('all')

    useEffect(() => {
        (async () => {
            try {
                const locationsData = await LocationsAPI.getAllLocations()
                setLocations(locationsData)
            }
            catch (error) {
                console.error(error)
            }
        }) ()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const eventsData = selectedLocation === 'all'
                    ? await EventsAPI.getAllEvents()
                    : await LocationsAPI.getEventsByLocation(selectedLocation)
                setEvents(eventsData)
            }
            catch (error) {
                console.error(error)
            }
        }) ()
    }, [selectedLocation])

    return (
        <div className='all-events-main'>
            <div className='event-filters'>
                <select value={selectedLocation} onChange={(event) => setSelectedLocation(event.target.value)}>
                    <option value='all'>See events at . . .</option>
                    {
                        locations && locations.length > 0 ? locations.map((location) =>
                            <option key={location.id} value={location.id}>{location.name}</option>
                        ) : <option disabled>No locations found in UnityGrid Plaza yet!</option>
                    }
                </select>

                <button onClick={() => setSelectedLocation('all')}>Show All Events</button>
            </div>

            <div className='all-events'>
                {
                    events && events.length > 0 ? events.map((event) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                            remaining={event.remaining}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled in UnityGrid Plaza yet!'}</h2>
                }
            </div>
        </div>
    )
}

export default Events
