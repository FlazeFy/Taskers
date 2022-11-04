import '../detail/archiveRelation.css';

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRightFromBracket, faBars, faBoxArchive, faCheck, faAdd } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

library.add( faPlus, faRightFromBracket, faBars, faBoxArchive, faCheck, faAdd );

const id_key = 1; //user id for now

function ArchiveRelation({id_task}) {
    //Initial variable
    const [id, setId] = useState(""); //for relation id
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [archiveName, setArchiveName] = useState(""); //for archive
    const [archive, setArchiveList] = useState([]);
    const list_id = []; //For archive id in relation

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("http://localhost:9000/getAllArchiveRel/"+id_key)
        .then(res => res.json())
        .then(
        (result) => {
            setIsLoaded(true);
            setItems(result.data);
            getAllArchiveAvailable();
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

    //Fetch data.
    const getAllArchiveAvailable = async () => {
        const response = await Axios.get("http://localhost:9000/getAllArchive/"+id_key);
        setArchiveList(response.data.data);
    };

    //Delete Archive relation.
    async function deleteArchiveRel(e){
        //e.preventDefault();

        try {
            await Axios.delete("http://localhost:9000/deleteArchiveRel/"+id);
        } catch (error) {
            console.log(error.response);
        }
    }

    //Add Archive relation.
    const addArchiveRel = async (e) => {
        var id_archive = id[0];
        var task_id = id[1];

        //e.preventDefault();

        try {
            await Axios.post("http://localhost:9000/addArchiveRel/"+id_key, {
                id_archive,
                task_id
            });
        } catch (error) {
            console.log(error.response);
        }
    }

    function getArchiveMsg(len1, len2){
        if(len1 == len2){
            return (
                <p className='text-empty'>There's no available archive</p>
            );
        }
    }

    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        const clps_key = "clpsArchiveAdd_" + id_task;
        const clps_call = "#clpsArchiveAdd_"+ id_task;

        return (
            <div className='position-relative mt-3 relation-holder'>
                <h6 className='text-success mt-1'>Archieve</h6>
                {
                    data.map((val, index)=>{
                        if(val.id_task === id_task){
                            list_id.push(val.id_archive);
                            return (
                                <div className="relation-item py-2"> {/*data-bs-toggle="collapse" data-bs-target={clps_call}*/}
                                    <button className='btn-archive-rel'>{val.archive_name}</button>
                                    {/* Delete task */}
                                    <form onSubmit={deleteArchiveRel} className="position-relative">
                                        <button className="btn btn-icon-delete-archive" title='Delete' type='submit' onClick={(e) => setId(val.id)}>
                                            <FontAwesomeIcon icon="fa-solid fa-trash-can"/></button>
                                    </form>
                                </div>
                            );
                        }
                    })
                }
                {/* Add to archieve */}
                <a className='btn btn-success-outlined py-1 my-1 w-100' href="">Add to Archieve</a>
                {
                    archive.map((val, index)=>{
                        //Check if task is already in archive
                        if(list_id.some(e => e === val.id)){
                            return null;
                        } else {
                            return (
                                <div className='row'>
                                    <div className='col-9 py-1'>
                                        <h6 className='text-secondary'>{val.archive_name}</h6>
                                    </div>
                                    <div className='col-2'>
                                        {/*Add task to archive*/}
                                        <form onSubmit={addArchiveRel}>
                                            <button type="submit" className='btn btn-success py-0 px-1' onClick={(e) => setId([val.id, id_task])}  title={'Add task to ' + val.archive_name}><FontAwesomeIcon icon="fa-solid fa-add"/></button>
                                        </form>
                                    </div>
                                </div>
                            );
                        }   
                    })
                }
                {getArchiveMsg(archive.length, list_id.length)}
            </div>
        );
    }
}

export default ArchiveRelation;