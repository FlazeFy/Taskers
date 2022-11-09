import { useState } from "react";
import Axios from "axios";

const GetDesc = ({desc_pass, id_task}) => {
    const [desc, setDesc] = useState("");
    const [id, setId] = useState(""); //for task id
    
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

    return (
        <form onSubmit={editDesc}>
            <div className='card mb-2 p-2'>
                <h6>Description</h6>
                <textarea type="text" className="form-check-edit edit" id="floatingInput"
                    defaultValue={desc_pass} onChange={(e) => setDesc(e.target.value)}></textarea>
                <button type='submit' onClick={(e) => setId(id_task)} className='btn btn-success py-1 mt-1 w-25' title='Save Check'>Save</button>
            </div>
        </form>
    )
    
}

export default GetDesc;