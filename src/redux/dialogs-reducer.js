const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";
//создаем первоначальный стейт (до начала "события/действия")
let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {//описывается логика редьюсера, которая произойдет при событии

    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                id: "5",
                message: state.newMessageText, //создаем объект нового сообщения с текстом из newMessageText  
            };
            state.messages.push(newMessage) // пушит в массив месседжей объект нового сообщения
            state.newMessageText = ""; // обнуляем свойство временного хранения текста
            return state;
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newText; //присваивает текст из textarea свойству newMessageText, для временного хранения
            return state;
        default:
            return state;
    }
}
// создаем action { type: ACTION_1, value_1: значение } для последующей передачи в диспач
export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE });

export const updateNewMessageTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newText: text,
    };
};

export default dialogsReducer;