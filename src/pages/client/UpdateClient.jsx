
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import icalPlugin from '@fullcalendar/icalendar'


const UpdateClient = () => {
  


  return (
    <div> 
    

<FullCalendar
      plugins={[dayGridPlugin, icalPlugin]}
      initialView="dayGridMonth"
      events={{
        url: 'https://crm.webbixel.com/clients/api/v1/calendar',
        format: 'ics'
      }}
    />

    </div>
  );
};

export default UpdateClient;