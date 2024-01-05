/* eslint-disable no-useless-escape */
/* eslint-disable prefer-const */
/* eslint-disable import/order */
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import img from '../../Assets/sgbf-logo_0.png';
import { VerifyUser, ResetPasswords } from "../../Redux/Slice/user";

const initialValues = {
  otp: "",
  password: "",
};
function ResetPassword() {
  const [disableComp, setDisableCom] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  //   const [state, setState] = useState(false);
  const { state } = useLocation();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    validations({ [name]: value });
  };

  const validations = (fieldValue = values) => {
    let temp = { ...errors };
    if ("email" in fieldValue)
      temp.email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        fieldValue.email
      )
        ? ""
        : "Email is not valid";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };


  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        VerifyUser({
          email: state.email,
          OTP: values.otp,
        })
      );
      if (res.payload.status === "success") {
        setDisableCom(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        ResetPasswords({
          email: state.email,
          password: values.password,
        })
      );
      if (res.payload.msg === "New password successfully updated") {
        toast.success(res.payload.msg);
        navigate("/sign_in");
      }
    } catch (error) {
      console.log("error", error);
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
            <form onSubmit={handleForgotPassword}>
              <div className=" mx-auto">
                <input
                  className="form-control mt-3 custom-form"
                  placeholder="Enter OTP"
                  name="otp"
                  onChange={handleInputChange}
                  value={values.otp}
                />
                {errors.otp ? <p style={{ color: 'red' }}>{errors.otp}</p> : null}
              </div>
              <div className="form-actions form-wrapper form-group mt-3" id="edit-actions">
                <button
                  type="submit"
                  id="edit-submit"
                  name="op"
                  value="Create new account"
                  className="btn btn-success form-submit"
                >
                  Verify OTP
                </button>

              </div>
            </form>
            <div className="row">
              <form onSubmit={handleResetPassword}>
                <div className=" mx-auto">
                  <input
                    type="password"
                    className="form-control mt-3 custom-form"
                    placeholder="Enter New Password"
                    name="password"
                    onChange={handleInputChange}
                    value={values.password}
                    disabled={disableComp}
                  />
                  {errors.password ? <p style={{ color: 'red' }}>{errors.password}</p> : null}
                </div>
                <div className="form-actions form-wrapper form-group mt-3" id="edit-actions">
                  <button
                    type="submit"
                    id="edit-submit"
                    name="op"
                    value="Create new account"
                    className="btn btn-success form-submit"
                    disabled={disableComp}
                  >
                    Reset Password
                  </button>

                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
