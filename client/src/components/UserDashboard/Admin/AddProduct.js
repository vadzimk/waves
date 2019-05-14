import React from 'react';
import UserLayout from '../../../hoc/UserLayout';
import FormField from '../../utils/Form/formField';
import {update, generateData, isFormValid} from "../../utils/Form/formActions";
import {connect} from 'react-redux';
import {getBrands, getAttribute1, getAttribute2} from "../../../actions/products_actions";

class AddProduct extends React.Component {

    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter product name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            description: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Product description',
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Enter product description'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            price: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product price',
                    name: 'price_input',
                    type: 'number',
                    placeholder: 'Enter product price'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            brand: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product Brand',
                    name: 'brands_input',
                    options: [],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            shipping: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product Shipping',
                    name: 'shipping_input',
                    options: [
                        {
                            key: true,
                            value: 'Yes'
                        },
                        {
                            key: false,
                            value: 'No'
                        }
                    ],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            available: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product Available',
                    name: 'available_input',
                    options: [
                        {
                            key: true,
                            value: 'Yes'
                        },
                        {
                            key: false,
                            value: 'No'
                        }
                    ],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            attribute1: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product attribute1',
                    name: 'attribute1_input',
                    options: [],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            attribute2: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product attribute2',
                    name: 'attribute2_input',
                    options: [],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            publish: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product Publish',
                    name: 'publish_input',
                    options: [
                        {
                            key: true,
                            value: 'Published'
                        },
                        {
                            key: false,
                            value: 'Not Published'
                        }
                    ],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
        }
    };

    submitForm=(event)=>{

    };

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>Add product</h1>
                    <form onSubmit={(e)=>this.submitForm()}>
                        <FormField
                            id={'name'}
                            formdata={this.state.formdata.name}
                            change={(element) => this.updateForm(element)}
                        />

                    </form>
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products //prop: state.prop
    };
};
export default connect(mapStateToProps)(AddProduct);