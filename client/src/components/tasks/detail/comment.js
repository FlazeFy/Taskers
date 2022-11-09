import { useState, useEffect } from "react";
import Axios from "axios";
//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRightFromBracket, faBars, faArrowsRotate, faPaperclip, faEdit, faTrashCan, faReply, faRepeat, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

library.add( faPlus, faRightFromBracket, faBars, faArrowsRotate, faPaperclip, faEdit, faTrashCan, faCopy, faReply, faRepeat, faCheck );

const GetComment = ({totalcomment_pass, id_task}) => {
    const [id, setId] = useState(""); //for task id
    const [id_comment, setIdComment] = useState("");
    const [replies, setReplyList] = useState([]); 
    const [comments, setCommentList] = useState([]);
    const [comment, setComment] = useState("");
    const [reply, setReply] = useState("");

    useEffect(() => {
        getAllComment();
        getAllReply();
    }, []);


    const getAllComment = async () => {
        const response = await Axios.get("http://localhost:9000/getAllComment");
        setCommentList(response.data.data);
    };
    const getAllReply = async () => {
        const response = await Axios.get("http://localhost:9000/getAllReply");
        setReplyList(response.data.data);
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
    function getListComment(id, total){
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

    return (
        <div className='mb-2 p-2'>
            <h6>Comment</h6> 
            <div className='card add-comment-box p-2'>
                <form onSubmit={sendComment} className="">
                    <input value={comment} className="form-control-custom-comment" placeholder="Write a comment..." onChange={(e) => setComment(e.target.value)} required></input>
                    <div className="position-relative">
                        <button className="btn btn-success py-1 mt-1" onClick={(e) => setId(id_task)} type='submit'>Send</button>
                        <button className="btn btn-icon py-1 mt-1 float-end" title='Attach a File'><FontAwesomeIcon icon="fa-solid fa-paperclip"/></button>
                    </div>
                </form>
            </div>
            {getListComment(id_task, totalcomment_pass)}
        </div>
    )
    
}

export default GetComment;