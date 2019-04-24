import React from 'react';
import {Link, withRouter} from 'react-router-dom'; //withRouter is bringing the history object to props by wrapping the Header component with withRouter in the connect function
import {connect} from 'react-redux';
import {logOutUser} from "../../actions/user_actions";

class Header extends React.Component {
    state = {
        page: [
            {
                name: 'Home',
                linkTo: '/',
                public: true,
            },
            {
                name: 'Shop',
                linkTo: '/shop',
                public: true,
            }
        ],
        user: [
            {
                name: 'My Cart',
                linkTo: '/user/cart',
                public: false,
            },
            {
                name: 'My Account',
                linkTo: '/user/dashboard',
                public: false,
            },
            {
                name: 'LogIn',
                linkTo: '/user/register_login',
                public: true,
            },
            {
                name: 'LogOut',
                linkTo: '/user/logout',
                public: false,
            }

        ]
    };

    logOutHandler = () => {
//there is a route on the server that is listening for this logouthandler
//it will destroy the token

        this.props.dispatch(logOutUser()).then(res => {
            if (res.payload.success) {
                this.props.history.push('/');
            }
        })
    };

    cartLink = (item, i) => {
        const user = this.props.user.userData;
        return (
            <div className="cart_link" key={i}>
                <span>{user.cart ? user.cart.length : 0}</span>
                <Link
                    to={item.linkTo}>
                    {item.name}
                </Link>
            </div>
        );
    };

    defaultLink = (item, i) => (
        item.name === 'LogOut'
            ? <div
                className="log_out_link"
                key={i}
                onClick={() => this.logOutHandler()}
            >
                {item.name}
            </div>
            : <Link
                to={item.linkTo}
                key={i}>
                {item.name}
            </Link>
    );

    showLinks = (type) => {
        let list = [];
        if (this.props.user.userData) {
            type.forEach((item) => {
                if (!this.props.user.userData.isAuth) {
                    //if the user is not authenticated, check weather the page (item) is public
                    if (item.public) {
                        list.push(item)
                    }
                } else {
                    if (item.name !== 'LogIn') {
                        list.push(item);
                    }
                }
            });
        }

        return list.map((item, i) => {
            if (item.name !== "My Cart") {
                return this.defaultLink(item, i);
            } else {
                return this.cartLink(item, i);
            }

        });
    };

    render() {
        return (
            <header className="bck_b_light">
                <div className="container">
                    <div className="left">
                        <div className="logo">
                            B.Logo
                        </div>
                    </div>
                    <div className="right">
                        <div className="top">
                            {this.showLinks(this.state.user)}
                        </div>
                        <div className="bottom">
                            {this.showLinks(this.state.page)}
                        </div>
                    </div>
                </div>

            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(withRouter(Header));