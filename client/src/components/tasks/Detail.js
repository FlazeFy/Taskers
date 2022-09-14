import './Detail.css';

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRightFromBracket, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";

library.add( faPlus, faRightFromBracket, faBars );

const Detail = (props) => {
    const [tasks, setTaskList] = useState([]);
    const id_key = 1; //user id for now
    const [desc, setDesc] = useState("");
    const [id, setId] = useState(""); //for task id

    const editDesc = async (e) => {
        e.preventDefault();
        try {
            await Axios.put("http://localhost:9000/updateDesc", {
                desc,
                id
            });
        } catch (error) {
            console.log(error.response);
        }
    };

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

    //Get task tag
    function getHashtag(tag){
        if(tag == null){
            return null;
        } else {
            //Converter
            const data_tag = JSON.parse(tag);
            // console.log(data_tag);

            return (
                <span>
                    {
                    data_tag.map((val, index) => {
                        return (
                            <a className='btn-detail tasks-icon-box text-optional'>
                                <FontAwesomeIcon icon="fa-solid fa-hashtag" />{val.tag}
                            </a>
                        );
                    })
                    }
                </span>
            )
        }
    }

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
            return "Today at " + result.getHours() + ":" + result.getMinutes();
        } else if(result.toDateString() === yesterday.toDateString()){
            return "Yesterday at" + " " + result.getHours() + ":" + result.getMinutes();
        } else {
            return " " + result.getFullYear() + "/" + (result.getMonth() + 1) + "/" + result.getDate() + " " + result.getHours() + ":" + result.getMinutes();  
        }
    }

    //Get task tag msg
    function getMsgNull(val){
        if(val == null){
            return (
                <h6 className='fw-bold'>-</h6>
            );
        }
    }

    //Get check detail
    function getCheckDetail(check, id_task){
        if(check == null){
            return null;
        } else {
            //Converter
            let result = check.replace(/'/g, '"');
            const data_check_d = JSON.parse(result);
            console.log(data_check_d);

            const accrd_key = "accrd_check_" + id_task;
            const accrd_call = "#accrd_check_"+ id_task;

            return (
                <div className='accordion ps-3' id={accrd_key}>
                    {
                    data_check_d.map((val, index) => {
                        const clps_key = "clpsCheck_" + id_task + "_" + val.id;
                        const clps_call = "#clpsCheck_"+ id_task + "_" + val.id;
                        return (
                            <div className='row mt-1'>
                                <div className='col-1'>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                    </div>
                                </div>
                                <div className='col-11'>
                                    <button className='btn-check-detail' type='button' data-bs-toggle="collapse" data-bs-target={clps_call}>{val.detail}</button>
                                    <div className="collapse mt-2" id={clps_key} data-bs-parent={accrd_call}>
                                        <div className="edit_check_box p-2 position-relative">
                                            <input required type="text" defaultValue={val.detail} className="form-check-edit w-100 mb-3" id="floatingInput"></input>
                                            <button type='submit' className='btn btn-success py-1' title='Save Check'>Save</button>
                                            <a className='btn-close-clps ms-3'><FontAwesomeIcon icon="fa-solid fa-xmark" size='lg' /></a>
                                            <a className='btn-delete-check position-absolute' title='Delete Check'><FontAwesomeIcon icon="fa-solid fa-trash" /></a>
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
                                    <h5 className='modal-title my-3 text-center' id='exampleModalLabel'>{val.task_title}</h5>
                                    <div className='row'>
                                        <div className='col-lg-6 col-md-12 col-sm-12'>
                                            {/* Edit description */}
                                            <form onSubmit={editDesc}>
                                                <div className='card mb-2 p-2'>
                                                    <h6>Description</h6>
                                                    <textarea type="text" className="form-check-edit" id="floatingInput"
                                                        defaultValue={val.task_desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                                                    <button type='submit' onClick={(e) => setId(val.id)} className='btn btn-success py-1 mt-1 w-25' title='Save Check'>Save</button>
                                                </div>
                                            </form>
                                            <div className='card mb-2 p-2'>
                                                <h6>Tags</h6>
                                                {getHashtag(val.task_tag)}
                                                {getMsgNull(val.task_tag)}
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-12 col-sm-12'>
                                            <div className='card mb-2 p-2'>
                                                <h6>Checklist</h6>
                                                {getCheckDetail(val.task_check, val.id)}
                                                {getMsgNull(val.task_check)}
                                            </div>
                                        </div>
                                    </div>
                                    <h6 className='position-absolute tasks-date'><FontAwesomeIcon icon="fa-regular fa-clock" />{dateConverter(val.created_at)}</h6>
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