import  './styles.css'

import React, { useEffect, useState } from "react";
import { Comment } from "./Comment";
import { InputForNewComment } from "./InputForNewComment";
export const Comments = props => {
    let commArray = [];
    for(let el of props.comments){
        commArray.push({...el, editMode: false, key: Math.round(Math.random()*100000)})
    }
    const [stateOfPage, setStateOfPage] = useState({comments: commArray});
    useEffect(()=>{
        setStateOfPage({
            comments: commArray
        })
    }, [props])
    return(
        <form className='show_comments_form' style={{ display: `${props.display}`}}>
            {stateOfPage.comments.map(newComment=>
            <Comment commentInfo={newComment}
            key={newComment.key}
            editMode={newComment.editMode}
            postId={props.postId}/>)}
            <InputForNewComment postId={props.postId}/>
        </form>
    )
}