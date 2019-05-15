import React from 'react';
import UserLayout from '../../../hoc/UserLayout';
import FormField from '../../utils/Form/formField';
import {update, generateData, isFormValid, populateOptionFields} from "../../utils/Form/formActions";
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
                    label: 'Name',
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
                    label: 'Description',
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
                    label: 'Price',
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
                    label: 'Brand',
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
                    label: 'Shipping',
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
                    label: 'Available',
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
                    label: 'attribute1',
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
                    label: 'attribute2',
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
                    label: 'Publish',
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


    updateFields = (newFormData) => {
        this.setState({
            formdata: newFormData,
        })
    };

    componentDidMount() {
        const {formdata} = this.state;

        this.props.dispatch(getBrands()).then(res => {
            const newFormData = populateOptionFields(formdata, this.props.products.brands, 'brand');
            this.updateFields(newFormData)
        });

        this.props.dispatch(getAttribute1()).then(res => {
            const newFormData = populateOptionFields(formdata, this.props.products.attribute1, 'attribute1');
            this.updateFields(newFormData)
        });

        this.props.dispatch(getAttribute2()).then(res => {
            const newFormData = populateOptionFields(formdata, this.props.products.attribute2, 'attribute2');
            this.updateFields(newFormData)
        });
    }

    submitForm = (event) => {

    };

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>Add a new product</h1>
                    <form onSubmit={(e) => this.submitForm()}>
                        <FormField
                            id={'name'}
                            formdata={this.state.formdata.name}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'description'}
                            formdata={this.state.formdata.description}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'price'}
                            formdata={this.state.formdata.price}
                            change={(element) => this.updateForm(element)}
                        />
                        <div className="form_devider"></div>
                        <FormField
                            id={'brand'}
                            formdata={this.state.formdata.brand}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'shipping'}
                            formdata={this.state.formdata.shipping}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'available'}
                            formdata={this.state.formdata.available}
                            change={(element) => this.updateForm(element)}
                        />
                        <div className="form_devider"></div>
                        <FormField
                            id={'attribute1'}
                            formdata={this.state.formdata.attribute1}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'attribute2'}
                            formdata={this.state.formdata.attribute2}
                            change={(element) => this.updateForm(element)}
                        />
                        <div className="form_devider"></div>
                        <FormField
                            id={'publish'}
                            formdata={this.state.formdata.publish}
                            change={(element) => this.updateForm(element)}
                        />

                        {/*submit the form*/}

                        {this.state.formSuccess ?
                            <div className="form_success">
                                Success
                            </div>
                            : null
                        }
                        {this.state.formErr ?
                            <div className="error_label">
                                Please check your input
                            </div>
                            : null}
                        <button onClick={
                            (event) => this.submitForm(event)}>
                            Save product
                        </button>

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