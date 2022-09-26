import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";
import profileReducer from "./profile-reducer";


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
            newMessageText: "",
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

    dispatch(action) { //обновляет store, вызывает каждый редьюсер и передает ему action { type: ACTION_1, value_1: значение }

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.navbar = navbarReducer(this._state.navbar, action);
        this._callSubscriber(this._state);
    }

};






export default store