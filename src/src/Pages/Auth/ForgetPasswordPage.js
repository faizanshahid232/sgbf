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
import { ForgotPassword } from '../../Redux/Slice/user';
const initialValues = {
    email: '',
};
const ForgetPasswordPage = () => {
    const [Values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        setErrors({
            ...temp,
        });
        return Object.values(temp).every((x) => x === '');
    };
    const handleForgot = async (e) => {
        e.preventDefault();
        if (Values.email !== '') {
            try {
                const res = await dispatch(
                    ForgotPassword({
                        email: Values.email,
                    })
                );
                if (res.payload.success) {
                    navigate('/reset-password', { state: { email: Values.email } });
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <div id="singin">
            <div className="col-md-4 col-sm-12 mx-auto p-5">
                <Link to="/">
                    <img src={img} alt="" height="100" width="100%" />
                </Link>
                <div className="col- md-8 mx-auto singin-card">
                    <div className="row tb_1" style={{ backgroundColor: '#fff', padding: '30px' }}>
                        <form onSubmit={handleForgot}>
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
                            </div>
                            <div className="form-actions form-wrapper form-group mt-3" id="edit-actions">
                                <button
                                    type="submit"
                                    id="edit-submit"
                                    name="op"
                                    value="Create new account"
                                    className="btn btn-success form-submit"
                                >
                                    Forget Password
                                </button>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-sm-12 mt-3">
                                    <Link to="/sign_in">
                                        <h6>
                                            <u>Sigin In</u>
                                        </h6>
                                    </Link>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPasswordPage;
