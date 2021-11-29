import { Button,
     ButtonGroup, 
     Card, 
     Typography, 
     Input} from "@mui/material"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moment from 'react-moment';
import { CHANGE_COMMENT_FETCH, DELETE_COMMENT_FETCH } from "../../actions/SagaActions";
export const Comment = props => {
    const [editMode, setEditMode] = useState(props.editCommentMode);
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
    },[props]) 
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
        const dispChange = () => {
            dispatch({type: CHANGE_COMMENT_FETCH, 
                payload: {commentId: stateOfComment.id, 
                value: stateOfComment.title}});
            setEditMode(false)
        }
        currentUser ? (
            setEditMode(true)
        ) : window.alert('You are not the author)')
        stateOfComment.count%2!==0&&
        (stateOfComment.title!==props.commentInfo.title ? dispChange() : setEditMode(false))
        setStateOfComment(prevState => ({...prevState, count: prevState.count+1}))
    }
    return(<Card style={{display: "flex", flexWrap: 'wrap'}} >
            <ButtonGroup variant="contained" style={{margin:"10px auto"}}>
                <Button size='small' onClick={changeYourComment}>
                    Change comment
                </Button>
                <Button size='small' color={color} onClick={delCom}>
                    Delete comment
                </Button>
            </ButtonGroup>
                {!editMode ? 
                <Typography style={{display: "block", width: "100%"}}>
                    {stateOfComment.title} 
                </Typography> 
                : <Input onChange={handlerOnChange} 
                    style={{display: "block", width: "100%"}} 
                    value={stateOfComment.title}>
                </Input>}
                <Typography style={{display: "block", width: "100%"}} id="userId">
                    {stateOfComment.user_id}
                </Typography>
                <Typography style={{textAlign: "center", display: "block", width: "50%"}}>
                    Created at: <Moment calendar={true}>
                        {stateOfComment.createdAt}
                    </Moment>      
                </Typography>       
                <Typography style={{display: "block", width: "50%"}}>
                    Updated at: <Moment calendar={true}>
                        {stateOfComment.updatedAt}
                    </Moment>
                </Typography>
            </Card>
    )
}