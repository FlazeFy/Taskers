import Navbar from '../navbar/Navbar';
import Assigned from './Assigned';

const Tasks_Index = (props) => {
    console.log(props);
    return (
        <div className='container d-block mx-auto p-1 mt-1'>
            <Navbar/>
            <Assigned dataTask={props.dataTask}/>
        </div>
    );
}

export default Tasks_Index;