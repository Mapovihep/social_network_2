import React, {useState, useEffect} from 'react'
import { List } from "@mui/material"
import { Post } from "../MainPageParts/Post"
import { InputForNewPost } from "../MainPageParts/InputForNewPost"
import './styles.css'

const MainPage = props => {
    const [posts, setPosts] = useState(props.posts||[]);
    useEffect(()=>{setPosts(props.posts)}, [props])    
    return (
        <div>
            <InputForNewPost/>
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
        </div>
    );
}

export default MainPage;