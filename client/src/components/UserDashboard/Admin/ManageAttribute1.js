import React from 'react';
import {update, generateData, isFormValid, resetFields} from "../../utils/Form/formActions";
import {connect} from 'react-redux';
import {addAttribute1, clearAttribute1, getAttribute1} from "../../../actions/products_actions";
import FormField from "../../utils/Form/FormField";


class ManageAttribute1 extends React.Component{

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
                    placeholder: 'Enter Attribute1 value'
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

    //make a server request to fetch a list of attribute values  and put them inside props and iterate over props to display the list
    showCategoryItems = () => (

        this.props.products.attribute1 ?
            this.props.products.attribute1.map((item, i) => (
                <div className="category_item" key={item._id}>
                    {item.name}
                </div>
            ))
            : null
    );

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'attribute1');
        this.setState({
            formErr: false,
            formdata: newFormdata,
        });
    };

    resetFieldsHandler = () => {
        //Resets all form fields when form is submitted successfully
        const newFormData = resetFields(this.state.formdata, 'attribute1');

        this.setState({
            formSuccess: true,
            formdata: newFormData,
        });
        setTimeout(() => {
            this.setState({
                formSuccess: false,
            },()=>{
                this.props.dispatch(clearAttribute1())
            })
        }, 3000);
    };

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'attribute1');
        let formIsValid = isFormValid(this.state.formdata, 'attribute1');
        let existingAttribute1 = this.props.products.attribute1;

        if(formIsValid){
            this.props.dispatch(addAttribute1(dataToSubmit, existingAttribute1)).then(response=>{
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
        this.props.dispatch(getAttribute1());
    };

    render(){
        return(
            <div className="admin_category_wrapper">
                <h1>
                    Attribute1
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
                                Add Value
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

export default connect(mapStateToProps)(ManageAttribute1);