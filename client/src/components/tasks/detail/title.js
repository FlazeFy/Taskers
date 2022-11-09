import { useState } from "react";
import Axios from "axios";

const GetTitle = ({title_pass, id_task}) => {
    const [id, setId] = useState(""); //for task id
    
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

    return (
        <input className='form-control-custom-title mb-3' id='exampleModalLabel' defaultValue={title_pass} onChange={(e) => setId(id_task)} onBlur={editTitle}></input>
    )
    
}

export default GetTitle;