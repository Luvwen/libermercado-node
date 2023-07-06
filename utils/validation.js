const validation = {
    isEmpty: (field) => {
        return field.length === 0 ? true : false;
    },
    checkLength: (field, min, max) => {
        return field.length > min && field.length < max ? true : false;
    },
    isEmail: (email) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return email.match(emailRegex) ? true : false;
    },
    comparePassword: (password, password2) => {
        return password === password2 ? true : false;
    },
    isNumber: (field) => {
        if (!isNaN(field) && field !== '') {
            return true;
        } else {
            return false;
        }
    },
};

module.exports = validation;
