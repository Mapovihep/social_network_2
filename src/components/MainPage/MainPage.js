import React, {useState, useEffect} from 'react'
import { List } from "@mui/material"
import { Post } from "../MainPageParts/Post"
import { InputForNewForm } from "../MainPageParts/InputForNewForm"
import './styles.css'
import { Outlet } from "react-router"

const MainPage = props => {
    const [posts, setPosts] = useState(props.posts||[]);
    useEffect(()=>{setPosts(props.posts)}, [props])    
    return (
        <div>
            <InputForNewForm/>
            <span 
            style={{display: "inline-block",
            width:"100px", fontSize: "30px",
            paddingLeft: "30px"
            }}>{posts.length}</span>
            <List className='container_MainPage'>
                {posts.map(newPost=> 
            <Post className='post_MainPage'
            postInfo={newPost}
            key={Math.random()}>
            </Post>)}
            </List>
            <Outlet /> 
        </div>
    );
}

export default MainPage;