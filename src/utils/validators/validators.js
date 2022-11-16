export const requiredField = (value) => {
    if (value) return undefined;
    return "error message";

}

export const maxLengthCreator = (maxLength) => {
    return (value) => {
        if (value && value.length > maxLength) return `max length is ${maxLength} symbols`;
        return undefined;
    }
}