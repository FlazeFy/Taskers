import './Navbar.css';

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRightFromBracket, faBars, faBoxArchive, faCheck } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { Outlet, Link } from "react-router-dom";

library.add( faPlus, faRightFromBracket, faBars, faBoxArchive, faCheck );

const id_key = 1; //user id for now

function Navbar() {
    //Initial variable
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [archiveName, setArchiveName] = useState(""); //for archive

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("http://localhost:9000/getAllArchive/"+id_key)
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

    //Create new archive
    const newArchive = async (e) => {
        try {
            await Axios.post("http://localhost:9000/insertArchive", {
                archiveName,
                id_key
            });
        } catch (error) {
            console.log(error.response);
        }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {

        return (
            <div className='position-relative'>
                <nav className='navbar navbar-expand-lg navbar-light'>
                    <div className='container-fluid ps-5'>
                        <b className='navbar-brand' href='#'>Taskers</b>
                        <button className='navbar-toggler border-0 btn-more p-0' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                            <span className='btn-more-inner'><FontAwesomeIcon icon="fa-bars" size='lg' /></span>
                        </button>
                        <div className='collapse navbar-collapse' id='navbarNav'>
                            <ul className='navbar-nav'>
                                <li className='nav-item text-center'>
                                    <a className='nav-link' aria-current='page'><Link to="/tasks">Tasks</Link></a>
                                </li>
                                <li className='nav-item text-center'>
                                    <a className='nav-link'><Link to="/calendar">Calendar</Link></a>
                                </li>
                                <li className='nav-item text-center'>
                                    <a className='nav-link'><Link to="/teams">Teams</Link></a>
                                </li>
                                <li className='nav-item text-center'>
                                    <a className='nav-link'><Link to="/archive">Archive</Link></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <span className='position-absolute btn-wrap-archieve'>
                    <button className='btn-archieve' title='Open Archieve' type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"><FontAwesomeIcon icon="fa-solid fa-box-archive" /></button>
                    <ul className="dropdown-menu p-2" aria-labelledby="dropdownMenuButton1">
                        <form action="" method="POST">
                            {
                                data.map((val, i) => {
                                    return(
                                        <li className='mb-1'><input hidden name="archive_name" value=""></input><button className="dropdown-item rounded" type="submit"> {val.archive_name}</button></li>
                                    );
                                })
                            }
                        </form>
                        <span className="collapse" id="add-archive">
                            <input className="input-tag w-100 mb-1 py-1" type="text" onChange={(e) => setArchiveName([e.target.value])} onBlur={newArchive} name="archive_name"></input>
                        </span>
                        <li><a className="dropdown-item btn-add-new-archieve rounded" data-bs-toggle="collapse" href="#add-archive"> Add New Archieve</a></li>
                    </ul>
                </span>
                <span className='position-absolute btn-wrap-task'>
                    <button className='btn-task' title='Add New Task' data-bs-toggle='modal' data-bs-target='#new_task_modal'><FontAwesomeIcon icon="fa-plus" /></button>
                </span>
                <span className='position-absolute btn-wrap-sign-out'>
                    <button className='btn-sign-out' title='Sign Out'><FontAwesomeIcon icon="fa-right-from-bracket" /></button>
                </span>
                <div className='container d-block mx-auto px-1'>
                    <Outlet />
                </div>
            </div>
        );
    }
}

export default Navbar;