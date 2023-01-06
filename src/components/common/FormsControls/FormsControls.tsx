// @ts-ignore
import s from "./FormsControls.module.css";
import React from "react";
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";

type FormControlParamsType = {
    meta: WrappedFieldMetaProps
    input: any
    children: JSX.Element
}


const FormControl: React.FC<FormControlParamsType> = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;

    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>{props.children}</div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
};


export const TextArea: React.FC <WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps} />
        </FormControl>
    );
};

export const Input: React.FC <WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>
    );
};

// рабочий вариант
// export const TextArea = ({ input, meta, ...props }) => {
//   //рест оператор

//   const hasError = meta.touched && meta.error;

//   return (
//     <div className={s.formControl + " " + (hasError ? s.error : "")}>
//       <div>
//         <textarea {...input} {...props} />
//       </div>
//       {hasError && <span>{meta.error}</span>}
//     </div>
//   );
// };
