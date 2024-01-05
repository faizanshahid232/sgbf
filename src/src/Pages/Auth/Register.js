/* eslint-disable no-useless-escape */
/* eslint-disable prefer-const */
/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';
import img from '../../Assets/sgbf-logo_0.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RegisterUser } from '../../Redux/Slice/user';
import GoogleAuth from '../../../Components/GoogleAuth/GoogleAuth';

const initialValues = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
};

const Register = () => {
  const [Values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem('sgbf_token');
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [window.location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validations()) {
      try {
        const res = await dispatch(RegisterUser(Values));
        if (res.payload.success) {
          setValues(initialValues);
          navigate('/sign_in');
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
    if ('lastName' in fieldValue) temp.lastName = fieldValue.lastName ? '' : 'This field requires';
    if ('firstName' in fieldValue) temp.firstName = fieldValue.firstName ? '' : 'This field requires';
    if ('email' in fieldValue)
      temp.email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fieldValue.email) ? '' : 'Email is not valid';
    if ('password' in fieldValue) {
      if (!fieldValue.password) {
        temp.password = 'This field is required';
      } else if (fieldValue.password.length < 8) {
        temp.password = 'Password must be at least 8 characters long';
      } else if (!/(?=.*[A-Z])/.test(fieldValue.password)) {
        temp.password = 'Password must contain at least one uppercase letter';
      } else if (!/(?=.*[a-z])/.test(fieldValue.password)) {
        temp.password = 'Password must contain at least one lowercase letter';
      } else if (!/(?=.*\d)/.test(fieldValue.password)) {
        temp.password = 'Password must contain at least one digit';
      } else if (!/(?=.*[@#$%^&+=!])/.test(fieldValue.password)) {
        temp.password = 'Password must contain at least one special character';
      } else {
        temp.password = '';
      }
    }
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === '');
  };

  return (
    <div id="register" className="w3-container city">
      <div className="col-5 offset-4">
        <div className="text-center pt-5">
          <Link to="/">
            <img src={img} alt="" height="100" width="100%" />
          </Link>
        </div>
        <div className="col-md-10 mx-auto register-card">
          <div
            className="row tb_1"
            style={{
              backgroundColor: '#fff',
              padding: '30px;',
              borderBottom: '1px solid lightgrey',
            }}
          >
            <form onSubmit={handleSubmit} className="form-container">
              <div className=" mx-auto">
                <div className="text-center">
                  <h1>Register</h1>
                </div>
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
                  type="text"
                  className="form-control mt-3 custom-form"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleChange}
                  value={Values.firstName}
                />
                {errors.firstName ? <p style={{ color: 'red' }}>{errors.email}</p> : null}
                <input
                  type="text"
                  className="form-control mt-3 custom-form"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  value={Values.lastName}
                />
                {errors.lastName ? <p style={{ color: 'red' }}>{errors.email}</p> : null}
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
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="row bg-white p-3">
            <div className="col-md-10 col-sm-12  mx-auto">
              <Link
                to="/sign_in"
                style={{
                  color: '#DF5A49;',
                  fontWeight: 'bold;',
                  textDecoration: 'none',
                }}
              >
                Login
              </Link>
            </div>
            <GoogleAuth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
