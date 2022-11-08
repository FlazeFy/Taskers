import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


const Day = () => {
    return (
        <div className='container d-block mx-auto p-1 mt-1'>
            <section id="content" className="content">
                <div className="container p-0">
                    <FullCalendar
                        plugins={[ dayGridPlugin ]}
                        initialView="dayGridMonth"
                        events={[
                            // { title: 'event 1', date: '2022-1-08' },
                            // { title: 'event 2', date: '2022-11-10' }
                        ]}
                    />
                </div>
            </section>
        </div>
    );
}

export default Day;