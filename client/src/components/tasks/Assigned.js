import './Assigned.css';

//Assets
import tes from '../image/tes.jpg';

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck, faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import { faGift, faHashtag, faAngleDown } from "@fortawesome/free-solid-svg-icons";


library.add( faSquareCheck, faClock, faUser, faGift, faHashtag, faAngleDown );

const Assigned = (props) => {
    //console.log(props);

    return (
        <div className='container'>
            <h6 className='text-center'>(4) My Task</h6>
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <div className='row px-2'>
                        {
                            props.map((val, key) => {
                                //{id, created_at, updated_at}
                                return (
                                    <div className='card border-0 mt-3 rounded shadow p-0 w-100 position-relative'>
                                        <button className='m-0 p-3 border-0 bg-transparent text-start' type='submit'>
                                            <h6 className='position-absolute tasks-date'><FontAwesomeIcon icon="fa-regular fa-clock" /> 4 min ago</h6>
                                            <h6>Clean the bedroom</h6>
                                            <img src={tes} className='tasks-img'></img>
                                            <p className='tasks-desc'>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            </p>

                                            <button className='card tasks-icon-box text-participant'>
                                                <FontAwesomeIcon icon="fa-regular fa-user" size='lg' /> You and 4 other
                                            </button>
                                            <button className='card tasks-icon-box text-check'>
                                                <FontAwesomeIcon icon="fa-regular fa-square-check" size='lg' /> 0/2 Subtasks
                                            </button>
                                            <button className='card tasks-icon-box text-gift'>
                                                <FontAwesomeIcon icon="fa-solid fa-gift" size='lg' /> Rp. 20K
                                            </button>
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