import { createAction, handleActions} from 'redux-actions';
import { produce } from 'immer';
import { firestore } from '../../shared/firebase';
import moment from 'moment';

//액션 타입
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";


//액션 생성자 
const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));


//initialState
//얘는 이 리듀서가 사용할 initialState
const initialState = {
    list: [], 
}

//게시글 하나에 대한 initialPost
const initialPost = {
    // id: 0,
    // user_info: {
    //     user_name: "mean0",
    //     user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
    //   },
      image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
      contents: "",
      comment_cnt: 0,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
}


//reducer
export default handleActions(
    {
        [SET_POST] : (state, action) => produce(state, (draft) => {
            draft.list = action.payload.post_list;
        }),

        [ADD_POST] : (state, action) => produce(state, (draft) => {
            draft.list.unshift(action.payload.post);
        })
    }, initialState
);


//미들웨어

const addPostFB = (contents="", ) => {
    return function (dispatch, getState, {history}) {
        const postDB = firestore.collection("post");

        const _user = getState().user.user;

        const user_info = {
            user_name: _user.user_name,
            user_id: _user.uid,
            user_profile: _user.user_profile,
        }

        const _post = {
            ...initialState,
            contents: contents,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
        };

        postDB.add({...user_info, ..._post}).then((doc) => {
            let post = {user_info, ..._post, id: doc.id};
            dispatch(addPost(post));
            history.replace('/');
        }).catch((err) => {
            console.log("post 작성에 실패했어요!", err);
        })


    }
}
const getPostFB = () => {
    return function (dispatch, getState, {history}) {
        const postDB = firestore.collection("post");

        postDB.get().then((docs) => {
            let post_list = [];
            docs.forEach((doc)=> {

                let _post = {
                    id: doc.id,
                    ...doc.data(),
                }
                let post = {
                    id: doc.id,
                    user_info: {
                        user_name: _post.user_name,
                        user_profile: _post.user_profile,
                        user_id: _post.user_id,
                    },
                    image_url: _post.image_url,
                    contents: _post.contents,
                    comment_cnt: _post.comment_cnt,
                    insert_dt: _post.insert_dt,
                };

                post_list.push(post);
            });

            console.log(post_list);

            dispatch(setPost(post_list));
        })
    }
}


//액션생성함수 export
const actionCreators  = {
    setPost, 
    addPost,
    getPostFB,
    addPostFB,
}

export { actionCreators };