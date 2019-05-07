import React from 'react';
import PageTop from '../utils/PageTop';
import {connect} from 'react-redux';

import {getBrands, getAttribute1, getAttribute2} from '../../actions/products_actions';
import CollapseCheckbox from '../utils/CollapseCheckbox';


class Shop extends React.Component {

    state={
        grid: '',
        limit: 6,
        skip: 0,
        filters: {
            brand:[],
            attribute1: [],
            attribute2: [],
            price: [],
        }
    };

    componentDidMount() {
        this.props.dispatch(getBrands());
        this.props.dispatch(getAttribute1());
        this.props.dispatch(getAttribute2());
    }

    handleFilters = (filters, category) => {
        const newFilters = {...this.state.filters};
        newFilters[category] = filters;

        this.setState({filters: newFilters});
    };


    render() {
        console.log("filters: ", this.state.filters);
        const {products} = this.props;


        return (
            <div>
                <PageTop title="Browse products"/>
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">

                            {/*====== Brands of the product model ===============*/}
                            <CollapseCheckbox
                                initState={true} /*component open(expanded) when loaded*/
                                title="Brands"
                                list={products.brands}/*a list of checkboxes: comes from redux store */
                                handleFilters={(filters) => this.handleFilters(filters, 'brand')}

                            />

                            {/*====== attribute1 of the product model =============*/}
                            <CollapseCheckbox
                                initState={false} /*component open(expanded) when loaded*/
                                title="attribute1 - Shape"
                                list={products.attribute1}/*a list of checkboxes: comes from redux store */
                                handleFilters={(filters) => this.handleFilters(filters, 'attribute1')}

                            />

                            {/*====== attribute2 of the product model =============*/}
                            <CollapseCheckbox
                                initState={false} /*component open(expanded) when loaded*/
                                title="attribute2 - Size"
                                list={products.attribute2}/*a list of checkboxes: comes from redux store */
                                handleFilters={(filters) => this.handleFilters(filters, 'attribute2')}

                            />


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