import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import React from "react";

// function selectLinks() {
//   function select(sel) {
//     if (sel.isActive) return s.active;
//     return s.dialog;
//   }
//   return select;
// }

const Dialogs = (props) => {
  let dialogsElements = props.dialogsPage.dialogs.map((d) => {
    return <DialogItem name={d.name} id={d.id} />;
  });

  let messagesElements = props.dialogsPage.messages.map((m) => {
    return <Message message={m.message} />;
  });

  let messageText = React.createRef(); //создание рефа

  let sendMessage = () => {
    props.sendMessage();
  };

  let onMessageChange = (e) => {
    let text = e.target.value; //получает значение из textarea
    props.updateNewMessageText(text);
  };
  debugger;
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        {messagesElements}
        <textarea
          placeholder="enter your message"
          ref={messageText} //прикрепление рефа
          onChange={onMessageChange} // слушатель событий ончэнж срабатывает при изменении текста и вызывает функцию onPostChange
          value={props.dialogsPage.newMessageText} // берет значения посимвольно из временного хранения newMessageText
        />
        <div>
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};
export default Dialogs;
