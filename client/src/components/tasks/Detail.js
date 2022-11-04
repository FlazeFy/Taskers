import './Detail.css';

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRightFromBracket, faBars, faArrowsRotate, faPaperclip, faEdit, faTrashCan, faReply, faRepeat, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import ArchiveRelation from './detail/archiveRelation';

library.add( faPlus, faRightFromBracket, faBars, faArrowsRotate, faPaperclip, faEdit, faTrashCan, faCopy, faReply, faRepeat, faCheck );

const Detail = (props) => {
    const [tasks, setTaskList] = useState([]);
    const [comments, setCommentList] = useState([]);
    const [replies, setReplyList] = useState([]);
    const id_key = 1; //user id for now
    const [desc, setDesc] = useState("");
    const [prize, setPrize] = useState("");
    const [status, setStatus] = useState("");
    const [comment, setComment] = useState("");
    const [reply, setReply] = useState("");
    // const [task_check, setCheck] = useState("");
    const [id, setId] = useState(""); //for task id
    const [id_comment, setIdComment] = useState(""); 
    const [id_check, setIdCheck] = useState(""); //for task check
    const [check_detail, setCheckDetail] = useState(""); //for task check detail
    const [tag_detail, setTagDetail] = useState(""); //for task tag detail
    const [tag, setTag] = useState(""); //for new task tag

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

    //Update task prize
    const editPrize = async (e) => {
        e.preventDefault();
        try {
            await Axios.put("http://localhost:9000/updatePrize", {
                prize,
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

    //New tag
    async function newTag (e) {
        e.preventDefault();

        var id_task = tag[2]; 

        if(tag[0] != null){
            //Make valid json
            let tag_full = tag[0].replace(/'/g, '"');
            var data_tag = JSON.parse(tag_full);  
            
            //Make new json[] value
            var new_tag = {tag: tag[1]};
            data_tag[data_tag.length] = new_tag;
            var tag_old = data_tag;   
        } else {
            var tag_old = [{tag: tag[1]}];
        }       

        //console.log(tag_old);

        try {
            await Axios.put("http://localhost:9000/deleteTag", {
                tag_old,
                id_task
            });
        } catch (error) {
            console.log(error.response);
        }
    };

    //New Check
    async function newCheck (e) {
        e.preventDefault();

        var id_task = check_detail[2]; 

        if(check_detail[0] != null){
            //Make valid json
            let check_full = check_detail[0].replace(/'/g, '"');
            var data_check = JSON.parse(check_full);  
            
            //Make new json[] value
            var new_check = {id: data_check.length + 1, detail: check_detail[1]};
            data_check[data_check.length] = new_check;
            var check_old = data_check;   
        } else {
            var check_old = [{id: 1, detail: check_detail[1]}];
        }       

        //console.log(id_task);

        try {
            await Axios.put("http://localhost:9000/deleteCheck", {
                check_old,
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

    //Comment task
    const sendComment = async (e) => {
        var id_task = id;
        
        e.preventDefault();
        try {
            await Axios.post("http://localhost:9000/insertComment/1", {
                id_task,
                comment
            });
        } catch (error) {
            console.log(error.response);
        }
    };

    //Reply Comment task
    const sendReply = async (e) => {
        e.preventDefault();

        const task_id = id_comment[0];
        const comment_id = id_comment[1];

        try {
            await Axios.post("http://localhost:9000/insertReply/1", {
                task_id,
                comment_id,
                reply
            });
        } catch (error) {
            console.log(error.response);
        }
    };

    //Update task due date
    //Bugg... cant update date and time at the same moment. one of these will set as default
    async function editDueDate (e) {
        const due_date_old = new Date(id[1]);
        const type = id[2]; // Type of due date change. "date" and "time"
        const due_date_new = e.target.value;
        const id_task = id[0];
        var due_date;
        
        //console.log(id_task);
        //Set update by its input type
        if(type == "date"){
            due_date = due_date_new + " " + due_date_old.getHours() + ":" + due_date_old.getMinutes();
        } else {
            due_date = due_date_old.getFullYear() + "-" + (due_date_old.getMonth() + 1) + "-" + due_date_old.getDate() + " " + due_date_new;
        }

        try {
            await Axios.put("http://localhost:9000/updateDueDate", {
                due_date,
                id_task
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

    //Edit comment.
    async function editComment(e){
        e.preventDefault();

        try {
            await Axios.put("http://localhost:9000/editComment/" + id_comment, {
                comment
            });
        } catch (error) {
            console.log(error.response);
        }
    }

    //Delete comment.
    async function deleteComment(e){
        e.preventDefault();

        try {
            await Axios.put("http://localhost:9000/deleteComment", {
                id_comment
            });
        } catch (error) {
            console.log(error.response);
        }
    }

    //Update task due date (set null)
    async function deleteDueDate (e) {
        const due_date = null;
        const id_task = id;
        e.preventDefault();

        //console.log(id);
        try {
            await Axios.put("http://localhost:9000/updateDueDate", {
                due_date,
                id_task
            });
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        getAllTask();
        getAllComment();
        getAllReply();
    }, []);

    //Fetch data.
    const getAllTask = async () => {
        const response = await Axios.get("http://localhost:9000/getAllTask");
        setTaskList(response.data.data);
    };
    const getAllComment = async () => {
        const response = await Axios.get("http://localhost:9000/getAllComment");
        setCommentList(response.data.data);
    };
    const getAllReply = async () => {
        const response = await Axios.get("http://localhost:9000/getAllReply");
        setReplyList(response.data.data);
    };

    //Converter
    const data = Object.values(tasks);

    //Get task tag
    function getHashtag(tag, id_task){
        const modal_key = "modal_tag_" + id_task;
        const modal_call = "#modal_tag_"+ id_task;

        if(tag == null){
            return (
            <span>
                <a className='btn-add-tag px-2 py-1 rounded' data-bs-toggle="collapse" href={modal_call}>
                    <FontAwesomeIcon icon="fa-solid fa-plus" /> Add Tag
                </a>
                {/* Add tag */}
                <span className="collapse" id={modal_key}>
                    <a className='box-add-tag px-2 py-1 rounded'>
                        <input className='input-tag' type='text' placeholder='#' onChange={(e) => setTag([tag, e.target.value, id_task])} onBlur={newTag} ></input>
                    </a>
                </span>
            </span>);
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
                    <a className='btn-add-tag px-2 py-1 rounded' data-bs-toggle="collapse" href={modal_call}>
                        <FontAwesomeIcon icon="fa-solid fa-plus" /> Add Tag
                    </a>
                    {/* Add tag */}
                    <span className="collapse" id={modal_key}>
                        <a className='box-add-tag px-2 py-1 rounded'>
                            <input className='input-tag' type='text' placeholder='#' onChange={(e) => setTag([tag, e.target.value, id_task])} onBlur={newTag} ></input>
                        </a>
                    </span>
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
        const modal_key = "modal_check_add" + id_task;
        const modal_call = "#modal_check_add"+ id_task;

        if(check == null){
            return (
            <span>
                <a className='btn-add-tag px-2 py-1 rounded' data-bs-toggle="collapse" href={modal_call}>
                    <FontAwesomeIcon icon="fa-solid fa-plus" /> Add Checklist
                </a>
                {/* Add check */}
                <span className="collapse" id={modal_key}>
                    <a className='box-add-tag px-2 py-1 rounded'>
                        <input className='input-tag' type='text' onChange={(e) => setCheckDetail([check, e.target.value, id_task])} onBlur={newCheck} ></input>
                    </a>
                </span>
            </span>);
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
                        const clps_key = "clpsCheck_" + id_task + "_" + index;
                        const clps_call = "#clpsCheck_"+ id_task + "_" + index;
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
                    <div className='mt-2'>
                        <a className='btn-add-tag px-2 py-1 rounded' data-bs-toggle="collapse" href={modal_call}>
                            <FontAwesomeIcon icon="fa-solid fa-plus" /> Add Checklist
                        </a>
                        {/* Add tag */}
                        <span className="collapse" id={modal_key}>
                            <a className='box-add-tag px-2 py-1 rounded'>
                                <input className='input-tag w-50' type='text' onChange={(e) => setCheckDetail([check, e.target.value, id_task])} onBlur={newCheck} ></input>
                            </a>
                        </span>
                    </div>
                </div>
            );
        }
    }

    function getCommentSet(id, id_comment, comment){
        const id_user = 1;
        const clps_reply_key = "clps_reply_comment_" + id_comment;
        const clps_reply_call = "#clps_reply_comment_"+ id_comment;

        if(id == id_user){
            const accrd_key = "accrd_comment_" + id_comment;
            const accrd_call = "#accrd_comment_"+ id_comment;
            
            const clps_del_key = "clps_del_comment_" + id_comment;
            const clps_del_call = "#clps_del_comment_"+ id_comment;
            const clps_edit_key = "clps_edit_comment_" + id_comment;
            const clps_edit_call = "#clps_edit_comment_"+ id_comment;

            return (
            <div className="position-relative" >
                <div className='mt-1 accordion' id={accrd_key}>
                    <div className='collapse' id={clps_del_key} data-bs-parent={accrd_call}>
                        {/* Delete comment */}
                        <form onSubmit={deleteComment}>
                            <button type='submit' onClick={(e) => setIdComment(id_comment)} className='btn btn-danger py-1 mt-2 w-25'>Delete</button>
                        </form>
                    </div>
                    <div className='collapse' id={clps_edit_key} data-bs-parent={accrd_call}>
                        {/* Edit comment */}
                        <form onSubmit={editComment}>
                            <textarea type="text" className="form-control edit" id="floatingInput"
                                defaultValue={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                            <button type='submit' onClick={(e) => setIdComment(id_comment)} className='btn btn-success py-1 mt-2 w-25'>Save</button>
                        </form>
                    </div>
                    <div className='collapse' id={clps_reply_key} data-bs-parent={accrd_call}>
                        {/* Show reply */}
                        {getReply(id_comment)}

                        {/* Send reply */}
                        <form onSubmit={sendReply}>
                            <input className="form-control-custom-comment my-2" placeholder="Write a reply..." onChange={(e) => setReply(e.target.value)} required></input>
                            <div className="position-relative">
                                <button className="btn btn-success py-1 mt-1" onClick={(e) => setIdComment([id, id_comment])} type='submit'>Send</button>
                                <button className="btn btn-icon py-1 mt-1 float-end" title='Attach a File'><FontAwesomeIcon icon="fa-solid fa-paperclip"/></button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='config-box'>
                    <a className="btn btn-icon-delete float-end" title='Delete' data-bs-toggle="collapse" data-bs-target={clps_del_call}>
                        <FontAwesomeIcon icon="fa-solid fa-trash-can"/></a>
                    <a className="btn btn-icon-comment float-end" title='Edit' data-bs-toggle="collapse" href={clps_edit_call}>
                        <FontAwesomeIcon icon="fa-solid fa-edit"/></a>
                    <a className="btn btn-icon-comment float-end" title='Copy' onClick={() => {navigator.clipboard.writeText(comment)}}>
                        <FontAwesomeIcon icon="fa-regular fa-copy"/></a>
                    <a className="btn btn-icon-comment float-end" title='Reply' data-bs-toggle="collapse" href={clps_reply_call}>
                        <FontAwesomeIcon icon="fa-solid fa-reply"/></a>
                </div>
            </div>);
        } else {
            const accrd_key = "accrd_comment_" + id_comment;
            const accrd_call = "#accrd_comment_"+ id_comment;

            return (
            <div className="position-relative"> {/*id={clps_key} data-bs-parent={accrd_call}*/}
                <div className='mt-1 accordion' id={accrd_key}>
                    <div className='collapse' id={clps_reply_key} data-bs-parent={accrd_call}>
                        {/* Show reply */}
                        {getReply(id_comment)}

                        {/* Send reply */}
                        <form onSubmit={sendReply}>
                            <input className="form-control-custom-comment my-2" placeholder="Write a reply..." onChange={(e) => setReply(e.target.value)} required></input>
                            <div className="position-relative">
                                <button className="btn btn-success py-1 mt-1" onClick={(e) => setIdComment([id, id_comment])} type='submit'>Send</button>
                                <button className="btn btn-icon py-1 mt-1 float-end" title='Attach a File'><FontAwesomeIcon icon="fa-solid fa-paperclip"/></button>
                            </div>
                        </form>
                    </div>
                </div>
                <a className="btn btn-icon-comment float-end" title='Copy' onClick={() => {navigator.clipboard.writeText(comment)}}>
                    <FontAwesomeIcon icon="fa-regular fa-copy"/></a>
                <a className="btn btn-icon-comment float-end" title='Reply' data-bs-toggle="collapse" href={clps_reply_call}>
                    <FontAwesomeIcon icon="fa-solid fa-reply"/></a>
            </div>);
        }
    }

    //Get comment
    function getComment(id, total){
        if(total == 0){
            return null;
        } else {
            return (
            <div>
                <h6 className='total-comment my-1'>Show {total} comment</h6>
                {
                    comments.map((val, index) => {
                        const clps_key = "clpsComment_" + val.id + "_" + index;
                        const clps_call = "#clpsComment_"+ val.id + "_" + index;

                        //Get username
                        //user id = 1 for now.
                        var username = "You";
                        if(val.id_user != 1){
                            username = val.id_user;
                        }

                        if(val.id_task == id){
                            return (
                                <div className="comment-box p-2" role="button" > {/*data-bs-toggle="collapse" data-bs-target={clps_call}*/}
                                    <div className='row'>
                                        <div className='col-1'>
                                            <img src='https://i0.wp.com/tropicsofmeta.com/wp-content/uploads/2018/08/hitler-eyes-covered.png?fit=824%2C1084&ssl=1' className='profile-image-sm'></img>
                                        </div>
                                        <div className='col-11'>
                                            <h6 className='username'>{username} <span className='comment-date text-secondary'>... minutes ago</span></h6>
                                            <a>{val.comment}</a>
                                            {/*Comment setting*/}
                                            {getCommentSet(val.id_user, val.id, val.comment)}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })
                }
            </div>);
        }
    }

    //Get reply
    function getReply(id){
        return (
        <div className='reply-holder'>
            {
                replies.map((val, index) => {

                    //Get username
                    //user id = 1 for now.
                    var username = "You";
                    if(val.id_user != 1){
                        username = val.id_user;
                    }

                    if(val.id_comment == id){
                        return (
                            <div className="reply-item p-2 ps-4" role="button" > {/*data-bs-toggle="collapse" data-bs-target={clps_call}*/}
                                <div className='row'>
                                    <div className='col-1'>
                                        <img src='https://i0.wp.com/tropicsofmeta.com/wp-content/uploads/2018/08/hitler-eyes-covered.png?fit=824%2C1084&ssl=1' className='profile-image-sm'></img>
                                    </div>
                                    <div className='col-11'>
                                        <h6 className='username'>{username} <span className='comment-date text-secondary'>... minutes ago</span></h6>
                                        <a>{val.reply}</a>
                                        <div className='config-box-reply'>
                                            <a className="btn btn-icon-comment float-end" title='Copy' onClick={() => {navigator.clipboard.writeText(val.reply)}}>
                                                <FontAwesomeIcon icon="fa-regular fa-copy"/></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })
            }
        </div>);
    }

    //Get finished button
    function getFinishedButton(id, task_status){
        if(task_status == "unfinished"){
            return (
                <form onSubmit={editStatus}>
                    <button className='btn btn-success py-1 mt-1 w-100' onClick={(e) => [setId(id), setStatus('finished')]} ><FontAwesomeIcon icon="fa-solid fa-check"/> Finish Task</button>
                </form>
            );
        } else {
            return (
                <form onSubmit={editStatus}>
                    <button className='btn btn-danger py-1 mt-1 w-100' onClick={(e) => [setId(id), setStatus('unfinished')]} ><FontAwesomeIcon icon="fa-solid fa-repeat"/> Unfinished Task</button>
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
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-12 col-sm-12'>
                                            <div className='card mb-2 p-2'>
                                                <h6>Checklist</h6>
                                                {getCheckDetail(val.task_check, val.id)}
                                            </div>
                                            <div className='card mb-2 p-2'>
                                                <h6>Prize</h6>
                                                {/* Edit prize */}
                                                <form onSubmit={editPrize}>
                                                    <input type="text" className="form-check-edit edit me-2" id="floatingInput"
                                                        defaultValue={val.task_prize} onChange={(e) => setPrize(e.target.value)}></input>
                                                    <button type='submit' onClick={(e) => setId(val.id)} className='btn btn-success py-1 mt-1 w-25' title='Save Check'>Save</button>
                                                </form>
                                            </div>
                                            <div className='card mb-2 p-2'>
                                                <h6>Due Date</h6>
                                                <div className='row'>
                                                    {/* Delete due date */}
                                                    <form onSubmit={deleteDueDate} className="form-reset-date me-2 p-2">
                                                        <button className='btn-reset-date' onClick={(e) => setId(val.id)} type='submit'><FontAwesomeIcon icon="fa-solid fa-arrows-rotate" /></button>
                                                    </form>
                                                    {/* Edit due date */}
                                                    <input type='date' className='form-control w-50 me-2' id='exampleModalLabel' defaultValue={val.due_date} onChange={(e) => setId([val.id, val.due_date, "date"])} onBlur={editDueDate}></input>
                                                    <input type='time' className='form-control timepicker' id='exampleModalLabel' defaultValue={val.due_date} onChange={(e) => setId([val.id, val.due_date, "time"])} onBlur={editDueDate}></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h6 className='position-absolute tasks-date'><FontAwesomeIcon icon="fa-regular fa-clock"/>{dateConverter(val.created_at)}</h6>
                                    <hr></hr><div className='row'>
                                        <div className='col-lg-9 col-md-12 col-sm-12'>
                                            {/* Task comment */}
                                            <div className='mb-2 p-2'>
                                                <h6>Comment</h6> 
                                                <div className='card add-comment-box p-2'>
                                                    <form onSubmit={sendComment} className="">
                                                        <input value={comment} className="form-control-custom-comment" placeholder="Write a comment..." onChange={(e) => setComment(e.target.value)} required></input>
                                                        <div className="position-relative">
                                                            <button className="btn btn-success py-1 mt-1" onClick={(e) => setId(val.id)} type='submit'>Send</button>
                                                            <button className="btn btn-icon py-1 mt-1 float-end" title='Attach a File'><FontAwesomeIcon icon="fa-solid fa-paperclip"/></button>
                                                        </div>
                                                    </form>
                                                </div>
                                                {getComment(val.id, val.total_comment)}
                                            </div>
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