import React, { useState } from 'react'
import axios from "axios";

const FileUpload = (props) => {
    const [upstate, setUpstate] = useState(false);
    const [fupstate, setfUpstate] = useState(false);

    const handleFileChange = (e) => {
        setfUpstate(e.target.files[0])
    };

    const uploadFile = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append("file", fupstate);
            const response = await axios.post("http://" + window.location.hostname + ":8001/file/" + props.scheduleID + "f@j" + props.label, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setUpstate(true)
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    return (
        <>
        <div style={{ display: "flex" }}>
            <div className='fileuploa'>
                <div>
                    <label style={{ marginRight: "20px" }} className="text-input-label">{props.label + " :"}</label>
                    <input type="file" name={props.label} onChange={handleFileChange} />
                </div>
                <div> <button className='upbtn' onClick={uploadFile}>upload</button>
                    {upstate ? <label className='d' >done</label> : <label className='nd' >not done</label>}
                </div>
            </div>
        </div>
        <br></br>
        </>
    );
}
FileUpload.displayName = "FileUpload";
export default FileUpload