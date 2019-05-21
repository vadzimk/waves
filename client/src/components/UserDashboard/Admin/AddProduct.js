import React from 'react';
import UserLayout from '../../../hoc/UserLayout';
import FormField from '../../utils/Form/FormField';
import {update, generateData, isFormValid, populateOptionFields, resetFields} from "../../utils/Form/formActions";
import {connect} from 'react-redux';
import {getBrands, getAttribute1, getAttribute2, addProduct, clearProduct} from "../../../actions/products_actions";
import FileUpload from '../../utils/Form/FileUpload';

class AddProduct extends React.Component {

    state = {
        formErr: false,
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
            images:{
                value: [],
                validation:{
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showLabel: false
            },
        }
    };


    updateFields = (newFormData) => {
        this.setState({
            formdata: newFormData,
        })
    };


    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'products');
        this.setState({
            formErr: false,
            formdata: newFormdata,
        });
    };

    resetFieldsHandler = () => {
        //Resets all form fields when form is submitted successfully
        const newFormData = resetFields(this.state.formdata, 'products');

        this.setState({
            formSuccess: true,
            formdata: newFormData,
        });
        setTimeout(() => {
            this.setState({
                formSuccess: false,
            },()=>{
                this.props.dispatch(clearProduct())
            })
        }, 3000);
    };

    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formdata, 'products');

        const formIsValid = isFormValid(this.state.formdata, 'products');
        if (formIsValid) {
            //dispatch the action to send data to the server
            this.props.dispatch(addProduct(dataToSubmit)).then(() => {
                if (this.props.products.addProduct.success) {
                    this.resetFieldsHandler();
                } else {
                    this.setState({formErr: true})
                }
            })
        } else {
            this.setState({
                formErr: true,
            })
        }
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

    imagesHandler=(images)=>{
//add new images to the state
        const newFormData = {
            ...this.state.formdata
        };
        newFormData['images'].value =images;
        newFormData['images'].valid =true;
        this.setState({formdata: newFormData});
    };

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>Add a new product</h1>
                    <form onSubmit={(e) => this.submitForm()}>
                        <FileUpload
                            imagesHandler={(images)=>this.imagesHandler(images)}
                            reset={this.state.formSuccess}
                        />
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