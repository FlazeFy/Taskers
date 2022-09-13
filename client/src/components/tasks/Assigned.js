import './Assigned.css';

//Assets
import tes from '../image/tes.jpg';

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck, faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import { faGift, faHashtag, faAngleDown, faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import Axios from "axios";
import Isotope from "isotope-layout";
import matchesSelector from 'desandro-matches-selector';

library.add( faSquareCheck, faClock, faUser, faGift, faHashtag, faAngleDown, faXmark, faTrash );

const Assigned = () => {
    //Isotope layout
    // var grid = document.querySelector('.content-container');
    // var iso = new Isotope( grid, {
    //     itemSelector: '.content-item',
    // });
    // // bind filter button click
    // var filtersElem = document.querySelector('.filters-button-group');
    // filtersElem.addEventListener( 'click', function( event ) {
    // if ( !matchesSelector( event.target, 'button' ) ) {
    //     return;
    // }
    // var filterValue = event.target.getAttribute('data-filter');
    // filterValue = filterValue;
    // iso.arrange({ filter: filterValue });
    // });

    //Initial variable
    const [tasks, setTaskList] = useState([]);
    const id_key = 1; //user id for now

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
    //console.log(data);

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
            return "Today at " + result.getHours() + ":" + result.getMinutes();
        } else if(result.toDateString() === yesterday.toDateString()){
            return "Yesterday at" + " " + result.getHours() + ":" + result.getMinutes();
        } else {
            return " " + result.getFullYear() + "/" + (result.getMonth() + 1) + "/" + result.getDate() + " " + result.getHours() + ":" + result.getMinutes();  
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
        if(prize != null){
           return (
                <a className='btn-detail tasks-icon-box text-gift'>
                    <FontAwesomeIcon icon="fa-solid fa-gift" size='lg' /> Rp. 20K
                </a>
           );
        }
    }

    //Get task person assigne
    function getAssigne(assigne){
        if(assigne == id_key){
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
                    <FontAwesomeIcon icon="fa-regular fa-user" size='lg' /> You and {data_assigne.length - 1} others
                </a>
            );
        }
    }

    //Get task check
    function getCheck(check){
        if(check == null){
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

    //Get task tag msg
    function getMsgNull(val){
        if(val == null){
            return (
                <h6 className='fw-bold'>-</h6>
            );
        }
    }

    //Get check detail
    function getCheckDetail(check, id_task){
        if(check == null){
            return null;
        } else {
            //Converter
            let result = check.replace(/'/g, '"');
            const data_check_d = JSON.parse(result);
            console.log(data_check_d);

            const accrd_key = "accrd_check_" + id_task;
            const accrd_call = "#accrd_check_"+ id_task;

            return (
                <div className='accordion ps-3' id={accrd_key}>
                    {
                    data_check_d.map((val, index) => {
                        const clps_key = "clpsCheck_" + id_task + "_" + val.id;
                        const clps_call = "#clpsCheck_"+ id_task + "_" + val.id;
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
                                            <input required type="text" className="form-check-edit w-100 mb-3" id="floatingInput" 
                                                placeholder={val.detail}></input>
                                            <button type='submit' className='btn btn-success py-1' title='Save Check'>Save</button>
                                            <a className='btn-close-clps ms-3'><FontAwesomeIcon icon="fa-solid fa-xmark" size='lg' /></a>
                                            <a className='btn-delete-check position-absolute' title='Delete Check'><FontAwesomeIcon icon="fa-solid fa-trash" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    }
                </div>
            );
        }
    }

    return (
        <section id="content" className="content">
            <div className="container">
                <h6 className=''>({data.length}) All Task</h6>
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
                            const modal_id = "open-task-"+ val.id;
                            const modal_call = "#open-task-"+ val.id;

                            return ( //Key still error
                                <div key={i} className='col-lg-6 col-md-6 col-sm-12 content-item filter-mytask'>
                                    <div className='card border-0 mt-3 rounded shadow p-0 w-100 position-relative'>
                                        <button className='m-0 p-3 border-0 bg-transparent text-start' data-bs-toggle='modal' data-bs-target={modal_call}>
                                            <h6 className='position-absolute tasks-date'><FontAwesomeIcon icon="fa-regular fa-clock" />{dateConverter(val.created_at)}</h6>
                                            <h6>{val.task_title}</h6>
                                            {getTaskUrl(val.task_url)}
                                            <p className='tasks-desc'>{val.task_desc}</p>

                                            {getAssigne(val.task_assigne)}
                                            {getCheck(val.task_check)}
                                            {getTaskPrize(val.task_prize)}
                                            {getHashtag(val.task_tag)}

                                        </button>
                                    </div>
                                    <div className='modal fade' id={modal_id} aria-labelledby='exampleModalLabel' aria-hidden='true'>
                                        <div className='modal-dialog  modal-lg'>
                                            <div className='modal-content border-0'>
                                                <div className='modal-body position-relative px-3 py-4'>
                                                    <button type='button' className='btn-close position-absolute' data-bs-dismiss='modal' aria-label='Close'></button>
                                                    <h5 className='modal-title my-3 text-center' id='exampleModalLabel'>{val.task_title}</h5>
                                                    <div className='row'>
                                                        <div className='col-lg-6 col-md-12 col-sm-12'>
                                                            <div className='card p-2'>
                                                                <h6>Description</h6>
                                                                <textarea type="text" className="form-check-edit" id="floatingInput"
                                                                    placeholder={val.task_desc}></textarea>
                                                                <button type='submit' className='btn btn-success py-1 mt-1 w-25' title='Save Check'>Save</button>
                                                            </div>
                                                            <div className='card mt-2 p-2'>
                                                                <h6>Tags</h6>
                                                                {getHashtag(val.task_tag)}
                                                                {getMsgNull(val.task_tag)}
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-6 col-md-12 col-sm-12'>
                                                            <div className='card p-2'>
                                                                <h6>Checklist</h6>
                                                                {getCheckDetail(val.task_check, val.id)}
                                                                {getMsgNull(val.task_check)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h6 className='position-absolute tasks-date'><FontAwesomeIcon icon="fa-regular fa-clock" />{dateConverter(val.created_at)}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>  
                            );
                        })
                    }
                </div>
                <button className='btn-more-content'><FontAwesomeIcon icon="fa-solid fa-angle-down" /> Show More</button>
            </div>
        </section>
    );
}

export default Assigned;