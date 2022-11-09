//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Axios from "axios";

const GetCheckDetail = ({check_pass, id_task}) => {
    const [id, setId] = useState(""); //for task id
    const [id_check, setIdCheck] = useState(""); //for task check
    const [check_detail, setCheckDetail] = useState(""); //for task check detail

    const modal_key = "modal_check_add" + id_task;
    const modal_call = "#modal_check_add"+ id_task;

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

    if(check_pass == null){
        return (
        <span>
            <a className='btn-add-tag px-2 py-1 rounded' data-bs-toggle="collapse" href={modal_call}>
                <FontAwesomeIcon icon="fa-solid fa-plus" /> Add Checklist
            </a>
            {/* Add check */}
            <span className="collapse" id={modal_key}>
                <a className='box-add-tag px-2 py-1 rounded'>
                    <input className='input-tag' type='text' onChange={(e) => setCheckDetail([check_pass, e.target.value, id_task])} onBlur={newCheck} ></input>
                </a>
            </span>
        </span>);
    } else {
        //Converter
        let result = check_pass.replace(/'/g, '"');
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
                                            <input required type="text" defaultValue={val.detail} onBlur={(e) => setIdCheck(val.id)} onChange={(e) => setCheckDetail([e.target.value, check_pass])} 
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
                            <input className='input-tag w-50' type='text' onChange={(e) => setCheckDetail([check_pass, e.target.value, id_task])} onBlur={newCheck} ></input>
                        </a>
                    </span>
                </div>
            </div>
        );
    }
}

export default GetCheckDetail;