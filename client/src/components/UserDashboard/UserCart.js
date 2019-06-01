import React from 'react';
import UserLayout from '../../hoc/UserLayout';
import {connect} from 'react-redux';
import {getCartItems} from "../../actions/user_actions";


import FontAwsomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';



class UserCart extends React.Component {

    state={
        loading: true,
        total: 0,
        showTotal: false,
        showSuccess: false,
    };

    componentDidMount(){
        let cartItems = [];
        let user = this.props.user;
        if(user.userData.cart){
            if(user.userData.cart.length>0){
                user.userData.cart.forEach(item=>{
                    cartItems.push(item.id)
                });
                this.props.dispatch(getCartItems(cartItems, user.userData.cart))
            }
        }
    }


    render() {
        return (
            <UserLayout>
                <div>
                    Cart
                </div>
            </UserLayout>

        );
    }
}
const mapStateToProps=(state)=>{
    return{
        user: state.user,
    };
};
export default connect(mapStateToProps)(UserCart);