import './Detail.css';

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRightFromBracket, faBars, faArrowsRotate, faPaperclip, faEdit, faTrashCan, faReply, faRepeat, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import ArchiveRelation from './detail/archiveRelation';
import GetHashtag from './detail/hashtag';
import GetCheckDetail from './detail/check';
import GetDesc from './detail/desc';
import GetTitle from './detail/title';
import GetPrize from './detail/prize';
import GetDueDate from './detail/duedate';
import GetComment from './detail/comment';

library.add( faPlus, faRightFromBracket, faBars, faArrowsRotate, faPaperclip, faEdit, faTrashCan, faCopy, faReply, faRepeat, faCheck );

const Detail = (props) => {
    const [tasks, setTaskList] = useState([]);
    const id_key = 1; //user id for now
    const [status, setStatus] = useState("");
    // const [task_check, setCheck] = useState("");
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

    useEffect(() => {
        getAllTask();
    }, []);

    //Fetch data.
    const getAllTask = async () => {
        const response = await Axios.get("http://localhost:9000/getAllTask");
        setTaskList(response.data.data);
    };

    //Converter
    const data = Object.values(tasks);

    //Date convert
    function dateConverter(datetime){
        const result = new Date(datetime);
        const now = new Date(Date.now());
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        //FIx this!!!
        if(result.toDateString() === now.toDateString()){
            // if(result.getHours == now.getHours){
            //     return " " + result.getHours() + ":" + result.getMinutes();    
            // } else {
            //     return "Today " + result.getHours() + ":" + result.getMinutes();    
            // }
            return "Today at " + ("0" + result.getHours()).slice(-2) + ":" + ("0" + result.getMinutes()).slice(-2);
        } else if(result.toDateString() === yesterday.toDateString()){
            return "Yesterday at" + " " + ("0" + result.getHours()).slice(-2) + ":" + ("0" + result.getMinutes()).slice(-2);
        } else {
            return " " + result.getFullYear() + "/" + (result.getMonth() + 1) + "/" + ("0" + result.getDate()).slice(-2) + " " + ("0" + result.getHours()).slice(-2) + ":" + ("0" + result.getMinutes()).slice(-2);  
        }
    }

    //Get finished button
    function getFinishedButton(id, task_status){
        if(task_status == "unfinished"){
            return (
                <form onSubmit={editStatus}>
                    <button className='btn btn-success py-1 mt-1 w-100' onClick={(e) => [setId(id), setStatus('finished')]} >Set as done</button>
                </form>
            );
        } else {
            return (
                <form onSubmit={editStatus}>
                    <button className='btn btn-success-inner py-1 mt-1 w-100' onClick={(e) => [setId(id), setStatus('unfinished')]} title="Unfinish this Task"><FontAwesomeIcon icon="fa-solid fa-check"/> Finished Task</button>
                </form>
            );
        }
    }

    return (
        <div>
            {
                data.map((val, i, index) => {
                    i++;
                    const modal_id = "open-task-"+ val.id;

                    return (
                    <div className='modal fade' id={modal_id} aria-labelledby='exampleModalLabel' aria-hidden='true'>
                        <div className='modal-dialog  modal-lg'>
                            <div className='modal-content border-0'>
                                <div className='modal-body position-relative px-3 py-4'>
                                    <button type='button' className='btn-close position-absolute' data-bs-dismiss='modal' aria-label='Close'></button>
                                    {/* Edit title */}
                                    <div className='mt-3'>
                                        <GetTitle title_pass={val.task_title} id_task={val.id}/>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-6 col-md-12 col-sm-12'>
                                            {/* Edit description */}
                                            <GetDesc desc_pass={val.task_desc} id_task={val.id}/>
                                            <div className='card mb-2 p-2'>
                                                <h6>Tags</h6>
                                                {/* Show hashtag w/ tag management  */}
                                                <GetHashtag tag_pass={val.task_tag} id_task={val.id}/>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-12 col-sm-12'>
                                            <div className='card mb-2 p-2'>
                                                <h6>Checklist</h6>
                                                {/* Show check w/ tag management  */}
                                                <GetCheckDetail check_pass={val.task_check} id_task={val.id}/>
                                            </div>
                                            <div className='card mb-2 p-2'>
                                                <h6>Prize</h6>
                                                {/* Edit prize */}
                                                <GetPrize prize_pass={val.task_prize} id_task={val.id}/>
                                            </div>
                                            <div className='card mb-2 p-2'>
                                                <h6>Due Date</h6>
                                                {/* Edit due date */}
                                                <GetDueDate duedate_pass={val.due_date} id_task={val.id}/>
                                            </div>
                                        </div>
                                    </div>
                                    <h6 className='position-absolute tasks-date'><FontAwesomeIcon icon="fa-regular fa-clock"/>{dateConverter(val.created_at)}</h6>
                                    <hr></hr><div className='row'>
                                        <div className='col-lg-9 col-md-12 col-sm-12'>
                                            {/* Task comment */}
                                            <GetComment totalcomment_pass={val.total_comment} id_task={val.id}/>
                                        </div>
                                        <div className='col-lg-3 col-md-12 col-sm-12'>
                                            {/* Delete task */}
                                            <form onSubmit={deleteTask} className="">
                                                <button className='btn btn-danger py-1 mt-1 w-100' onClick={(e) => setId(val.id)} >Delete</button>
                                            </form>
                                            {/* Finished task */}
                                            {getFinishedButton(val.id, val.task_status)}
                                            {/* Show Archive Relation with remove and add */}
                                            <ArchiveRelation id_task={val.id}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>);
                })
            }
        </div>
    );
}

export default Detail;