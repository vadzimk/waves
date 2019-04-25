import React from 'react';
import HomeSlider from './HomeSlider'
import HomePromotion from "./HomePromotion";

import {connect} from 'react-redux';
import {getProductsBySell, getProductsByArrival} from "../../actions/products_actions";

class Home extends React.Component {

    componentDidMount(){
        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());
    }
    render() {
        return (
            <div>
                <HomeSlider/>
                <HomePromotion/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps)=>{
    return {
        product: state.product
    };
};

export default connect(mapStateToProps)(Home);