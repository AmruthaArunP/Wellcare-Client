export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const validateMobileNumber = (mobile) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(mobile);
}

export const validatePassword = (password) =>{
         // At least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
        const regex = /^([1-9])$/;
        //const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
           
}

export const validateCapitalLetter = (input) => {
    var firstCharacter = input.charAt(0);
    var regex = /^[A-Z]$/;
    return regex.test(firstCharacter);
  };