import DialogItem from "./DialogItem/DialogItem";
//@ts-ignore
import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import React from "react";
import { Navigate } from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import { TextArea } from "../common/FormsControls/FormsControls";
import {
  maxLengthCreator,
  requiredField,
} from "../../utils/validators/validators";
import {InitialStateType} from "../../redux/dialogs-reducer";

// function selectLinks() {
//   function select(sel) {
//     if (sel.isActive) return s.active;
//     return s.dialog;
//   }
//   return select;
// }
const maxLength100 = maxLengthCreator(100);

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string)=> void
    isAuth: boolean
}


const Dialogs= (props: PropsType): JSX.Element => {
  let dialogsElements = props.dialogsPage.dialogs.map((d) => {
    return <DialogItem name={d.name} id={d.id} key={d.id} />;
  });

  let messagesElements = props.dialogsPage.messages.map((m) => {
    return <Message message={m.message} key={m.id} />;
  });

  let sendMessage = (values: {newMessageBody:string}) => {
    props.sendMessage(values.newMessageBody);
  };

  // if (props.isAuth) return <Navigate to={"/login"} />; // если не залогинен, перенаправляет на страничку логин
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

type NewMessageFormValuesType = {
    newMessageBody: string
}
type PropsFormType = {}

const addMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsFormType> & PropsFormType> = (props) => {
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

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType> ({ form: "dialogAddMessageForm" })(
  addMessageForm
);

export default Dialogs;
