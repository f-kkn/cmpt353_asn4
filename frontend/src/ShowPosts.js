import React from "react";
import { useState, useEffect } from "react";

function Showposts(){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/sendToClient", {method: "GET"})
            .then(resp => resp.json())
            .then(data => { setPosts(data); })
    }, []);

    return(
        <>
        {posts.map(post => (
            <div className="container">
                <h3> ID : {post.id} </h3>
                <h3> Topic : {post.topic} </h3>
                <h3> Message: {post.data} </h3>
            </div>
        ))}
        </>
    );
}

export default Showposts;