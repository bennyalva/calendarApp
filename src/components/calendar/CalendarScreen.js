import React, { useState } from 'react';
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages';
import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

moment.locale('es');
const localizer = momentLocalizer(moment);

const events = [
    {
        title: 'Cumpleaños del rey',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa',
        notes: 'Compar el pastel',
        user: {
            _id: '123',
            name: 'Benny'
        }
    }
]
export const CalendarScreen = () => {
    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month')    
    const onDoubleClick = (e) => {
        console.log('doubleClik', e)
    }

    const onSelectEvent = (e) => {
        console.log('select', e)
    }

    const onViewChange = (e) => {
        setLastView(e)
        localStorage.setItem('lastView', e)
    }
    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#367cf7',
            borderRadius: '0px',
            opacity:0.8,
            diplay: 'block',
            color: 'white'
        }
        return {
            style
        }
    }
    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={ onViewChange }
                view={lastView}
                />
                <CalendarModal />
        </div>
    )
}
