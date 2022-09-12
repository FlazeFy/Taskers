import './Navbar.css';

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRightFromBracket, faBars } from "@fortawesome/free-solid-svg-icons";

library.add( faPlus, faRightFromBracket, faBars );

const Navbar = () => {
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
            <span className='position-absolute btn-wrap-task'>
                <button className='btn-task' title='Add New Task' data-bs-toggle='modal' data-bs-target='#new_task_modal'><FontAwesomeIcon icon="fa-plus" /></button>
            </span>
            <span className='position-absolute btn-wrap-sign-out'>
                <button className='btn-sign-out' title='Sign Out'><FontAwesomeIcon icon="fa-right-from-bracket" /></button>
            </span>
        </div>
    );
}

export default Navbar;