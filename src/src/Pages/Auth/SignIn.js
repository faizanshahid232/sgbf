/* eslint-disable no-useless-escape */
/* eslint-disable prefer-const */
/* eslint-disable import/newline-after-import */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';
import img from '../../Assets/sgbf-logo_0.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Alert } from '@mui/material';
import { ForgotPassword, LoginUser } from '../../Redux/Slice/user';
import GoogleAuth from '../../../Components/GoogleAuth/GoogleAuth';
const initialValues = {
  email: '',
  password: '',
};
const SignIn = () => {
  const [Values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('sgbf_token');
  useEffect(() => {
    if (token) {
      navigate('/');
    } else {
      navigate('/sign_in');
    }
  }, [window.location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validations()) {
      try {
        const res = await dispatch(LoginUser(Values));
        if (res.payload.success) {
          localStorage.setItem('sgbf_token', res.payload.access_token);
          setValues(initialValues);
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...Values,
      [name]: value,
    });
    validations({ [name]: value });
  };
  const validations = (fieldValue = Values) => {
    let temp = { ...errors };
    if ('email' in fieldValue)
      temp.email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fieldValue.email) ? '' : 'Email is not valid';
    if ('password' in fieldValue) temp.password = fieldValue.password ? '' : 'This field requires';
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === '');
  };
  return (
    <div id="singin">
      <div className="col-md-4 col-sm-12 mx-auto p-5">
        <Link to="/">
          <img src={img} alt="" height="100" width="100%" />
        </Link>
        <div className="col- md-8 mx-auto singin-card">
          {/* <div className="alert alert-success">
            {{ Session::get('Oppes')}}
          </div> */}
          <div className="row tb_1" style={{ backgroundColor: '#fff', padding: '30px' }}>
            <Alert variant="outlined" severity="error">
              Please reset your password because we have upgraded the platform.
            </Alert>
            <form onSubmit={handleSubmit}>
              <div className=" mx-auto">
                <h1 className="mb-5 mx-auto"></h1>
                <input
                  type="email"
                  className="form-control mt-3 custom-form"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={Values.email}
                />
                {errors.email ? <p style={{ color: 'red' }}>{errors.email}</p> : null}
                <input
                  type="password"
                  className="form-control mt-3 custom-form"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={Values.password}
                />
                {errors.password ? <p style={{ color: 'red' }}>{errors.password}</p> : null}
              </div>
              <div className="form-actions form-wrapper form-group mt-5" id="edit-actions">
                <button
                  type="submit"
                  id="edit-submit"
                  name="op"
                  value="Create new account"
                  className="btn btn-success form-submit"
                >
                  Login
                </button>
              </div>
              <div className="row">
                <div className="col-md-6 mx-auto col-sm-12 mt-5">
                  <Link to="/register">
                    <h6>
                      <u>Register</u>
                    </h6>
                  </Link>
                </div>
                <div className="col-md-6 col-sm-12 text-center">
                  <Link
                    style={{
                      color: '#DF5A49;',
                      fontWeight: 'bold;',
                      textDecoration: 'none',
                    }}
                    to={"/forgot-password"}
                  >
                    Forgot password
                  </Link>
                </div>
                <GoogleAuth />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
