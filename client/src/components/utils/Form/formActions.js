export const validate = (element, formdata = []) => {
    //by default the input will be valid (true) and error msg =''
    let error = [true, ''];

    if (element.validation.email) {
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = !valid ? 'Must be a valid email' : '';
        error = !valid ? [valid, message] : error;
    }
    if (element.validation.required) {
        //trim the value of the value of the element and check if it's empty
        const valid = element.value.trim() !== '';
        const message = !valid ? 'This field is required' : '';
        error = !valid ? [valid, message] : error;
    }
    return error;
};


export const update = (element, formdata, formName) => {
    const newFormdata = {
        ...formdata,
    };

    const newElement = {
        ...newFormdata[element.id],
    };

    newElement.value = element.event.target.value;

    if (element.blur) {
        let validData = validate(newElement, formdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }
    newElement.touched = element.blur;
    newFormdata[element.id] = newElement;
    return newFormdata;
};

export const generateData = (formdata, formName) => {
    let dataToSubmit = {};
    for (let key in formdata) {
        dataToSubmit[key] = formdata[key].value;
    }
    return dataToSubmit;
};

export const isFormValid = (formdata, formName) => {
    let formIsValid = true;
    for(let key in formdata){
formIsValid = formdata[key].valid && formIsValid;
    }

    return formIsValid;
};