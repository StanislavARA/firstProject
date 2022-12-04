import {Field, reduxForm} from "redux-form";
import {Input, TextArea} from "../../common/FormsControls/FormsControls";
import {requiredField} from "../../../utils/validators/validators";
import React from "react";
import s from "./ProfileInfo.module.css";
import er from "../../common/FormsControls/FormsControls.module.css";

const ProfileDataForm = ({handleSubmit, profile, error}) => {

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

const ProfileDataReduxForm = reduxForm({form: "edit-profile"})(ProfileDataForm);

export default ProfileDataReduxForm