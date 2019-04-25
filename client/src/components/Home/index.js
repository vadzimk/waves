import React from 'react';
import HomeSlider from './HomeSlider';
import HomePromotion from "./HomePromotion";
import CardBlock from '../utils/CardBlock';

import {connect} from 'react-redux';
import {getProductsBySell, getProductsByArrival} from "../../actions/products_actions";

class Home extends React.Component {

    componentDidMount(){
        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());
        //console.log(this.props.products);
    }
    render() {
        return (
            <div>
                <HomeSlider/>
                <CardBlock
                list={this.props.products.bySell}
                title='Best selling products'/>
                <HomePromotion/>
                <CardBlock
                list={this.props.products.byArrival}
                title='New arrivals'/>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    console.log("state.products ", state.products);
    return {
        products: state.products
    };
};

export default connect(mapStateToProps)(Home);