import { useState } from "react";
import Axios from "axios";

const GetPrize = ({prize_pass, id_task}) => {
    const [id, setId] = useState(""); //for task id
    const [prize, setPrize] = useState("");
    
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

    return (
        <form onSubmit={editPrize}>
            <input type="text" className="form-check-edit edit me-2" id="floatingInput"
                defaultValue={prize_pass} onChange={(e) => setPrize(e.target.value)}></input>
            <button type='submit' onClick={(e) => setId(id_task)} className='btn btn-success py-1 mt-1 w-25' title='Save Check'>Save</button>
        </form>
    )
    
}

export default GetPrize;