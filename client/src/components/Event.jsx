import React from 'react'
import dates from '../services/dates'
import '../css/Event.css'

const Event = (props) => {

    const time = dates.formatTime(props.time)
    const remaining = dates.formatRemainingTime(props.remaining)
    const hasPassed = dates.hasPassed(props.remaining)

    return (
        <article className='event-information'>
            <img src={props.image} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{props.title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {props.date} <br /> {time}</p>
                    <p id={`remaining-${props.id}`} className={hasPassed ? 'negative-time-remaining' : undefined}>{remaining}</p>
                </div>
            </div>
        </article>
    )
}

export default Event
