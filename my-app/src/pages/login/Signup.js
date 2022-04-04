/*
 * Copyright 2022 Dan Lyu.
 */
import './Auth.css';
import {TextField} from "../../components/input/TextField";
import * as React from "react";
import {BlueBGButton} from "../../components/input/Button";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {login, setUser} from '../../redux/Redux'
import {UserAPI} from "../../axios/Axios";
import {useEffect, useState} from "react";
import {Alert, Snackbar} from "@mui/material";
import {useSnackbar} from "notistack";
import PasswordTextField from "../../components/input/PasswordTextField";

export default function Signup() {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [passwordInputType, setPasswordInputType] = useState("password")

    const signup = async () => {
        if(password !== repeatPassword){
            enqueueSnackbar(`Your passwords don't match (Repeat Password and Password)`,
                {
                    variant: 'error',
                    persist: false,
                })
            return
        }
        await UserAPI.post('/register',
            {"name": username, "email": email, "password": password},
            {withCredentials: true}).then(res => {
            enqueueSnackbar(`Success`,
                {
                    variant: 'success',
                    persist: false,
                })
            dispatch(setUser(res.data))
            navigate("/dashboard")
        }).catch(error => {
            enqueueSnackbar(`${error.response.data.message}`,
                {
                    variant: 'error',
                    persist: false,
                })
        })
    }

    return (
        <>
            <div className="auth__container">
                <div className="auth__title">
                    Sign-up
                </div>
                <form onSubmit={async (e) => {
                    e.preventDefault()
                }}>
                    <TextField value={username} setValue={setUsername} type="username" className="auth__input"
                               label={'Username'}/>
                    <TextField value={email} setValue={setEmail} type="email" className="auth__input"
                               label={'Email'}/>
                    <PasswordTextField password={password} setPassword={setPassword}
                                       passwordInputType={passwordInputType}
                                       className="auth__input" setPasswordInputType={setPasswordInputType}/>

                    <TextField value={repeatPassword} setValue={setRepeatPassword} type={passwordInputType}
                               className="auth__input"
                               label={'Repeat Password'}/>
                    <BlueBGButton type="submit" className="auth__button" onClick={async () => {
                        await signup()
                    }}>SUBMIT</BlueBGButton>

                </form>
                <div onClick={() => {
                    navigate("/login")
                }} className="auth__link">Already have an account? Click here to login
                </div>
            </div>
        </>
    )
}