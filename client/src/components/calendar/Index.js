import Day from "./Day";
import DayDetail from "./DayDetail";


const Calendar_Index = () => {
    return (
        <div className='container d-block mx-auto p-1 mt-1'>
            <div className='row'>
                <div className='col-lg-7 col-md-12 col-sm-12'>
                    <Day />
                </div>
                <div className='col-lg-5 col-md-12 col-sm-12'>
                    <DayDetail />
                </div>
            </div>
        </div>
    );
}

export default Calendar_Index;