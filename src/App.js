import './App.css';
import Header from './components//Header/Header';
import Navbar from './components/Navbar/Navbar';
import Dialogs from './components/Dialogs/Dialogs';
import Profile from './components/Profile/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';





const App = function (props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar navbar={props.state.navbar} />
        <div className="app-wrapper-content">
          <Routes>
            <Route path='/profile' element={<Profile
              profilePage={props.state.profilePage}
              addPost={props.addPost}
              updateNewPostText={props.updateNewPostText} />} />
            <Route path='/dialogs/*' element={<Dialogs
              state={props.state.dialogsPage}
              addMessage={props.addMessage}
              updateNewMessageText={props.updateNewMessageText} />} />
            {/* <Route path='/news' element={<Dialogs />} />
            <Route path='/music' element={<Dialogs />} />
            <Route path='/settings' element={<Dialogs />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>

  );
}



export default App;

