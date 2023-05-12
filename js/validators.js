function validate_email(email) {
    const re =  /^\S+@\S+\.\S+$/
    return re.test(email)
}

function validate_password(password) {
    const re = /\w{6,}/
    return re.test(password)
}

export {validate_email, validate_password}