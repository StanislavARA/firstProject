const SEND_MESSAGE = "SEND-MESSAGE";
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
    ]
};

const dialogsReducer = (state = initialState, action) => {//описывается логика редьюсера, которая произойдет при событии

    switch (action.type) {

        case SEND_MESSAGE: {
            // код ниже аналогичен
            // let newMessage = {
            //     id: "5",
            //     message: state.newMessageText, //создаем объект нового сообщения с текстом из newMessageText  
            // };
            // stateCopy.messages.push(newMessage) // пушит в массив месседжей объект нового сообщения
            // stateCopy.newMessageText = ""; // обнуляем свойство временного хранения текста
            return {
                ...state,

                messages: [...state.messages, { id: 6, message: action.newMessageBody }]
            }

        }

        default:
            return state;
    }
}
// создаем action { type: ACTION_1, value_1: значение } для последующей передачи в диспач
export const sendMessageActionCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody });


export default dialogsReducer;