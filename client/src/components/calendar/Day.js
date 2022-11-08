import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
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
                let date = dd.getFullYear().toString()+"-"+(dd.getMonth()+1).toString()+"-"+("0" + dd.getDate()).slice(-2).toString(); 
                event.push({ title: val.task_title, date: date});
            }
        });

        return event;
    }

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
                            plugins={[ dayGridPlugin ]}
                            initialView="dayGridMonth"
                            events={getEvents(data)}
                        />
                    </div>
                </section>
            </div>
        );
      }
}

export default Day;