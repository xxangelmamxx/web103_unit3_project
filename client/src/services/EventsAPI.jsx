const getAllEvents = async () => {
    const response = await fetch('/api/events')
    if (!response.ok) throw new Error(`Failed to fetch events (${response.status})`)
    return response.json()
}

const getEventsById = async (id) => {
    const response = await fetch(`/api/events/${id}`)
    if (!response.ok) throw new Error(`Failed to fetch event ${id} (${response.status})`)
    return response.json()
}

export default {
    getAllEvents,
    getEventsById
}
