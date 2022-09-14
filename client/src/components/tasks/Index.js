import Navbar from '../navbar/Navbar';
import Assigned from './Assigned';
import Detail from './Detail';
import NewTask from './NewTask';

const Tasks_Index = () => {
    return (
        <div className='container d-block mx-auto p-1 mt-1'>
            <Navbar/>
            <Assigned/>
            <NewTask/>
            <Detail/>
        </div>
    );
}

export default Tasks_Index;