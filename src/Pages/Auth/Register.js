import React, { useState } from 'react'
import img from '../../Assets/sgbf-logo_0.png'
import { Link } from 'react-router-dom'

const Register = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !first_name || !last_name || !password) {
            console.log("Please enter all required fields");
            return;
        }
        const data = {
            first_name,
            last_name,
            email,
            password
        }
    }

    return (
        <div id="register" className="w3-container city">
            <div className="col-5 offset-4">
                <div className="text-center pt-5">
                    <Link to="/">
                        <img src={img} height="100" width="100%" />
                    </Link>
                </div>
                <div className="col-md-10 mx-auto register-card">
                    <div className="row tb_1" style={{ background: "#fff;", padding: "30px;", borderBottom: "1px solid lightgrey" }}  >
                        {/* <div className="alert alert-success">
                            {{ Session::get('success')}}
                        </div> */}
                        <form>
                            <div className=" mx-auto">
                                <div className="text-center">
                                    <h1>Register</h1>
                                </div>
                                <input type="email" className="form-control mt-3 custom-form" placeholder="Email" name="email" />
                                <input type="text" className="form-control mt-3 custom-form" placeholder="First Name" name="first_name" />
                                <input type="text" className="form-control mt-3 custom-form" placeholder="Last Name" name="last_name" />
                                <input type="password" className="form-control mt-3 custom-form" placeholder="Password" name="password" />
                            </div>
                            <div className="form-actions form-wrapper form-group mt-5" id="edit-actions">
                                <button type="submit" id="edit-submit" name="op" value="Create new account" className="btn btn-success form-submit">Register</button>
                            </div>
                        </form>
                    </div>
                    <div className="row bg-white p-3">
                        <div className="col-md-10 col-sm-12  mx-auto">

                            <Link to="/sign_in" style={{ color: "#DF5A49;", fontWeight: "bold;", textDecoration: "none" }}>Login</Link>
                        </div>
                        < div className="col-md-6 col-sm-12 text-center" >
                            <Link href="#" style={{ color: "#DF5A49;", fontWeight: "bold;", textDecoration: "none" }}>Forgot password</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register