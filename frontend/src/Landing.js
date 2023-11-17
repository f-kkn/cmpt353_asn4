import React from 'react';
import { useState } from 'react';

function Landing(props){
    const [response, setResponse] = useState('');
    
    function checkInitButton(){
        props.update(true);
        fetch('http://localhost:8080/init', {method: 'GET',})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setResponse(data.resp)
                if (data.resp === "complete") {
                    props.update(true);
                } else {
                    props.update(false);
                }
            })
    }

    return(
        <div>
            <h1>CMPT 353 ASN 4</h1> <br/>
            <button onClick={checkInitButton}>Initialize Server: {response}</button>
        </div> 
    );
}

export default Landing;