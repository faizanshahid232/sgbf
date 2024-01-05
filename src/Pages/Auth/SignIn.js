import React, { useState } from 'react'
import img from '../../Assets/sgbf-logo_0.png'
import { Link } from 'react-router-dom'
const SignIn = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.log('Please enter all fields');
      return;
    }
    const data = {
      email,
      password
    }
  }
  return (
    <div id="singin">
      <div className="col-md-4 col-sm-12 mx-auto p-5">
        <Link to="/">
          <img src={img} height="100" width="100%" />
        </Link>
        <div className="col- md-8 mx-auto singin-card">
          {/* <div className="alert alert-success">
            {{ Session::get('Oppes')}}
          </div> */}
          <div className="row tb_1" style={{ background: "#fff;", padding: "30px" }}>
            <form>
              <div className=" mx-auto">
                <h1 className="mb-5 mx-auto"></h1>
                <input type="email" className="form-control mt-3 custom-form" placeholder="Email" name="email" />
                <input type="password" className="form-control mt-3 custom-form" placeholder="Password"
                  name="password" />
              </div>
              <div className="form-actions form-wrapper form-group mt-5" id="edit-actions">
                <button type="submit" id="edit-submit" name="op" value="Create new account"
                  className="btn btn-success form-submit">Login
                </button>
              </div>
              <div className="row">
                <div className="col-md-6 mx-auto col-sm-12 mt-5">
                  <Link to="/register"><h6><u>Register</u></h6></Link>
                </div>
                <a href="" className="btn btn-google btn-user btn-block">
                  < i className="fab fa-google"></i> Login with Google
                </a>
              </div>
            </form >
          </div >
        </div >
      </div >
    </div >
  )
}

export default SignIn