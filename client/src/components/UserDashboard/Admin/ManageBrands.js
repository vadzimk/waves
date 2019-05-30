import React from 'react';
import {update, generateData, isFormValid, resetFields} from "../../utils/Form/formActions";
import {connect} from 'react-redux';
import {getBrands, addBrand, clearProduct, clearBrand} from "../../../actions/products_actions";
import FormField from "../../utils/Form/FormField";

class ManageBrands extends React.Component {
    state = {
        formErr: false,
        formSuccess: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {

                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter Brand name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',

            },
        },
    };

    //make a server request to fetch a list of brands and put them inside props and iterate over props to display the list
    showCategoryItems = () => (

        this.props.products.brands ?
            this.props.products.brands.map((item, i) => (
                <div className="category_item" key={item._id}>
                    {item.name}
                </div>
            ))
            : null
    );

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'brands');
        this.setState({
            formErr: false,
            formdata: newFormdata,
        });
    };

    resetFieldsHandler = () => {
        //Resets all form fields when form is submitted successfully
        const newFormData = resetFields(this.state.formdata, 'brands');

        this.setState({
            formSuccess: true,
            formdata: newFormData,
        });
        setTimeout(() => {
            this.setState({
                formSuccess: false,
            },()=>{
                this.props.dispatch(clearBrand())
            })
        }, 3000);
    };

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'brands');
        let formIsValid = isFormValid(this.state.formdata, 'brands');
        let existingBrands = this.props.products.brands;

        if(formIsValid){
            this.props.dispatch(addBrand(dataToSubmit, existingBrands)).then(response=>{
                if(response.payload.success){
this.resetFieldsHandler();
                }else{
this.setState({formErr: true});
                }
            })
        } else {
            this.setState({
                formErr: true
            })
        }
    };

    componentDidMount = () => {
        this.props.dispatch(getBrands());
    };

//there is no function to delete brands, can implement it later

    render() {
        return (
            <div className="admin_category_wrapper">
                <h1>
                    Brands
                </h1>
                <div className="admin_two_column">
                    <div className="left">
                        <div className="brands_container">
                            {this.showCategoryItems()}
                        </div>

                    </div>
                    <div className="right">
                        <form>
                            <FormField
                                id={'name'}
                                formdata={this.state.formdata.name}
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
                                <div>
                                    Please check your data
                                </div>
                                : null}
                            <button onClick={(event) => this.submitForm(event)}>
                                Add Brand
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
    }
};

export default connect(mapStateToProps)(ManageBrands);