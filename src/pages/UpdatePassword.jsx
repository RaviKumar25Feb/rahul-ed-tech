import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { resetPassword } from '../services/operations/authAPI';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function UpdatePassword() {

    const {loading} = useSelector( (state) => state.auth );

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });

    const handleOnChange = (e) => {
      setFormData((prev) => ( {
        ...prev,
        [e.target.name] : e.target.value
      }))
    }

    const {password, confirmPassword} = formData;


    const handleOnSubmit = (e) => {
      e.preventDefault();
      const token = location.pathname.split("/").at(-1);
      dispatch(resetPassword(password, confirmPassword, token, navigate))
    }

  return (
    <div>

      {
        loading ? ( <div className='spinner'></div> ) 
        : (
          <div className='text-white'>

            <h1>Choose new Password</h1>
            <p>Almost done. Enter your new password and youre all set.</p>


            <form onSubmit={handleOnSubmit}>

              <label>
                <p>New Password*</p>
                <input 
                  required
                  type={ showPassword ? "text" : "password" }
                  name='password'
                  value={password}
                  onChange={handleOnChange}
                  placeholder='New password'
                  className='w-full p-4 bg-richblack-600 text-richblack-5'
                />

                <span onClick={() => setShowPassword((prev) => !prev)}>
                  {
                    showPassword ? <FaRegEye /> : <FaRegEyeSlash />
                  }
                </span>
              </label>

              <label>
                <p>Confirm New Password*</p>
                <input 
                  required
                  type={ showConfirmPassword ? "text" : "password" }
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder='Confirm New password'
                  className='w-full p-4 bg-richblack-600 text-richblack-5'
                />

                <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                  {
                    showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />
                  }
                </span>
              </label>


              <button type='submit'>
                Reset Password
              </button>

            </form>

            <div>
              <Link to="/login">
                <p>Back to login</p>
              </Link>
            </div>


          </div>
        )
      }

    </div>
  )
}

export default UpdatePassword