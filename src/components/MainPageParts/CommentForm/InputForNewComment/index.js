import  './styles.css'

import { Button, Input } from "@mui/material"
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_COMMENT_FETCH } from "../../../../actions/SagaActions";

export const InputForNewComment = props =>{
    const dispatch = useDispatch();
    const [newComment, setNewComment] = useState({value: ''})
    
    const handlerOnChange = e => {
        setNewComment(state => ({...state, value: e.target.value}))
    }
    const handlerOnSubmit = e => {
        e.preventDefault();
        if(newComment.value!==''){
            dispatch({type: ADD_COMMENT_FETCH, payload: {value: newComment.value, postId: props.postId}});
            newComment.value='';
        }
    }
    return (<div onSubmit={handlerOnSubmit} className="add_comment_form">
                <Input placeholder="Введите свой комментарий"
                className="add_comment_input"
                value={newComment.value}
                onChange={handlerOnChange}/>
                <Button onClick={handlerOnSubmit}>Add Comment</Button>
            </div>)
}