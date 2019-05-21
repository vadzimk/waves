import React from 'react';
import FormField from '../utils/Form/FormField';
import {update, generateData, isFormValid} from "../utils/Form/formActions";

import {connect} from 'react-redux';
import {registerUser} from "../../actions/user_actions";

//dialog
import Dialog from '@material-ui/core/Dialog';

class Register extends React.Component {
    state = {
        formErr: false,
        formSuccess: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Enter your last name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email',
                },
                validation: {
                    required: true,
                    email: true,
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password',
                },
                validation: {
                    required: true,

                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            confirmPassword: {
                element: 'input',
                value: '',
                config: {
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'Confirm your password',
                },
                validation: {
                    required: true,
                    confirm: 'password',
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
        },
    };

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'register');
        this.setState({
            formErr: false,
            formdata: newFormdata,
        });
    };
    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formdata, 'register');

        const formIsValid = isFormValid(this.state.formdata, 'register');
        if (formIsValid) {
            //dispatch the action to send data to the server
            this.props.dispatch(registerUser(dataToSubmit))
                .then(response => {
                    if (response.payload.success) {
                        this.setState({
                            formErr: false,
                            formSuccess: true,
                        });
                        //redirect to the register_login route
                        setTimeout(() => {
                            this.props.history.push('/register_login');
                        }, 2000)
                    } else {
                        this.setState({formErr: true})
                    }
                })
                .catch(() => this.setState({formErr: true}));
        } else {
            this.setState({
                formErr: true,
            })
        }
    };

    render() {
        return (
            <div className="page_wrapper">
                <div className="container">
                    <div className="register_login_container">
                        <div className="left">
                            <form onSubmit={(event) => this.submitForm(event)}>
                                <h2>
                                    Personal information
                                </h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormField
                                            id={'name'}
                                            formdata={this.state.formdata.name}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                    <div className="block">
                                        <FormField
                                            id={'lastname'}
                                            formdata={this.state.formdata.lastname}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>


                                </div>
                                <div>
                                    <FormField
                                        id={'email'}
                                        formdata={this.state.formdata.email}
                                        change={(element) => this.updateForm(element)}
                                    />
                                </div>
                                <h2>
                                    Verify password
                                </h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormField
                                            id={'password'}
                                            formdata={this.state.formdata.password}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                    <div className="block">
                                        <FormField
                                            id={'confirmPassword'}
                                            formdata={this.state.formdata.confirmPassword}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>


                                </div>
                                <div>
                                    {/*submit the form*/}
                                    {this.state.formErr ?
                                        <div className="error_label">
                                            Please check your input
                                        </div>
                                        : null}
                                    <button onClick={
                                        (event) => this.submitForm(event)}>
                                        Create an account
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                <Dialog open={this.state.formSuccess}>
                    <div className="dialog_alert">
                        <div>
                            Thank you for registering.
                            Redirecting you to the LOGIN in a second
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default connect()(Register);