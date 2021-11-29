import { Button, Input } from "@mui/material"
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_COMMENT_FETCH } from "../../actions/SagaActions";

export const InputForNewComment = props =>{
    const dispatch = useDispatch();
    const [newComment, setNewComment] = useState({value: ''})
    
    const handlerOnChange = e => {
        setNewComment(()=>{newComment.value = e.target.value;
        return newComment})
    }
    const handlerOnSubmit = e => {
        e.preventDefault();
        if(newComment.value!==''){
            dispatch({type: ADD_COMMENT_FETCH, payload: {value: newComment.value, postId: props.postId}});
            e.target.value='';
        }
    }
    return (<div onSubmit={handlerOnSubmit}>
                <Input placeholder="Введите свой комментарий"
                style={{width: "90%"}}
                onChange={handlerOnChange}/>
                <Button onClick={handlerOnSubmit}>Add Comment</Button>
            </div>)
}