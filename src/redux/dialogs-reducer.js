const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

const dialogsReducer = (state, action) => {

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

export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE });

export const updateNewMessageTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newText: text,
    };
};

export default dialogsReducer;