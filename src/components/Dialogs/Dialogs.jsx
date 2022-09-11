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
  let dialogsElements = props.state.dialogs.map((d) => {
    return <DialogItem name={d.name} id={d.id} />;
  });

  let messagesElements = props.state.messages.map((m) => {
    return <Message message={m.message} />;
  });

  let messageText = React.createRef(); //создание рефа

  let addMessage = () => {
    //добавляет новое сообщение
    props.dispatch({ type: "ADD-MESSAGE" });
  };

  let onPostChange = () => {
    let text = messageText.current.value; //получает значение из textarea
    props.dispatch({ type: "UPDATE-NEW-MESSAGE-TEXT", newText: text });
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        {messagesElements}
        <textarea
          ref={messageText} //прикрепление рефа
          onChange={onPostChange} // слушатель событий ончэнж срабатывает при изменении текста и вызывает функцию onPostChange
          value={props.state.newMessageText} // берет значения посимвольно из временного хранения newMessageText
        />
        <div>
          <button onClick={addMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};
export default Dialogs;
