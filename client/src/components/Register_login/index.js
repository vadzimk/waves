import React from 'react';
import MyButton from '../utils/MyButton';
import Login from './login';

const RegisterLogin = () => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h1>New Customers</h1>
                        <p>Accentors velum in tolosa!A falsis, hilotae talis repressor.Sunt fiscinaes promissio
                            rusticus, gratis calceuses.Cur amicitia mori?A falsis, deus albus humani generis.</p>

                        <MyButton
                            type="default"
                            title="Create an account"
                            linkTo="/register"
                            addStyles={{margin: '10px 0 0 0'}}
                        />

                    </div>
                    <div className="right">
                        <h2>Registered customers</h2>
                        <p>Login If you have an account.</p>
                        <Login/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterLogin;