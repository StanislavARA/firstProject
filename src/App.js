import './App.css';
import Header from './components//Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import { Route, Routes } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';



const App = function (props) {

  return (

    <div className="app-wrapper">
      <Header />
      <Navbar navbar={props.state.navbar} />
      <div className="app-wrapper-content">
        <Routes>
          <Route path='/profile' element={<Profile
            store={props.store} />} />
          <Route path='/dialogs/*' element={<DialogsContainer
            store={props.store} />} />
          {/* <Route path='/news' element={<Dialogs />} />
            <Route path='/music' element={<Dialogs />} />
            <Route path='/settings' element={<Dialogs />} /> */}
        </Routes>
      </div>
    </div>
  );
}



export default App;

