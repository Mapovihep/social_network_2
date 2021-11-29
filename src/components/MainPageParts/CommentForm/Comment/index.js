import  './styles.css'

import { Button,
     ButtonGroup, 
     Card, 
     Typography, 
     Input} from "@mui/material"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moment from 'react-moment';
import { CHANGE_COMMENT_FETCH, DELETE_COMMENT_FETCH } from "../../../../actions/SagaActions";
export const Comment = props => {
    const [editMode, setEditMode] = useState(false);
    const [stateOfComment, setStateOfComment] = useState(props.commentInfo);
    const userId = useSelector(state => (state.saga.userProfile.id));
    const dispatch = useDispatch();
    useEffect(()=>{
        setStateOfComment({
            title: props.commentInfo.title,
            user_id:  props.commentInfo.user_id, 
            createdAt: props.commentInfo.createdAt, 
            updatedAt: props.commentInfo.updatedAt,
            id: props.commentInfo.id,
            count: 0,
        })
    },[]) 
    const currentUser = userId===stateOfComment.user_id; 
    const color = currentUser ? '' : 'secondary';
    const handlerOnChange = e => {  
        setStateOfComment(prevState => ({...prevState, title:e.target.value}))
    }
    const delCom = e => {
        currentUser ? 
            (window.confirm('Delete this?')&&(
                dispatch({type: DELETE_COMMENT_FETCH, 
                payload: {commentId: stateOfComment.id, postId: props.postId}})&&
                setStateOfComment(prevState => ({...prevState, deleted: 'none'}))              
                )
            )
            : window.alert('You are not the author)')
    }
    const changeYourComment = e => {  
        const dispChange = e => {
            dispatch({type: CHANGE_COMMENT_FETCH, 
                payload: {commentId: stateOfComment.id, 
                value: stateOfComment.title}});
            setEditMode(false)
        }
        currentUser ? (
            setEditMode(true)
        ) : window.alert('You are not the author)')
        stateOfComment.count%2!==0&&
        (stateOfComment.title!==props.commentInfo.title ? 
            dispChange(e) 
            : setEditMode(false))
        setStateOfComment(prevState => ({...prevState, count: prevState.count+1}))
    }
    return(<Card className="comment_container" >
            <ButtonGroup variant="contained" className="button_container">
                <Button className="button_act" size='small' onClick={changeYourComment}>
                    Change
                </Button>
                <Button className="button_act" size='small' color={color} onClick={delCom}>
                    Delete
                </Button>
            </ButtonGroup >
                {!editMode ? 
                <Typography className="comment_title">
                    {stateOfComment.title} 
                </Typography> 
                : <Input onChange={handlerOnChange} 
                    className="comment_title_input"
                    value={stateOfComment.title}/>}
                <Typography className="comment_author" variant="h6" id="userId">
                    User Id: {stateOfComment.user_id}
                </Typography>
                <Typography className="comment_date_of_creation">
                    Created at: <Moment calendar={true}>
                        {stateOfComment.createdAt}
                    </Moment>      
                </Typography>       
            </Card>
    )
}