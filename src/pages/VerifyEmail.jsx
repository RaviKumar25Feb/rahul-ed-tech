import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';


function VerifyEmail() {
    const [otp, setOtp] = useState("");
    const {loading, signupData} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect( () => {
        if(!signupData) {
            navigate("/signup");
        }
    }, []);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const {accountType, firstName, lastName, email, password, confirmPassword} = signupData;

        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate))
    }

  return (
    <div className='text-white'>
    
        {
            loading ? (<div className='spinner'></div>) 
            : (
                <div className='text-white'>

                    <h1>Verify Email</h1>

                    <p>A verification code has been sent to you. Enter the code below</p>

                    <form onSubmit={handleOnSubmit}>

                        <OTPInput 
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={ (props) => <input {...props} /> }
                        />

                        <button type='submit'>
                            Verify Email
                        </button>

                    </form>

                    <div>
                        <div>
                            <Link to="/login">
                                <p>Back to login</p>
                            </Link>
                        </div>
                        <button onClick={() => dispatch(sendOtp(signupData.email, navigate))}>
                            Resend it
                        </button>
                    </div>

                </div>
            )
        }

    </div>
  )
}

export default VerifyEmail