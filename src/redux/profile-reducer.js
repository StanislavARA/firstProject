const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
//создаем первоначальный стейт (до начала "события/действия")
let initialState = {
    posts: [
        {
            id: 1,
            message: "hello, I'am Cat",
            likes: 22,
            avatar:
                "https://www.meme-arsenal.com/memes/baa72248e5d44682994a2363bb10e635.jpg",
        },
        {
            id: 2,
            message: "hello, I'am Dog",
            likes: 2,
            avatar:
                "https://play-lh.googleusercontent.com/6f6MrwfRIEnR-OIKIt_O3VdplItbaMqtqgCNSOxcfVMCKGKsOdBK5XcI6HZpjssnB2Y",
        },
    ],
    newPostText: "it-kamasutra.com",

};


const profileReducer = (state = initialState, action) => { //описывается логика редьюсера, которая произойдет при событии

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likes: 0,
                avatar: null,
            }
            let stateCopy = { ...state };
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost);
            state.newPostText = "";
            return stateCopy;
        }
        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = { ...state }
            stateCopy.newPostText = action.newText;
            return stateCopy;
        }
        default:
            return state;
    }
};

// создаем action { type: ACTION_1, value_1: значение } для последующей передачи в диспач
export const addPostActionCreator = () => ({ type: ADD_POST });

export const updateNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text,
    };
};
export default profileReducer