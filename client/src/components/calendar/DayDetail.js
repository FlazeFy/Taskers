import './DayDetail.css';

import { useState, useEffect } from "react";
import Axios from "axios";
import GetHashtag from '../tasks/detail/hashtag';
import GetCheckDetail from '../tasks/detail/check';
import GetDesc from '../tasks/detail/desc';
import GetTitle from '../tasks/detail/title';
import GetDueDate from "../tasks/detail/duedate";
import GetPrize from "../tasks/detail/prize";
import GetComment from '../tasks/detail/comment';
import ArchiveRelation from '../tasks/detail/archiveRelation';

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRightFromBracket, faBars, faArrowsRotate, faPaperclip, faEdit, faTrashCan, faReply, faRepeat, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
library.add( faPlus, faRightFromBracket, faBars, faArrowsRotate, faPaperclip, faEdit, faTrashCan, faCopy, faReply, faRepeat, faCheck );

function DayDetail() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState("");
    const [id, setId] = useState(""); //for task id

    //Update task status
    async function editStatus (e) {
        const task_status = status;
        
        e.preventDefault();
        try {
            await Axios.put("http://localhost:9000/updateStatus", {
                task_status,
                id
            });
        } catch (error) {
            console.log(error.response);
        }
    };

    //Delete task
    async function deleteTask(e){
        try {
            await Axios.put("http://localhost:9000/deleteTask", {
                id
            });
        } catch (error) {
            console.log(error.response);
        }
    }

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

    //Get finished button
    function getFinishedButton(id, task_status){
        if(task_status == "unfinished"){
            return (
                <form onSubmit={editStatus}>
                    <button className='btn btn-success py-1 position-absolute btn-finish-task-calendar' onClick={(e) => [setId(id), setStatus('finished')]} >Set as done</button>
                </form>
            );
        } else {
            return (
                <form onSubmit={editStatus}>
                    <button className='btn btn-success-inner py-1 position-absolute btn-finish-task-calendar' onClick={(e) => [setId(id), setStatus('unfinished')]} title="Unfinish this Task"><FontAwesomeIcon icon="fa-solid fa-check"/> Finished Task</button>
                </form>
            );
        }
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className='container d-block mx-auto p-0 mt-1'>
                {
                    data.map((val, i, index) => {
                        return(
                            <div className="container p-3 rounded shadow position-relative">
                                {/* Title */}
                                <GetTitle title_pass={val.task_title} id_task={val.id}/>

                                {/* Delete task */}
                                <form onSubmit={deleteTask} className="d-inline">
                                    <button className='btn btn-danger py-1 position-absolute btn-delete-task-calendar' onClick={(e) => setId(val.id)} ><FontAwesomeIcon icon="fa-solid fa-trash" /></button>
                                </form>

                                {/* Finished task */}
                                {getFinishedButton(val.id, val.task_status)}

                                <div class="accordion" id="accordionExample">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="headingOne">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Task Detail
                                            </button>
                                        </h2>
                                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <div className="row">
                                                    <div className="col-8">
                                                        {/* Edit description */}
                                                        <GetDesc desc_pass={val.task_desc} id_task={val.id}/>
                                                        {/* Show prize */}
                                                        <h6>Prize</h6>
                                                        <GetPrize prize_pass={val.task_prize} id_task={val.id}/>
                                                    </div>
                                                    <div className="col-4">
                                                        {/* Show Archive Relation with remove and add */}
                                                        <ArchiveRelation id_task={val.id}/>
                                                    </div>
                                                </div>

                                                {/* Show hashtag w/ tag management  */}
                                                <h6 className='mt-2'>Tags</h6>
                                                <GetHashtag tag_pass={val.task_tag} id_task={val.id}/>
                                                
                                                {/* Show checklist  */}
                                                <h6 className='mt-1'>Checklist</h6>
                                                <GetCheckDetail check_pass={val.task_check} id_task={val.id}/>

                                                {/* Show due date */}
                                                <h6 className='mt-2'>Due Date</h6>
                                                <GetDueDate duedate_pass={val.due_date} id_task={val.id}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="headingTwo">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                Task Comment
                                            </button>
                                            </h2>
                                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                {/* Task comment */}
                                                <GetComment totalcomment_pass={val.total_comment} id_task={val.id}/>
                                            </div>
                                        </div>
                                    </div>    
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default DayDetail;