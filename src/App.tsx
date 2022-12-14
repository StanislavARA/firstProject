import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import Music from './components/Music/Music';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import React, {Suspense} from 'react';
import {connect, Provider} from 'react-redux';
import {initializeApp} from './redux/app-reducer';
import Preloader from './components/common/preloader/Preloader';
import store, {AppStateType} from './redux/redux-store';
import ProfileContainer from './components/Profile/ProfileContainer';


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends React.Component <MapPropsType & DispatchPropsType> {
    catchAllUnhandledErrors = () => {
        alert("some error")
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Suspense fallback={<Preloader/>}>
                        <Routes>
                            <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                            <Route path='/profile/' element={<ProfileContainer/>}/>
                            <Route path='/dialogs/' element={<DialogsContainer/>}/>
                            <Route path='/users' element={<UsersContainer pageTitle={"Samurai"}/>}/>
                            <Route path='/music' element={<Music/>}/>
                            <Route path='/login' element={<LoginPage/>}/>
                            <Route path='/news' element={<Music/>}/>
                            <Route path='/settings' element={<Music/>}/>
                            <Route path="/" element={<Navigate to={'/profile'}/>}/> // ???????????????????????????? ???? ??????????????, ??????????
                            ?????????????????? ??????????????????????
                        </Routes>
                    </Suspense>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
});

const AppContainer = connect(mapStateToProps, {initializeApp})(App);
const MainApp: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                {/* ?????????????????? ???????????????? ???????? ?????? ?????????????????????????? ?? ???????????????? ?????????????????????? ?????????? ??????????????  */}
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default MainApp