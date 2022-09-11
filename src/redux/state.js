const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

let store = {
    _callSubscriber() {
        console.log('state was changed')
    },

    _state: {
        profilePage: {
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

        },

        dialogsPage: {
            messages: [
                { id: 1, message: "Hi" },
                { id: 2, message: "how are your" },
                { id: 3, message: "Yo" },
                { id: 4, message: "Yo" },
            ],
            dialogs: [
                { id: "1", name: "Dimych" },
                { id: "2", name: "Sveta" },
                { id: "3", name: "Sasha" },
                { id: "4", name: "Stas" },
            ],
            newMessageText: "Hello",
        },

        navbar: {
            friends: [
                {
                    name: "Stas",
                    ava: "https://sun1-28.userapi.com/s/v1/if1/wsdT4jFyOMzRquAGVQRcu0xzXv4J0sGFi_MFHJDWKCh8wpNbtk2Nld6P1afK1JCM8fF-k_1u.jpg?size=400x400&quality=96&crop=404,3,1610,1610&ava=1 "
                },
                {
                    name: "Bean",
                    ava: "https://interesnyefakty.org/wp-content/uploads/mister-bin.jpg"
                },

            ],
        },


    },

    subscribe(observer) {
        this._callSubscriber = observer;//патерн
    },

    getState() {
        return this._state;
    },

    _addMessage() {
        let newMessage = {
            id: "5",
            message: this._state.dialogsPage.newMessageText, //создаем объект нового сообщения с текстом из newMessageText  
        };
        this._state.dialogsPage.messages.push(newMessage) // пушит в массив месседжей объект нового сообщения
        this._state.dialogsPage.newMessageText = ""; // обнуляем свойство временного хранения текста
        this._callSubscriber(this._state);
    },

    _updateNewMessageText(newText) {
        this._state.dialogsPage.newMessageText = newText; //присваивает текст из textarea свойству newMessageText, для временного хранения
        this._callSubscriber(this._state);
    },

    dispatch(action) {
        if (action.type === ADD_POST) {
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likes: 0,
                avatar: null,
            }
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = "";
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        } else if (action.type === ADD_MESSAGE) {
            debugger;
            this._addMessage();
        } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
            this._updateNewMessageText(action.newText)
        }

    },
}

export const addPostActionCreator = () => ({ type: ADD_POST });

export const updateNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text,
    };
};

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });

export const updateNewMessageTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newText: text,
    };
};




export default store