import './Day.css';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";
import Axios from "axios";

function Day() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("http://localhost:9000/getAllTask")
        .then(res => res.json())
        .then(
        (result) => {
            setIsLoaded(true);
            setItems(result.data);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            setIsLoaded(true);
            setError(error);
        }
        )
    },[])

    function getEvents(val){
        var event = [];

        data.map((val, i, index) => {
            if(val.due_date != null){
                const dd = new Date(val.due_date);
                let date = dd.getFullYear().toString()+"-"+("0" + (dd.getMonth()+1)).slice(-2).toString()+"-"+("0" + dd.getDate()).slice(-2).toString(); 
                event.push({ 
                    title: val.task_title, 
                    date: date, id:val.id, 
                    extendedProps: {
                        datetime: val.due_date
                    },
                });
            }
        });

        return event;
    }

    const handleEventClick = (arg) => {
        localStorage.setItem('view_calendar_event', arg.event.id);
        window.location.reload(false);
    };

    //Change task due date by drag & drop
    async function handleEventDrop (arg) {
        const date = new Date(arg.event.start);
        const dateBefore = new Date(arg.oldEvent.extendedProps.datetime);

        var due_date = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + " " + ("0" + dateBefore.getHours()).slice(-2) + ":" + ("0" + dateBefore.getMinutes()).slice(-2);
        var id_task = arg.event.id;
        
        try {
            await Axios.put("http://localhost:9000/updateDueDate", {
                due_date,
                id_task
            });
        } catch (error) {
            console.log(error.response);
        }

        window.location.reload(false);
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className='container d-block mx-auto p-1 mt-1'>
                <section id="content" className="content">
                    <div className="container p-0">
                        <FullCalendar
                            plugins={[ dayGridPlugin, interactionPlugin ]}
                            initialView="dayGridMonth"
                            editable={true}
                            events={getEvents(data)}
                            eventClick={handleEventClick}
                            eventDrop={handleEventDrop}
                            dayMaxEvents={true}
                            resourceEditable={true}
                        />
                    </div>
                </section>
            </div>
        );
    }
}

export default Day;