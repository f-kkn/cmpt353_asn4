import React from "react";
import { useState } from "react";

function Addposts(){
    const [title, setTitle] = useState("");
    const [data, setData] = useState("");

    function addAPost(){
        fetch('http://localhost:8080/sendToDB',{
            method:'POST',
            body: `postTopic=${title}&postMsg=${data}`,
            headers: {'Content-type': 'application/x-www-form-urlencoded'}
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
        });
    }

    return(
        <>
            <h3>Add a Post</h3>
            <div>
                <input 
                    type="text"
                    placeholder="Topic here!"
                    value={title}
                    onChange={e => setTitle(e.target.value)}/><br/>

                <input
                    type="text"
                    placeholder="Data here!"
                    value={data}
                    onChange={e => setData(e.target.value)}/><br/>

                <button onClick={addAPost}> Send </button>
            </div>
        </>
    );
}

export default Addposts;