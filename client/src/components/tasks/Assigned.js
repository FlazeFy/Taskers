import './Assigned.css';

//Assets
import tes from '../image/tes.jpg';

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck, faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import { faGift, faHashtag, faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import Axios from "axios";

library.add( faSquareCheck, faClock, faUser, faGift, faHashtag, faAngleDown );

const Assigned = () => {
    //Initial variable
    const [tasks, setTaskList] = useState([]);

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
    console.log(data[2]);

    //Date convert
    function dateConverter(datetime){
        const result = new Date(datetime);
        const now = new Date();
        
        //FIx this!!!
        if(result.getFullYear + "" + (result.getMonth + 1) + "" + result.getDate == now.getFullYear + "" + (now.getMonth + 1) + "" + now.getDate){
            return " " + result.getFullYear() + "/" + (result.getMonth() + 1) + "/" + result.getDate() + " " + result.getHours() + ":" + result.getMinutes();    
        } else {
            return " " + result.getHours() + ":" + result.getMinutes();    
        }
    }

    //Show task image
    function getTaskUrl(url){
        if(url != null){
            return (<img src={tes} className='tasks-img'></img>);
        } else {
            return null
        }
    }

    //Show task image
    function getTaskPrize(prize){
        if(prize != null){
           return (
                <button className='card tasks-icon-box text-gift'>
                    <FontAwesomeIcon icon="fa-solid fa-gift" size='lg' /> Rp. 20K
                </button>
           );
        }
    }

    return (
        <div className='container'>
            <h6 className='text-center'>(4) My Task</h6>
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <div className='row px-2'>
                        {
                            data.map((val, index) => {
                                //{id, created_at, updated_at}
                                //<img src={tes} className='tasks-img'></img>
                                return (
                                    <div className='card border-0 mt-3 rounded shadow p-0 w-100 position-relative'>
                                        <button className='m-0 p-3 border-0 bg-transparent text-start' type='submit'>
                                            <h6 className='position-absolute tasks-date'><FontAwesomeIcon icon="fa-regular fa-clock" />{dateConverter(val.created_at)}</h6>
                                            <h6>{val.task_title}</h6>
                                            {getTaskUrl(val.task_url)}
                                            <p className='tasks-desc'>{val.task_desc}</p>

                                            <button className='card tasks-icon-box text-participant'>
                                                <FontAwesomeIcon icon="fa-regular fa-user" size='lg' /> You and 4 other
                                            </button>
                                            <button className='card tasks-icon-box text-check'>
                                                <FontAwesomeIcon icon="fa-regular fa-square-check" size='lg' /> 0/2 Subtasks
                                            </button>
                                            {getTaskPrize(val.task_prize)}
                                            <button className='card tasks-icon-box text-optional'>
                                                <FontAwesomeIcon icon="fa-solid fa-hashtag" />Optional
                                            </button>
                                            <button className='card tasks-icon-box text-optional'>
                                                <FontAwesomeIcon icon="fa-solid fa-hashtag" />Housework
                                            </button>

                                        </button>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    
                </div>
            </div>
            <button className='btn-more-content'><FontAwesomeIcon icon="fa-solid fa-angle-down" /> Show More</button>
        </div>
    );
}

export default Assigned;