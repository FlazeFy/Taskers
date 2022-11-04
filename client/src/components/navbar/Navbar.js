import './Navbar.css';

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRightFromBracket, faBars, faBoxArchive, faCheck } from "@fortawesome/free-solid-svg-icons";

library.add( faPlus, faRightFromBracket, faBars, faBoxArchive, faCheck );

const id_key = 1; //user id for now

function Navbar() {
    //Initial variable
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

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

    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {

        return (
            <div className='position-relative'>
                <nav className='navbar navbar-expand-lg navbar-light'>
                    <div className='container-fluid'>
                        <b className='navbar-brand' href='#'>Taskers</b>
                        <button className='navbar-toggler border-0 btn-more p-0' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                            <span className='btn-more-inner'><FontAwesomeIcon icon="fa-bars" size='lg' /></span>
                        </button>
                        <div className='collapse navbar-collapse' id='navbarNav'>
                            <ul className='navbar-nav'>
                                <li className='nav-item text-center'>
                                    <a className='nav-link active' aria-current='page' href='#'>Tasks</a>
                                </li>
                                <li className='nav-item text-center'>
                                    <a className='nav-link' href='#'>Calendar</a>
                                </li>
                                <li className='nav-item text-center'>
                                    <a className='nav-link' href='#'>Teams</a>
                                </li>
                                <li className='nav-item text-center'>
                                    <a className='nav-link' href='#'>Rewards</a>
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
                                        <li><input hidden name="archive_name" value=""></input><button className="dropdown-item" type="submit"> {val.archive_name}</button></li>
                                    );
                                })
                            }
                        </form>
                        <form action="" method="POST">
                            <li><button className="dropdown-item btn-add-new-archieve" type="submit"> Add New Archieve</button></li>
                        </form>
                    </ul>
                </span>
                <span className='position-absolute btn-wrap-task'>
                    <button className='btn-task' title='Add New Task' data-bs-toggle='modal' data-bs-target='#new_task_modal'><FontAwesomeIcon icon="fa-plus" /></button>
                </span>
                <span className='position-absolute btn-wrap-sign-out'>
                    <button className='btn-sign-out' title='Sign Out'><FontAwesomeIcon icon="fa-right-from-bracket" /></button>
                </span>
            </div>
        );
    }
}

export default Navbar;