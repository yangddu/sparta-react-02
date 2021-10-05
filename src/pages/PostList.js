// PostList.js
import React from "react";
import {useSelector, useDispatch} from 'react-redux';

import Post from "../components/Post";
import {actionCreators as postActions} from "../redux/modules/post";
import InfinityScroll from "../shared/infinityScroll";
import { Grid } from '../elements';

const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    const user_info = useSelector((state) => state.user.user);
    const is_loading = useSelector((state) => state.post.is_loading);
    const paging = useSelector((state) => state.post.paging);

    const {history} = props;

    console.log(post_list);

    React.useEffect(() => {
        
        if(post_list.length === 0){
            dispatch(postActions.getPostFB());
        }

        dispatch(postActions.getPostFB());
    }, []);

    return (
        <React.Fragment>
            <Grid bg={"#eff6ff"} padding="20px 0px">
            <InfinityScroll
                callNext = {() => {
                    dispatch(postActions.getPostFB(paging.next));
                }}
                is_next={paging.next? true : false}
                loading={is_loading}
            >
            {post_list.map((p, idx) => {
                if(p.user_info.user_id === user_info?.uid) {
                    return (
                        <Grid bg="#fff" key={p.id}  _onClick={() => {history.push(`/post/${p.id}`)}}>
                            <Post {...p} is_me/>
                        </Grid>
                    );
                }else {
                    return (
                        <Grid key={p.id} _onClick={() => {history.push(`/post/${p.id}`)}}>
                            <Post {...p}/>
                        </Grid>
                    );
                }
                
            })}
            </InfinityScroll>
            </Grid>
        </React.Fragment>
    )
}

export default PostList;

