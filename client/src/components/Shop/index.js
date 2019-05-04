import React from 'react';
import PageTop from '../utils/PageTop';
import {connect} from 'react-redux';

import {getBrands, getAttribute_name} from '../../actions/products_actions';

class Shop extends React.Component {

    componentDidMount(){
        this.props.dispatch(getBrands());
        this.props.dispatch(getAttribute_name());
    }


    render() {

        const {products} =this.props;

        return (
            <div>
                <PageTop title="Browse products"/>
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
left
                        </div>
                        <div className="right">
right
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        products: state.products,
    };
};
export default connect(mapStateToProps)(Shop);