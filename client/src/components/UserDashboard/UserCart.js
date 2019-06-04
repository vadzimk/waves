import React from 'react';
import UserLayout from '../../hoc/UserLayout';
import {connect} from 'react-redux';
import {getCartItems, removeCartItem} from "../../actions/user_actions";
import CartBlock from '../utils/User/CartBlock';


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
                    .then(()=>{
                        if(this.props.user.cartDetail.length){
                            this.calculateTotal(this.props.user.cartDetail);
                        }
                    })
            }
        }
    }

    calculateTotal=(cartDetail)=>{
        let total =0;
        cartDetail.forEach(item=>{
            total +=parseInt(item.price, 10)*item.quantity;
        });

        this.setState({
            total: total,
            showTotal: true
        })
    };

    showNoItemsMessage=()=>(
        <div className="cart_no_items">
            No items in the cart yet
        </div>
    );

    removeFromCart=(id)=>{
        //removes item from cart
        this.props.dispatch(removeCartItem(id))
            .then(()=>{
                if(this.props.user.cartDetail.length===0){
                    this.setState({
                        showTotal: false
                    });
                } else {
                    this.calculateTotal(this.props.user.cartDetail);
                }
            });
    };



    render() {
        return (
            <UserLayout>
                <div>
                    <h1>Shopping Cart</h1>
                    <div className="user_cart">
                        <CartBlock
                            products={this.props.user}
                            type="cart"
                            removeItem={(id)=>this.removeFromCart(id)}
                        />
                        {this.state.showTotal ?
                            <div className="user_cart_sum">
                                <div>
                                    Total amount: ${this.state.total}
                                </div>
                            </div>

                            : this.state.showSuccess ?
                                <div className="cart_success">
                                    <div>
                                        Order has been placed
                                    </div>
                                </div>
                            :this.showNoItemsMessage()
                        }
                    </div>
                    {this.state.showTotal ?
                        <div className="paypal_button_container">
                            Paypal
                        </div>
                        :null
                    }
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