import { LOAD_PROFILE, 
    LOG_IN,
    LOG_OUT,
    LOAD_POSTS,
    SIGN_UP,
    DEL_POST,
    CHANGE_POST,
    ADD_POST,
    ADD_COMMENT,
    DEL_COMMENT,
    CHANGE_COMMENT,
    SET_LAST_CHANGE
 } from "../actions/ReducerActions"

const initialState = {
    posts: [],
    userProfile: [],
    loggedIn: false,
}
const sorting = arr => {
    let dates = [];
    for(let el of arr){
        dates.unshift(Math.round(new Date(el.createdAt).getTime()/1000))
    }
    dates.sort(function(a, b) { return a - b });
    let sortedDate = []
    for(let el of arr){
        for(let date of dates){
            if(date===Math.round(new Date(el.createdAt).getTime()/1000)){
                sortedDate.unshift({...el, editCommentMode: false});
                if(el.comments&&el.comments.length!==undefined&&el.comments.length!==0&&el.comments.length!==1){
                    let array = sorting(el.comments);
                    el.comments = array;
                }
            }
        }
    }
    return sortedDate
}
export const sagaReducer = (state = initialState, action) =>{
       switch (action.type) {
        case LOG_OUT:
            localStorage.clear();
            return {...state,
                loggedIn: false}

        case SIGN_UP:
            return {...state,
                  signedUp: action.payload
                } 

        case LOAD_POSTS: 
            return {...state, 
                posts: sorting(action.payload)
            }

        case LOG_IN:
            return {...state,
                    loggedIn: action.payload
                } 

        case LOAD_PROFILE:
            return {...state,
                    userProfile: action.payload
                }
                
        case CHANGE_POST:
            let changedPostIndex = {}; 
            for(let post of state.posts){
                if(post.id === action.payload.id){
                    changedPostIndex = state.posts.indexOf(post);
                }
            }
            let postsWithChangedPost = state.posts;
            postsWithChangedPost[changedPostIndex] = action.payload;
            return {...state,
                posts: postsWithChangedPost}

        case DEL_POST:
            let mass = state.posts.filter(el => el.id !== action.payload)
            return {...state,
                posts: mass}
        
        case ADD_POST:
            let updatedPosts = state.posts;
            updatedPosts.unshift({...action.payload, comments:[]});
            return {...state,
                posts: updatedPosts}

        case DEL_COMMENT:
            const {postId, commentId} = action.payload;
            let [currentPostDelComm] = state.posts.filter(post => post.id===postId);
            let numberOfPostDelComm = state.posts.indexOf(currentPostDelComm)
            let arrayWithoutComment = state.posts[numberOfPostDelComm].comments.filter(comm=> comm.id!==commentId)
            let postsDelComm = state.posts;
            postsDelComm[numberOfPostDelComm].comments = arrayWithoutComment;
            postsDelComm[numberOfPostDelComm].editCommentMode = true;
            return {...state, 
                posts: postsDelComm
            }

        case CHANGE_COMMENT:  
            let numberOfChangedPost = 0;
            for(let element of state.posts){
                if(element.id===action.payload.post_id){
                    let numberOfChangedComm = 0;
                    for(let comm of state.posts[numberOfChangedPost].comments){
                        if(comm.id===action.payload.id){
                            state.posts[numberOfChangedPost].comments[numberOfChangedComm].title = action.payload.title;
                        }
                        numberOfChangedComm++;
                    }
                    break;
                }
                numberOfChangedPost++;
            }
            return state

        case ADD_COMMENT: 
            let [currentPostAddCom] = state.posts.filter(post=> post.id===action.payload.post_id);
            let numberOfPostAddCom = state.posts.indexOf(currentPostAddCom)
            let postsAddComm = state.posts;
            postsAddComm[numberOfPostAddCom].comments = [...state.posts[numberOfPostAddCom].comments,
            action.payload]
            state.posts[numberOfPostAddCom].comments = sorting(state.posts[numberOfPostAddCom].comments)
            postsAddComm[numberOfPostAddCom].editCommentMode = true;
            return {...state,
            posts: postsAddComm}

        case SET_LAST_CHANGE:
            let postsAfterShowComm = state.posts;
            let [lastChangedPost] = postsAfterShowComm.filter(el => el.id===action.payload.postId);
            let ind = postsAfterShowComm.indexOf(lastChangedPost);
            postsAfterShowComm[ind].editCommentMode = action.payload.editMode;
            return {...state,
                posts: postsAfterShowComm}

        default:
            return state
       }
       
}