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
    // const [task_check, setCheck] = useState("");
    const [id, setId] = useState(""); //for task id
    const [id_check, setIdCheck] = useState(""); //for task check
    const [check_detail, setCheckDetail] = useState(""); //for task check detail
    const [tag_detail, setTagDetail] = useState(""); //for task tag detail

    //Update task description
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

    //Update task check
    const editCheck = async (e) => {
        e.preventDefault();

        //Make valid json
        let result = check_detail[1].replace(/'/g, '"');
        var data_check_d = JSON.parse(result);
            
        //Make new json[] value
        var new_check = {id: id_check, detail: check_detail[0]};
        
        //Change old json
        var check = data_check_d.map(r => r.id !== new_check.id ? r : new_check);
        
        //console.log(check);

        try {
            await Axios.put("http://localhost:9000/updateCheck", {
                check,
                id
            });
        } catch (error) {
            console.log(error.response);
        }
    };

    //Delete tag
    async function deleteTag (e) {
        e.preventDefault();

        //Get value from tag detail
        const id_tag_remove = tag_detail[0]; //By tag index in json
        var tag_old = tag_detail[1];
        var id_task = tag_detail[2]; 
    
        //Delete json element
        if(tag_old.length == 1 ){
            tag_old = null;
        } else {
            tag_old.splice(id_tag_remove, 1);
        }
        
        //console.log(id_tag_remove);

        try {
            await Axios.put("http://localhost:9000/deleteTag", {
                tag_old,
                id_task
            });
        } catch (error) {
            console.log(error.response);
        }
    };

    //Delete check
    async function deleteCheck (e) {
        e.preventDefault();

        //Get value from tag detail
        const id_check_remove = check_detail[0]; //By tag index in json
        var check_old = check_detail[1];
        var id_task = check_detail[2]; 
    
        //Delete json element
        if(check_old.length == 1 ){
            check_old = null;
        } else {
            check_old.splice(id_check_remove, 1);
        }
        
        //console.log(check_old);

        try {
            await Axios.put("http://localhost:9000/deleteCheck", {
                check_old,
                id_task
            });
        } catch (error) {
            console.log(error.response);
        }
    };



    //Update task title
    async function editTitle (e) {
        const title = e.target.value;
        
        e.preventDefault();
        try {
            await Axios.put("http://localhost:9000/updateTitle", {
                title,
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
    function getHashtag(tag, id_task){
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
                            <span className='box-tag'>
                                <a className='btn-detail tasks-icon-box text-optional'>
                                    <FontAwesomeIcon icon="fa-solid fa-hashtag" />{val.tag}
                                </a>
                                {/* Remove Task tag */}
                                <form onSubmit={deleteTag} className='d-inline'>
                                    <button className='btn-remove-tag' title='Remove this tag' type="submit" onClick={(e) => setTagDetail([index, data_tag, id_task])}><FontAwesomeIcon icon="fa-solid fa-trash" /></button>
                                </form>
                            </span>
                        );
                    })
                    }
                    <a className='btn-add-tag px-2 py-1 rounded'>
                        <FontAwesomeIcon icon="fa-solid fa-plus" /> Add Tag
                    </a>
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
            //console.log(data_check_d);

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
                                            {/* Edit Task checklist */}
                                            <form onSubmit={editCheck}>
                                                    <input required type="text" defaultValue={val.detail} onBlur={(e) => setIdCheck(val.id)} onChange={(e) => setCheckDetail([e.target.value, check])} 
                                                        className="form-check-edit w-100 mb-3"></input>
                                                    <button type='submit' onClick={(e) => setId(id_task)} className='btn btn-success py-1' title='Save Check'>Save</button>
                                                    <a className='btn-close-clps ms-3' data-bs-dismiss="collapse"><FontAwesomeIcon icon="fa-solid fa-xmark" size='lg' /></a>
                                            </form>
                                            {/* Remove Task checklist */}
                                            <form onSubmit={deleteCheck} className='d-inline'>
                                                <button className='btn-delete-check' title='Delete Check' type='submit' onClick={(e) => setCheckDetail([index, data_check_d, id_task])}><FontAwesomeIcon icon="fa-solid fa-trash" /></button>
                                            </form>
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
                                    {/* Edit description */}
                                    <input className='form-control-custom-title my-3' id='exampleModalLabel' defaultValue={val.task_title} onChange={(e) => setId(val.id)} onBlur={editTitle}></input>
                                    <div className='row'>
                                        <div className='col-lg-6 col-md-12 col-sm-12'>
                                            {/* Edit description */}
                                            <form onSubmit={editDesc}>
                                                <div className='card mb-2 p-2'>
                                                    <h6>Description</h6>
                                                    <textarea type="text" className="form-check-edit edit" id="floatingInput"
                                                        defaultValue={val.task_desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                                                    <button type='submit' onClick={(e) => setId(val.id)} className='btn btn-success py-1 mt-1 w-25' title='Save Check'>Save</button>
                                                </div>
                                            </form>
                                            <div className='card mb-2 p-2'>
                                                <h6>Tags</h6>
                                                {getHashtag(val.task_tag, val.id)}
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