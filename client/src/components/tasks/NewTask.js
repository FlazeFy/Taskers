import './NewTask.css';

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faSquareCheck, faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faTrash, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";


import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState, useEffect } from "react";
import Axios from "axios";
import {firestore} from "../../firebase";

library.add( faTrash, faPlus, faArrowsRotate );

const NewTask = () => {
    //Initial variable
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [prize, setPrize] = useState("");
    const [checklist, setChecklist] = useState([{}]);
    const [taglist, setTaglist] = useState([{}]);
    const [attach, setAttList] = useState([{}]);
    const [imgUrl, setImgUrl] = useState([]);
    const [uploadFile, setUploadFile] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    //Attachment
    const handleAddAtt = () => {
        setAttList([...attach, {}]);
    };

    const handleRemoveAtt = (index) => {
        const list = [...attach];
        list.splice(index, 1);
        setAttList(list);
    };

    const handleRemoveAllAtt = () => {
        const list = [];
        setAttList(list);
    };

    //Checklist.
    const handleAddCheck = () => {
        setChecklist([...checklist, {}]);
    };

    const handleRemoveCheck = (index) => {
        const list = [...checklist];
        list.splice(index, 1);
        setChecklist(list);
    };

    const handleRemoveAllCheck = () => {
        const list = [];
        setChecklist(list);
    };

    const handleCheckChange = (e, index) => {
        const { detail, value } = e.target;
        const list = [...checklist];
        list[index].id = index + 1;
        list[index].detail = value;
        setChecklist(list);
    };

    //Tag.
    const handleAddTag = () => {
        setTaglist([...taglist, {}]);
    };

    const handleRemoveTag = (index) => {
        const list = [...taglist];
        list.splice(index, 1);
        setTaglist(list);
    };

    const handleRemoveAllTag = () => {
        const list = [];
        setTaglist(list);
    };

    const handleTagChange = (e, index) => {
        const { tag, value } = e.target;
        const list = [...taglist];
        list[index].tag = value;
        setTaglist(list);
    };

    const addNewTask = async (e) => {
        console.log(checklist.length);
        var check = checklist;
        var tag = taglist;

        e.preventDefault();
        try {
            await Axios.post("http://localhost:9000/insertTask/1", {
                title,
                desc,
                prize,
                check,
                tag
            });
        } catch (error) {
            console.log(error.response);
        }
    };

    const handleSubmit = (e) => {
        // e.preventDefault();
        const file = uploadFile;
    
        if (!file) return;
    
        const storageRef = ref(storage, `task/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImgUrl(downloadURL)
                });
            }
        );
      }
    
    const id_key = 1; //user id for now

    return (
        <div className='modal fade' id='new_task_modal' aria-labelledby='exampleModalLabel' aria-hidden='true'>
            <div className='modal-dialog modal-lg'>
                <div className='modal-content border-0'>
                    <div className='modal-body position-relative px-3 py-4'>
                        <button type='button' className='btn-close position-absolute' data-bs-dismiss='modal' aria-label='Close'></button>
                        <h5 className='modal-title my-3 text-center' id='exampleModalLabel'>Add New Task</h5>
                        <form onSubmit={addNewTask}>
                            <div className='row'>
                                <div className='col-lg-6 col-md-12 col-sm-12'>
                                    <div className="form-floating mb-3">
                                        <input required type="text" className="form-control px-3" id="floatingInput" 
                                            value={title} onChange={(e) => setTitle(e.target.value[0])}></input>
                                        <label className='px-3'> Task Title</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <textarea type="text" className="form-control px-3" id="floatingInput"
                                            value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                                        <label className='px-3'> Description</label>
                                        <span className='position-absolute input-info-desc'>Optional</span>
                                    </div>
                                    <div className="form-floating mb-3 position-relative">
                                        <input type="text" className="form-control px-3" id="floatingInput"
                                            value={prize} onChange={(e) => setPrize(e.target.value)}></input>
                                        <label className='px-3'> Prize/Result </label>
                                        <span className='position-absolute input-info-price'>Optional</span>
                                    </div>
                                    <h6>Attachment</h6>
                                    {
                                        attach.map((singleService, index) => (
                                            <div className='row mb-1' key={index}>
                                                <div className='col-10'>
                                                    <input type="file" className="form-control" onChange={(e) => setUploadFile(e.target.files)} onBlur={(e)=> handleSubmit()}></input>
                                                </div>
                                                <div className='col-2'>
                                                    <a className='btn btn-delete h-75 w-75' title='Delete' onClick={handleRemoveAtt}><FontAwesomeIcon icon="fa-solid fa-trash" /></a>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <a id='btn_add_att' className='btn-add-new' onClick={handleAddAtt}><FontAwesomeIcon icon="fa-solid fa-add" /> Add Attachment</a>
                                    <a id='btn_reset_att' className='btn-reset' onClick={handleRemoveAllAtt}><FontAwesomeIcon icon="fa-solid fa-arrows-rotate" /> Reset Attachment</a>

                                    {
                                        !imgUrl &&
                                        <div className='outerbar'>
                                        <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                                        </div>
                                    }
                                    {
                                        imgUrl &&
                                        <img src={imgUrl} alt='uploaded file' height={200} />
                                    }
                                </div>
                                <div className='col-lg-6 col-md-12 col-sm-12'>
                                    <h6>Checklist</h6>
                                    <div id='checklist_holder'>
                                        {checklist.map((singleService, index) => (
                                        <div className='row' key={index}>
                                            <div className='col-10'>
                                                <div className="form-floating mb-2">
                                                    <input type="text" className="form-control px-3" id="floatingInput" required
                                                        onChange={(e) => handleCheckChange(e, index)}></input>
                                                    <label className='px-3'><b>#{index+1}</b> Checklist Name</label>
                                                </div>
                                            </div>
                                            <div className='col-2 p-2'>
                                                <a className='btn btn-delete h-75 w-75' title='Delete' onClick={handleRemoveCheck}><FontAwesomeIcon icon="fa-solid fa-trash" /></a>
                                            </div>
                                        </div>))}
                                    </div>
                                    <a id='btn_add_check' className='btn-add-new' onClick={handleAddCheck}><FontAwesomeIcon icon="fa-solid fa-add" /> Add New Check</a>
                                    <a id='btn_reset_check' className='btn-reset' onClick={handleRemoveAllCheck}><FontAwesomeIcon icon="fa-solid fa-arrows-rotate" /> Reset Checklist</a>

                                    <hr></hr>
                                    <h6>Tags</h6>
                                    <div id='tags_holder'>
                                        {taglist.map((singleService, index) => (
                                        <div className='row' key={index}>
                                            <div className='col-10'>
                                                <div className="form-floating mb-2 position-relative">
                                                    <input type="text" className="form-control px-4" id="floatingInput" required
                                                        onChange={(e) => handleTagChange(e, index)}></input>
                                                    <label className='px-3'>Tag Name</label>
                                                    <span className='px-3 position-absolute tags-icon'>#</span>
                                                </div>
                                            </div>
                                            <div className='col-2 p-2'>
                                                <a className='btn btn-delete h-75 w-75' title='Delete' onClick={handleRemoveTag}><FontAwesomeIcon icon="fa-solid fa-trash" /></a>
                                            </div>
                                        </div>))}
                                    </div>
                                    <a id='btn_add_tag' className='btn-add-new' onClick={handleAddTag}><FontAwesomeIcon icon="fa-solid fa-add" /> Add New Tag</a>
                                    <a id='btn_reset_tag' className='btn-reset' onClick={handleRemoveAllTag}><FontAwesomeIcon icon="fa-solid fa-arrows-rotate" /> Reset Tags</a>
                                </div>
                            </div>
                        <button type='submit' className='btn btn-success float-end' title='Save Task'><FontAwesomeIcon icon="fa-solid fa-add" /> Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewTask;