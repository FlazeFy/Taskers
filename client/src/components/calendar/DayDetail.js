import { useState, useEffect } from "react";
import Axios from "axios";
import GetHashtag from '../tasks/detail/hashtag';
import GetCheckDetail from '../tasks/detail/check';

function DayDetail() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("http://localhost:9000/getTask/"+localStorage.getItem('view_calendar_event'))
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

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className='container d-block mx-auto p-1 mt-1'>
                <h5>Detail : {localStorage.getItem('view_calendar_event')}</h5>
                {
                    data.map((val, i, index) => {
                        return(
                            <div className="container p-3 rounded shadow">
                                {/* Show hashtag w/ tag management  */}
                                <h6>Tags</h6>
                                <GetHashtag tag_pass={val.task_tag} id_task={val.id}/>
                                
                                {/* Show check w/ tag management  */}
                                <h6>Checklist</h6>
                                <GetCheckDetail check_pass={val.task_check} id_task={val.id}/>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default DayDetail;