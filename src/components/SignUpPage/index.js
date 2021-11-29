import  './styles.css'

import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SIGN_UP_FETCH } from '../../actions/SagaActions';

const SignUpPage = () => {
    const [info, setInfo] = useState({ eMail: '', password: '', firstName: '', lastName: '', errorText: ''})
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const field = e.currentTarget;
        const type = field.id;
        type === 'E-Mail' ? 
        setInfo({...info, eMail: field.value}) 
        : (type === "Password" ? 
        setInfo({...info, password: field.value})
        : (type === "FirstName" ? setInfo({...info, firstName: field.value}) 
        : setInfo({...info, lastName: field.value})))
    }
   
    const signUpDisp = e => {
        info.eMail!==""&&info.password!==""&&info.lastName!==""&&info.firstName!=="" ?
        dispatch({type: SIGN_UP_FETCH, state: info})&&navigate("loginPage")
        : setInfo({...info, errorText: "Введите-ка, сударь, все данные"})
        const textFields = e.currentTarget.parentNode.querySelectorAll('input');
        for(let t of textFields){
            t.value=''
        }
    }
    return(
        <div className="sign_up_container">
                <TextField
                    id="E-Mail"
                    placeholder="E-Mail"
                    onChange={handleChange}
                    style={{margin: "10px 0"}}
                />
                <TextField
                    id="Password"
                    placeholder="Password"
                    style={{margin: "10px 0"}}
                    onChange={handleChange}
                    type='password'
                />
                <TextField
                    id="FirstName"
                    placeholder="FirstName"
                    onChange={handleChange}
                    style={{margin: "10px 0"}}
                />
                <TextField
                    id="LastName"
                    placeholder="LastName"
                    onChange={handleChange}
                    style={{margin: "10px 0"}}
                />
                <Button onClick={signUpDisp}>
                    Sign Up
                </Button>
                <span>{info.errorText}</span>
        </div>
    )
}
export default SignUpPage;