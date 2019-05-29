//showing the nav and the children

import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const links = [
    {
        name: "User account",
        linkTo: "/user/dashboard"
    },
    {
        name: "User profile",
        linkTo: "/user/user_profile"
    },
    {
        name: "Shopping Cart",
        linkTo: "/user/cart"
    },

];

//admin section of the dashboard
const admin = [
    {
        name: "Site info",
        linkTo: "/user/site_info"
    },
    {
        name: "Add a new product",
        linkTo: "/admin/add_product"
    },
    {
        name: "Manage categories",
        linkTo: "/admin/manage_categories"
    },


];

const UserLayout = (props) => {
    const generateLinks = (links) => (
        links.map((item, i) => (
            <Link to={item.linkTo}
                  key={i}
            >
                {item.name}
            </Link>
        ))
    );

    return (
        <div className="container">
            <div className="user_container ">
                <div className="user_left_nav">
                    <h2>User</h2>
                    <div className="links">
                        {generateLinks(links)}
                    </div>
                    {props.user.userData.isAdmin ?
                        <div>
                            <h2>Administrator</h2>
                            <div className="links">
                                {generateLinks(admin)}
                            </div>
                        </div>
                        : null
                    }
                </div>

                <div className="user_right">
                    {props.children}
                </div>

            </div>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user//prop: state.prop
    }
};

export default connect(mapStateToProps)(UserLayout);