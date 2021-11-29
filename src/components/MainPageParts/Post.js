import { Button, 
        Card, 
        CardActions, 
        CardContent, 
        IconButton, 
        ListItem,
        Input, 
        Typography} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Comments } from "./Comments";
import Moment from "react-moment";
import { useNavigate } from "react-router";
import { editIsOver } from "../../actions/PostActions";
import { useLocation } from "react-router";
import { CHANGING_POST_FETCH, DELETE_POST_FETCH } from "../../actions/SagaActions";

export const Post = props => {
    const [state, setPostState] = useState({...props.postInfo, 
        likeCount: 5, 
        editMode: false, 
        editStyle: 'none', 
        actionCount: 0})  
    const [commFormState, setCommFormState] = useState({
        formCommStyle: "none", 
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const userId = useSelector(state => (state.saga.userProfile.id))
    useEffect(()=>{
        setPostState({...props.postInfo, 
            likeCount: 5, 
            editMode: false, 
            editStyle: 'none', 
            actionCount: 0});
        props.fromRouter!==undefined&&setPostState(state => ({...state, editStyle: 'block'}))
        // console.log(state.editCommentMode)
        state.editCommentMode ?
        setCommFormState({formCommStyle: 'block'}) :
        (props.fromRouter!==undefined ? 
        setCommFormState({formCommStyle: 'block'})
        : setCommFormState({formCommStyle: "none"}))
    },[])
    const editIsOver = () => {
        (state.title!==props.postInfo.title||state.description!==props.postInfo.description)&&
            dispatch({type: CHANGING_POST_FETCH, payload: {comments: state.comments,
            createdAt: state.createdAt,
            description: state.description,
            id: state.id,
            title: state.title,
            updatedAt: state.updatedAt,
            user_id: state.user_id}})
    };
    const editMode = () => {
        state.actionCount%2===0 ? 
        setPostState(state => ({...state, editMode: true, actionCount: state.actionCount+1}))
        : setPostState(state => ({...state, editMode: false, actionCount: state.actionCount+1}));
        editIsOver();
    }
    const deletePost = () => {
        userId===state.user_id&&window.confirm('Are you sure?') ? 
        dispatch({type: DELETE_POST_FETCH, payload: state.id})
        : window.alert('You are not the author of this post');
    }
    const handleClickLike = () => {
        setPostState(state => ({...state, likeCount: state.likeCount+1}))
    }
    const showComments = () => {
        commFormState.formCommStyle !== 'block' ? 
        setCommFormState(state => ({...state, formCommStyle: 'block'}))
        : setCommFormState(state => ({...state, formCommStyle: 'none'}));
    }
    const handlerRoute = () => {
        pathname!==`/posts/${state.id}`&&
        navigate(`/posts/${state.id}`)&&console.log(pathname)}
    const handlerChangePost = e =>{
        e.target.type!=='textarea' ?
        setPostState(state => ({...state, title: e.target.value}))
        : setPostState(state => ({...state, description: e.target.value}))
    }
    return(
        <ListItem>    
            <Card style={{height: "100%", width: "90vw", display: "flex", flexDirection: "column"}}>      
                    <CardContent onClick={handlerRoute}>
                        {state.editMode ? <Input 
                        style={{display: 'block', width: '100%'}}
                        onChange={handlerChangePost} 
                        value={state.title}/>
                        : <div>
                            <Typography style={{display: "inline-block", width: "50%"}} variant="h6">
                                {state.title}
                            </Typography>
                            <Typography 
                            style={{display: "inline-block", width: "20%", marginLeft: 'auto'}}
                            variant="h6">
                                {(' user: '+ state.user_id||' your_post')}
                            </Typography>
                        </div>}
                        {state.editMode ? 
                        <textarea 
                        style={{display: 'block', width: '100%'}}
                        onChange={handlerChangePost} 
                        value={state.description}/> 
                        : <Typography 
                        sx={{ fontSize: 14 }} 
                        color="text.secondary" 
                        gutterBottom>
                            {state.description}
                        </Typography>}
                        {"created "} 
                        <Moment style={{ marginBottom: "10px" }} calendar={true}>
                            {state.createdAt} 
                        </Moment>
                    </CardContent>
                    <CardActions>
                        <Button onClick={showComments}>Show comments ({state.comments.length})</Button>
                        <IconButton aria-label="delete" onClick={deletePost}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={handleClickLike} >
                            <FavoriteIcon />
                        </IconButton>
                        <Typography color="text.secondary">
                            {state.likeCount}
                        </Typography>
                        <Button onClick={editMode} style={{display:`${state.editStyle}`}}>Edit</Button>
                    </CardActions>
                    <Comments 
                    display= {commFormState.formCommStyle} 
                    comments={state.comments} 
                    postId={state.id}/>
            </Card>
        </ListItem>
    )
}