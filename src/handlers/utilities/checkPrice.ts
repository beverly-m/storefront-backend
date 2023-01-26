const isValidPrice = (value: number): boolean => {
    let valid = true;
    // check if value is == 0 or a negative number
    if (value <= 0) {
        valid = false;
    }
    return valid;
};

export default isValidPrice;
