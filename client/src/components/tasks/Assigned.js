import './Assigned.css';

//Assets
import tes from '../image/tes.jpg';

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck, faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import { faGift, faHashtag, faAngleDown, faXmark, faTrash, faBell } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import Draggable from 'react-draggable';

import { useState, useEffect } from "react";
import Axios from "axios";
import Isotope from "isotope-layout";
import matchesSelector from 'desandro-matches-selector';

library.add( faSquareCheck, faClock, faUser, faGift, faHashtag, faAngleDown, faXmark, faTrash, faMessage, faBell );

function Assigned() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [tasks, setTaskList] = useState([]);
    const id_key = 1; //user id for now
    const [position, setPosition] = useState({ x: 0, y: 0 });

    //Converter
    const data = Object.values(items);
    //console.log(data);

    const trackPos = (data) => {
        setPosition({ x: data.x, y: data.y });
    };
   
    useEffect(() => {
      fetch("http://localhost:9000/getAllUnfinishedTask")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result.data);
            isotopeLayout();
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

    function isotopeLayout(){
        //Isotope layout
        var grid = document.querySelector('.content-container');
        var iso = new Isotope( grid, {
            itemSelector: '.content-item',
        });
        // bind filter button click
        var filtersElem = document.querySelector('.filters-button-group');
        filtersElem.addEventListener( 'click', function( event ) {
        if ( !matchesSelector( event.target, 'button' ) ) {
            return;
        }
        var filterValue = event.target.getAttribute('data-filter');
        filterValue = filterValue;
        iso.arrange({ filter: filterValue });
        });
    }

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

    //Get task due date notif
    function getTaskDeadline(date){
        if(date != null){
            const diffInMs   = new Date(date) - new Date(Date.now())
            const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

            if((diffInDays < 1.0 )&&(diffInDays > 0)){
                if(diffInDays < 0.1){ //Ends 1 hours
                    return (
                        <a className='btn-detail tasks-icon-box text-deadline'>
                            <FontAwesomeIcon icon="fa-solid fa-bell" size='lg' /> {"Ends in " + Math.floor(diffInMs / 1000 / 60) + " min"}
                        </a>
                    ); 
                } else {
                    return ( //Ends in more than 1 hours
                        <a className='btn-detail tasks-icon-box text-deadline'>
                            <FontAwesomeIcon icon="fa-solid fa-bell" size='lg' /> {"Ends in " + Math.floor(diffInMs / 1000 / 60 / 60) + " hour"}
                        </a>
                    );
                }
            } else if(diffInDays < 0) {
                return ( //Deadline passed
                    <a className='btn-detail tasks-icon-box text-deadline'>
                        <FontAwesomeIcon icon="fa-solid fa-bell" size='lg' /> Late
                    </a>
                );
            } else {
                return null;
            }
        } else {
            return null;
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
                            <a className='btn-detail tasks-icon-box text-optional' key={index}>
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

    //Get filter config
    function getFilter_asg(assigne){
        if(assigne != null){
            return " filter-team ";
        } else {
            return " filter-mytask ";
        }
    }

    function getFilter_deadline(date){
        if(date != null){
            const diffInMs   = new Date(date) - new Date(Date.now())
            const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

            if(diffInDays < 1.0){
                return " filter-deadline";
            } else {
                return null;
            }
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
        <section id="content" className="content">
            <div className="container p-0">
                <ul id='filters' className='filters-button-group d-flex justify-content-center'>
                    <button data-filter='*' className='filter-active btn border-0 bg-transparent fw-bold'>All</button>
                    <button data-filter='.filter-mytask' className='btn border-0 bg-transparent fw-bold'>My Task</button>
                    <button data-filter='.filter-team' className='btn border-0 bg-transparent fw-bold'>Team</button>
                <button data-filter='.filter-deadline' className='btn border-0 bg-transparent fw-bold'>Deadline</button>
                    <button data-filter='.filter-pinned' className='btn border-0 bg-transparent fw-bold'>Pinned</button>
                </ul>
                <div className='row content-container'>
                    {
                        data.map((val, i, index) => {
                            //{id, created_at, updated_at}
                            //<img src={tes} className='tasks-img'></img>
                            i++;
                            const modal_call = "#open-task-"+ val.id;

                            return ( //Key still error
                                <Draggable onDrag={(e, data) => trackPos(data)}>
                                    <div key={val.id} className={'col-lg-6 col-md-6 col-sm-12 content-item ' + getFilter_asg(val.task_assigne) + getFilter_deadline(val.due_date)}>
                                        <div className='card border-0 mt-3 rounded shadow p-0 w-100 position-relative'>
                                            <button className='m-0 p-3 border-0 bg-transparent text-start' data-bs-toggle='modal' data-bs-target={modal_call}>
                                                <h6 className='position-absolute tasks-date'><FontAwesomeIcon icon="fa-regular fa-clock" />{dateConverter(val.created_at)}</h6>
                                                <h6>{val.task_title}</h6>
                                                {getTaskUrl(val.task_url)}
                                                <p className='tasks-desc'>{val.task_desc}</p>

                                                {getAssigne(val.task_assigne)}
                                                {getTaskDeadline(val.due_date)}
                                                {getCheck(val.task_check)}
                                                {getTaskPrize(val.task_prize)}
                                                {getHashtag(val.task_tag)}
                                                {getComment(val.total_comment)}
                                                {getDueDate(val.due_date)}
                                                {/* <h5>x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}</h5> */}
                                            </button>
                                        </div>
                                    </div>  
                                </Draggable>
                            );
                        })
                    }
                </div>
            </div>
        </section>
      );
    }
}
  

export default Assigned;