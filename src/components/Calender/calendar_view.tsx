'use client'
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useLocale } from 'next-intl'
import { arLocale, enLocale } from '../../../localeConfig'


export default function CalendarComponent() {
    const locale = useLocale();
    function renderEventContent(eventInfo:any) {
        return (
          <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
          </>
        )
      }
    return (
        <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <FullCalendar
                   initialView="dayGridMonth"
                   plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                //    events={events}
                   displayEventEnd={false}
                   // eventColor={"#" + Math.floor(Math.random() * 16777215).toString(16)}
                   eventColor="#040831"
                   selectable={true}
                   locales={[arLocale, enLocale]}
                   locale={locale == 'ar' ? 'ar-LB' : 'en'}
                 
                   editable={true}
                   headerToolbar={{
                     left: 'prev,next today',
                     center: 'title',
                     right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                   }}
                   // eventBackgroundColor={events.eventStatus=='public'?"green":"red" }
                //    eventClick={handleEventClick}
      
          
          nowIndicator={true}
          selectMirror={true}
          resources={[
            { id: 'a', title: 'Auditorium A' },
            { id: 'b', title: 'Auditorium B', eventColor: 'green' },
            { id: 'c', title: 'Auditorium C', eventColor: 'orange' },
          ]}
          initialEvents={[
            { title: 'nice event', start: new Date(), resourceId: 'a' }
          ]}
        />
            </div>
  )
}
