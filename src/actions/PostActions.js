export const editIsOver = (state, props, dispatch) => {
    (state.title!==props.postInfo.title||state.description!==props.postInfo.description)&&
        dispatch({type: "CHANGING_POST", payload: {comments: state.comments,
        createdAt: state.createdAt,
        description: state.description,
        id: state.id,
        title: state.title,
        updatedAt: state.updatedAt,
        user_id: state.user_id}})
}
