import React, {useCallback, useEffect} from 'react'
import style from './App.module.css'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import {HashRouter, Route} from 'react-router-dom'
import {Login} from '../features/Login/Login'
import {logoutTC} from '../features/Login/auth-reducer'

function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <HashRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static" style={{background: '#2E3B55'}}>
                    <Toolbar className={style.toolbar}>
                        {/*<IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>*/}
                        <Typography variant="h6">
                            Todolist
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler} >Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Route exact path={'/'} render={() => <TodolistsList  />}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                </Container>
            </div>
        </HashRouter>
    )
}

export default App
