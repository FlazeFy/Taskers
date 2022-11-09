import { useState } from "react";
import Axios from "axios";

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRightFromBracket, faBars, faArrowsRotate, faPaperclip, faEdit, faTrashCan, faReply, faRepeat, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

library.add( faPlus, faRightFromBracket, faBars, faArrowsRotate, faPaperclip, faEdit, faTrashCan, faCopy, faReply, faRepeat, faCheck );

const GetDueDate = ({duedate_pass, id_task}) => {
    const [id, setId] = useState(""); //for task id
    const [prize, setPrize] = useState("");
    
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
            due_date = due_date_new + " " + ("0" + due_date_old.getHours()).slice(-2) + ":" + ("0" + due_date_old.getMinutes());
        } else {
            due_date = due_date_old.getFullYear() + "-" + ("0" + (due_date_old.getMonth()+1)).slice(-2) + "-" + ("0" + due_date_old.getDate()).slice(-2) + " " + due_date_new;
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

    return (
        <div className='row'>
            {/* Delete due date */}
            <form onSubmit={deleteDueDate} className="form-reset-date me-2 p-2">
                <button className='btn-reset-date' onClick={(e) => setId(id_task)} type='submit'><FontAwesomeIcon icon="fa-solid fa-arrows-rotate" /></button>
            </form>
            {/* Edit due date */}
            <input type='date' className='form-control w-50 me-2' id='exampleModalLabel' defaultValue={duedate_pass} onChange={(e) => setId([id_task, duedate_pass, "date"])} onBlur={editDueDate}></input>
            <input type='time' className='form-control timepicker' id='exampleModalLabel' defaultValue={duedate_pass} onChange={(e) => setId([id_task, duedate_pass, "time"])} onBlur={editDueDate}></input>
        </div>
    )
    
}

export default GetDueDate;