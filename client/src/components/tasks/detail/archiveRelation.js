import '../detail/archiveRelation.css';

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRightFromBracket, faBars, faBoxArchive, faCheck } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

library.add( faPlus, faRightFromBracket, faBars, faBoxArchive, faCheck );

const id_key = 1; //user id for now

function ArchiveRelation({id_task}) {
    //Initial variable
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [archiveName, setArchiveName] = useState(""); //for archive

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("http://localhost:9000/getAllArchiveRel/"+id_key)
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
            <div className='position-relative mt-3 relation-holder'>
                <h6 className='text-success mt-1'>Archieve</h6>
                {
                    data.map((val, index)=>{
                        if(val.id_task === id_task){
                            return (
                                <div className="relation-item p-2"> {/*data-bs-toggle="collapse" data-bs-target={clps_call}*/}
                                    <button className='btn-archive-rel'>{val.archive_name}</button>
                                </div>
                            );
                        }
                    })
                }
            </div>
        );
    }
}

export default ArchiveRelation;