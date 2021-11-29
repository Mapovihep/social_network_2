import  './styles.css'

import { Button, Input } from "@mui/material"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { ADD_USERS_POST_FETCH } from "../../../actions/SagaActions"

export const InputForNewPost = () => {
    const userInfo = useSelector(state => state.saga.userProfile)
    const [inputInfo, setInputText] = useState({});
    useEffect(()=>{setInputText({
        title: '',
        description: '', 
        email: userInfo.email, 
        first_name: userInfo.first_name, 
        last_name: userInfo.last_name, 
        user_id:  userInfo.id, 
        createdAt: '', 
        updatedAt: '',
        comments: []})}, [userInfo])
    const dispatch = useDispatch();

    const setState = (e) => {
        let postTitle = '';
        e.preventDefault()
        e.type==="change"&&(postTitle = e.target.value)
        setInputText({...inputInfo, title: postTitle, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()})
    }
    const addPostTitle = e => {
        dispatch({type: ADD_USERS_POST_FETCH, payload: inputInfo})
        e.currentTarget.parentNode.querySelector('input').value=''
    }
    return(
        <form 
        style={{margin: "20px", width: "95%"}}
        onSubmit={setState}>
            <Input 
            onChange={setState}
            type="text"
            placeholder="Введи-ка заголовок будущего поста"
            className='input_for_post_title'/>
            <Button
            variant="contained"
            onClick={addPostTitle}>
                Set the Post
            </Button>
        </form>
    )
}