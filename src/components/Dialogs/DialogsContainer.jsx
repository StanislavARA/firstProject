import React from "react";
import {
  sendMessageActionCreator,
  updateNewMessageTextActionCreator,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

// function selectLinks() {
//   function select(sel) {
//     if (sel.isActive) return s.active;
//     return s.dialog;
//   }
//   return select;
// }

const DialogsContainer = (props) => {
  let sendMessage = () => {
    //добавляет новое сообщение
    props.store.dispatch(sendMessageActionCreator());
  };

  let onMessageChange = (text) => {
    props.store.dispatch(updateNewMessageTextActionCreator(text));
  };

  return (
    <Dialogs
      updateNewMessageText={onMessageChange}
      sendMessage={sendMessage}
      dialogsPage={props.store.getState().dialogsPage}
    />
  );
};
export default DialogsContainer;
