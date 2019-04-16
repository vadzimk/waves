import React from 'react';

//will use connect from Redux because will dispatch an action to fetch from the server whatever the auth returns - all the information about the user including if he is an admin if he is authenticated
import {connect} from 'react-redux';
import {authenticateUser} from "../actions/user_actions";


import CircularProgress from '@material-ui/core/CircularProgress';


export default (ComposedClass, reload, adminRoute = null) => {
    //Does authentication check
    class Auth extends React.Component {

        state = {
            loading: true,
        };

        componentDidMount() {
            this.props.dispatch(authenticateUser())
                .then(res => {
                    let user = this.props.user.userData;
                    console.log(user);

                    if (!user.isAuth) {
                        //if user is not authenticated and it is a complete private route (reload == true)
                        if (reload) {
                            this.props.history.push('/register_login');
                        }
                    } else {
                        if (adminRoute && !user.isAdmin) {
                            this.props.history.push('/user/dashboard');
                        } else {


                            //if the user is authenticated go to the dashboard
                            if (!reload) {
                                this.props.history.push('/user/dashboard');
                            }
                        }
                    }

                    this.setState({
                        loading: false,
                    })
                });
        }

        render() {
            if (this.state.loading) {
                return (
                    <div className="main_loader">
                        <CircularProgress style={{color: '#3c3f41'}} thickness={7}/>
                    </div>
                )
            }

            return (
                <div>
                    <ComposedClass {...this.props} user={this.props.user}/>
                </div>
            );
        }
    }

    const mapStateToProps = (state) => {
        return {
            user: state.user,
        };
    };

    return connect(mapStateToProps)(Auth);
}

