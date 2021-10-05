import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";

import {useSelector} from 'react-redux';

const PostDetail = (props) => {
    const id = props.match.params.id;

    console.log(id);

    const post_list = useSelector(store => store.post.list);
    const post_idx = post_list.findIndex(p => p.id === id);
    const post = post_list[post_idx];
    console.log(post);

    return (
        <React.Fragment>
            <Post/>
            <CommentWrite/>
            <CommentList/>
        </React.Fragment>
    )
}

export default PostDetail;