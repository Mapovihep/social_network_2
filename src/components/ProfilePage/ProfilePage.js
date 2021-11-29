import { Card,  Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_USERS_DATA_FETCH } from '../../actions/SagaActions';
import { Post } from '../MainPageParts/Post';

const ProfilePage = props => {
    const userProfile = useSelector(state => (state.saga.userProfile||[]));
    const posts = useSelector(state => (state.saga.posts||[]))
    const usersPosts = posts.filter(el => el.user_id === userProfile.id);
    const dispatch = useDispatch();
    useEffect(()=>{getProfileThere()},[])

    const getProfileThere = () => {
        dispatch({type: LOAD_USERS_DATA_FETCH, payload: userProfile})
    }
    
    const ProfileInfo = () => {
        return <Card style ={{width: "200px", textAlign: "center"}}>
            <Typography>id: {userProfile.id}</Typography>
            <Typography>email: {userProfile.email}</Typography>
            <Typography>first_name: {userProfile.first_name}</Typography>
            <Typography>last_name: {userProfile.last_name}</Typography>
            <Typography>posts: {usersPosts ? usersPosts.length : ' 0 '}</Typography>
        </Card>
    }
    
    const UsersPosts = propses =>{
        const [usersPostsFromProps, setUsersPostsFromProps] = useState(propses.posts)
        useEffect(()=>{setUsersPostsFromProps(propses.posts)}, [])
        return(
            usersPostsFromProps.map(newPost=> 
                <Post 
                postInfo={newPost}
                key={Math.random()}>
                </Post>)
        )
    }
    return(
        <Box style={{display: "flex", flexDirection: "column", alignItems: "center", margin: "20px"}}>
            <ProfileInfo></ProfileInfo>
            <UsersPosts posts={usersPosts}></UsersPosts>
        </Box>
    )
}
export default ProfilePage;