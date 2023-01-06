export type FieldValidatorType = (value: string) => string | undefined

export const requiredField: FieldValidatorType= (value) => {
    if (value) return undefined;
    return "error message";

}

export const maxLengthCreator = (maxLength: number) :FieldValidatorType => {
    return (value) => {
        if (value && value.length > maxLength) return `max length is ${maxLength} symbols`;
        return undefined;
    }
}