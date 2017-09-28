import Validation from "../form/validation/validation"

/**
 * @function LoginValidate
 * @return {string || null} возвращает null если ошибок нет
 */
function LoginValidate(login, password) {
    let errors = [];
    const loginValidation = Validation.validateLogin(login);
    if (loginValidation !== true) {
        errors.push({field: 'password', error: loginValidation});
    }

    const passwordValidation = Validation.validatePassword(password);
    if (passwordValidation !== true) {
        errors.push({field: 'password', error: passwordValidation});
    }


    if (errors.length === 0) {
        return null
    }

    let result = "";
    errors.forEach((item) => {
        result += '\n' + item.error
    });
    return result

}

export default LoginValidate