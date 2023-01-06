import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input, TextArea} from "../../common/FormsControls/FormsControls";
import {requiredField} from "../../../utils/validators/validators";
import React from "react";
//@ts-ignore
import s from "./ProfileInfo.module.css";
//@ts-ignore
import er from "../../common/FormsControls/FormsControls.module.css";
import {ContactsType, ProfileType} from "../../../Types/Types";

type PropsType = {
    profile: ProfileType
    error: string
    }
type ProfileFormValuesType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string

}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileFormValuesType, PropsType> & PropsType> = ({
                                                                                                         handleSubmit,
                                                                                                         profile,
                                                                                                         error
                                                                                                     }) => {

    return <form onSubmit={handleSubmit}>

        <div>
            <b>FullName </b>: <Field
            placeholder="fullName"
            name="fullName"
            component={Input}
            validate={[requiredField]}
        />
        </div>

        <div>
            <b>Looking for a job </b>: <Field
            name="lookingForAJob"
            component={Input}
            type="checkbox"
        />
        </div>

        <div>
            <b>My professionals skills</b>: <Field
            placeholder="My professionals skills"
            name="lookingForAJobDescription"
            component={TextArea}
            validate={[requiredField]}
        />
        </div>

        <div>
            <b>About me</b>: <Field
            placeholder="About me"
            name="aboutMe"
            component={TextArea}
            validate={[requiredField]}
        />
        </div>

        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map((key) => {
            return <div key={key} className={s.contact}>
                <b>{key}: <Field
                    name={"contacts." + key}
                    component={Input}
                /> </b>
            </div>
        })}
        </div>
        {error && <div className={er.formSummaryError}>{error}</div>}

        <button>save</button>

    </form>
}

const ProfileDataReduxForm = reduxForm<ProfileFormValuesType, PropsType>({form: "edit-profile"})(ProfileDataForm);

export default ProfileDataReduxForm