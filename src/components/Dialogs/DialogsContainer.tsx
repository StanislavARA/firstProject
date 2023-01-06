import {dialogsActions} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirectComponent} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

const mapStateToProps = (state: AppStateType) => {
   // коннект передаст стейт сам
   return {
      dialogsPage: state.dialogsPage,
   };
};
export default compose <React.ComponentType>(
 connect(mapStateToProps, {
    sendMessage: dialogsActions.sendMessage
 }),
 withAuthRedirectComponent
)(Dialogs);
// //работа компос: вызываем withAuthRedirectComponent с аргументом Dialogs, полученный результат передаем в вызов коннект, работает аналогично коду ниже

// // оборачиваем в хок компоненту диалог, чтобы добавить авторизацию
// let AuthRedirectComponent = withAuthRedirectComponent(Dialogs);

// //вызываем коннект , во второй аргумент передаем нашу презентационную компоненту, в 1 передаем две функции, возвращаеющие объект с необходимыми пропсами для компоненты
// const DialogsContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AuthRedirectComponent);
