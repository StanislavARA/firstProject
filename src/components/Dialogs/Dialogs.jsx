import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import React from "react";
import { Navigate } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { TextArea } from "../common/FormsControls/FormsControls";
import {
  maxLengthCreator,
  requiredField,
} from "../../utils/validators/validators";

// function selectLinks() {
//   function select(sel) {
//     if (sel.isActive) return s.active;
//     return s.dialog;
//   }
//   return select;
// }
const maxLength100 = maxLengthCreator(100);

const Dialogs = (props) => {
  let dialogsElements = props.dialogsPage.dialogs.map((d) => {
    return <DialogItem name={d.name} id={d.id} key={d.id} />;
  });

  let messagesElements = props.dialogsPage.messages.map((m) => {
    return <Message message={m.message} key={m.id} />;
  });

  let sendMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  };

  if (!props.isAuth) return <Navigate to={"/login"} />; // если не залогинен, перенаправляет на страничку логин
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        {messagesElements}
        <div>
          <AddMessageFormRedux onSubmit={sendMessage} />
        </div>
      </div>
    </div>
  );
};
const addMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={TextArea}
        name="newMessageBody"
        placeholder="enter your message"
        validate={[requiredField, maxLength100]}
      />
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm({ form: "dialogAddMessageForm" })(
  addMessageForm
);

export default Dialogs;
