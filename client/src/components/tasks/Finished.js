import './Finished.css';
import { useState, useEffect } from "react";
import Axios from "axios";

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck, faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import { faGift, faHashtag, faAngleDown, faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";

//Assets
import tes from '../image/tes.jpg';


library.add( faSquareCheck, faClock, faUser, faGift, faHashtag, faAngleDown, faXmark, faTrash, faMessage );

function Finished() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [tasks, setTaskList] = useState([]);
    const id_key = 1; //user id for now

    useEffect(() => {
        fetch("http://localhost:9000/getAllFinishedTask")
            .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setItems(result.data);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    },[])

    //Converter
    const data = Object.values(items);

    //Clear all finished
    async function clearFinishedTask (e) {
        const title = e.target.value;
        
        e.preventDefault();
        try {
            await Axios.put("http://localhost:9000/clearAll/1", {});
        } catch (error) {
            console.log(error.response);
        }
    };

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
            return "Today at " + ("0" + result.getHours()).slice(-2) + ":" + ("0" + result.getMinutes()).slice(-2);
        } else if(result.toDateString() === yesterday.toDateString()){
            return "Yesterday at" + " " + ("0" + result.getHours()).slice(-2) + ":" + ("0" + result.getMinutes()).slice(-2);
        } else {
            return " " + result.getFullYear() + "/" + (result.getMonth() + 1) + "/" + ("0" + result.getDate()).slice(-2) + " " + ("0" + result.getHours()).slice(-2) + ":" + ("0" + result.getMinutes()).slice(-2);  
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

    //Get task prize
    function getTaskPrize(prize){
        if((prize != null)&&(prize != "")){
            return (
                <a className='btn-detail tasks-icon-box text-gift'>
                    <FontAwesomeIcon icon="fa-solid fa-gift" size='lg' /> {prize}
                </a>
           );
        }
    }

    //Get task person assigne
    function getAssigne(assigne){
        if(assigne == null){
            return (
                <a className='btn-detail tasks-icon-box text-participant'>
                    <FontAwesomeIcon icon="fa-regular fa-user" size='lg' /> You
                </a>
            );
        } else {
            //Converter
            const data_assigne = JSON.parse(assigne);
            // console.log(data_assigne);

            return (
                <a className='btn-detail tasks-icon-box text-participant'>
                    <FontAwesomeIcon icon="fa-regular fa-user" size='lg' /> You and {data_assigne.length} others
                </a>
            );
        }
    }

    //Get task check
    function getCheck(check){
        if((check == null )||(check == "[]")){
            return null;
        } else {
            //Converter
            let result = check.replace(/'/g, '"');
            const data_check = JSON.parse(result);
            // console.log(data_check);

            return (
                <a className='btn-detail tasks-icon-box text-check'>
                    <FontAwesomeIcon icon="fa-regular fa-square-check" size='lg' /> 0/{data_check.length} Subtasks
                </a>
            );
        }
    }

    //Get comment icon
    function getComment(total){
        if(total == 0){
            return null;
        } else {
            return (
                <a className='btn-detail tasks-icon-box text-check'>
                    <FontAwesomeIcon icon="fa-regular fa-message" /> {total} 
                </a>
            );
        }
    }

    //Get task tag
    function getHashtag(tag){
        if(tag == null){
            return null;
        } else {
            //Converter
            const data_tag = JSON.parse(tag);
            // console.log(data_tag);

            return (
                <span>
                    {
                    data_tag.map((val, index) => {
                        return (
                            <a className='btn-detail tasks-icon-box text-optional'>
                                <FontAwesomeIcon icon="fa-solid fa-hashtag" />{val.tag}
                            </a>
                        );
                    })
                    }
                </span>
            )
        }
    }

    //Get due date
    function getDueDate(datetime){
        if(datetime == null){
            return null;
        } else {
            const result = new Date(datetime);
            return (<h6 className='tasks-date mt-2 mb-0'>Due until : {result.getFullYear()}/{("0" + (result.getMonth()+1)).slice(-2)}/{("0" + result.getDate()).slice(-2)} {("0" + result.getHours()).slice(-2)}:{("0" + result.getMinutes()).slice(-2)}</h6>);
        }
    }

    //Get clear finished button
    function getClearButton(length){
        if(length > 0){
            return (
                <form onSubmit={clearFinishedTask}>
                    <button className='btn btn-link-clear text-dark' title="Clear all finished task"><FontAwesomeIcon icon="fa-solid fa-trash" /> Clear</button>
                </form>
            );
        } else {
            return null;
        }
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className='finished-box'>
                <h5>Finished 🎉</h5>
                {getClearButton(data.length)}
                <div className='task-finished-holder'>
                {
                    data.map((val, i, index) => {
                        //{id, created_at, updated_at}
                        //<img src={tes} className='tasks-img'></img>
                        i++;
                        const modal_call = "#open-task-"+ val.id;

                        return ( //Key still error
                            <div key={i} className='content-item finished-item filter-mytask'>
                                <div className='card border-0 rounded shadow p-0 w-100 position-relative'>
                                    <button className='m-0 p-2 border-0 bg-transparent text-start' data-bs-toggle='modal' data-bs-target={modal_call}>
                                        <h6 className='position-absolute finished tasks-date'><FontAwesomeIcon icon="fa-regular fa-clock" />{dateConverter(val.created_at)}</h6>
                                        <h6>{val.task_title}</h6>
                                        {getTaskUrl(val.task_url)}
                                        <p className='tasks-desc'>{val.task_desc}</p>

                                        {getAssigne(val.task_assigne)}
                                        {getCheck(val.task_check)}
                                        {getTaskPrize(val.task_prize)}
                                        {getHashtag(val.task_tag)}
                                        {getComment(val.total_comment)}
                                        {getDueDate(val.due_date)}
                                    </button>
                                </div>
                            </div>  
                        );
                    })
                }
                </div>
            </div>
        );
    }
}

export default Finished;