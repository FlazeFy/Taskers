//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Axios from "axios";

const GetHashtag = ({tag_pass, id_task}) => {
    const [tag_detail, setTagDetail] = useState(""); //for task tag detail
    const [tag, setTag] = useState(""); //for new task tag
    
    const modal_key = "modal_tag_" + id_task;
    const modal_call = "#modal_tag_"+ id_task;

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

    if(tag_pass == null){
        return (
        <span>
            <a className='btn-add-tag px-2 py-1 rounded' data-bs-toggle="collapse" href={modal_call}>
                <FontAwesomeIcon icon="fa-solid fa-plus" /> Add Tag
            </a>
            {/* Add tag */}
            <span className="collapse" id={modal_key}>
                <a className='box-add-tag px-2 py-1 rounded'>
                    <input className='input-tag' type='text' placeholder='#' onChange={(e) => setTag([tag_pass, e.target.value, id_task])} onBlur={newTag} ></input>
                </a>
            </span>
        </span>);
    } else {
        //Converter
        const data_tag = JSON.parse(tag_pass);

        // console.log(data_tag);

        return (
            <span>
                {
                data_tag.map((val, index) => {
                    return (
                        <span className='box-tag' key={index}>
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
                        <input className='input-tag' type='text' placeholder='#' onChange={(e) => setTag([tag_pass, e.target.value, id_task])} onBlur={newTag} ></input>
                    </a>
                </span>
            </span>
        )
    }
}

export default GetHashtag;