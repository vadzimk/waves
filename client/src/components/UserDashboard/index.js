import React from 'react';
import UserLayout from '../../hoc/UserLayout';
import MyButton from '../utils/MyButton';

const UserDashboard = () => {
    return (
        <UserLayout>
            <div>
                <div className="user_nfo_panel">
                    <h1>User information</h1>
                    <div>
                        <span>Name</span>
                        <span>Last name</span>
                        <span>Email</span>
                    </div>
                    <MyButton
                        type="default"
                        title="Edit account info"
                        linkTo="/user/user_profile"
                    />
                </div>
                <div className="user_nfo_panel">
                    <h1>History of purchases</h1>
                    <div className="user_product_block_wrapper">
                        history
                    </div>

                </div>
            </div>
        </UserLayout>
    );

};

export default UserDashboard;