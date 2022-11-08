import Assigned from './Assigned';
import Detail from './Detail';
import NewTask from './NewTask';
import Finished from './Finished';

const Tasks_Index = () => {
    return (
        <div className='container content d-block mx-auto px-1 mt-1'>
            <div className='row'>
                <div className='col-lg-9 col-md-12 col-sm-12'>
                    <Assigned/>
                    <NewTask/>
                    <Detail/>
                </div>
                <div className='col-lg-3 col-md-12 col-sm-12'>
                    <Finished/>
                </div>
            </div>
        </div>
    );
}

export default Tasks_Index;