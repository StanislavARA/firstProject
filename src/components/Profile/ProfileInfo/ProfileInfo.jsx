import Preloader from "../../common/preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ava from "..//..//../assets/img/149071.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {useState} from "react";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {
   const [editMode, setEditMode] = useState(false);
   if (!props.profile) {
      return <Preloader/>;
   }

   let userPhoto = props.profile.photos.large;

   if (!userPhoto) {
      userPhoto = ava;
   }

   const onMainPhotoSelected = (e) => {
      if (e.target.files.length) {
         props.savePhoto(e.target.files[0]);
      }
   };

   const onSubmit = (formData) => {
      // в formData попадает объект с данными из формы при сабмите
      props.saveProfile(formData).then(
       () => {
          setEditMode(false) // если промис выполнится, выполнится юзстейт
       }
      );
   };


   return (
    <div>
       {/* <div className={s.header}>
        <img src="https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=2000&hei=1100&scl=1.504" />
      </div> */}
       <div className={s.desriptionBlock}>
          <img src={userPhoto}/>
          {props.isOwner && (
           <input type={"file"} onChange={onMainPhotoSelected}/>
          )}
          <ProfileStatusWithHooks
           status={props.status}
           updateStatus={props.updateStatus}
          />
          {editMode ? <ProfileDataForm initialValues={props.profile} onSubmit={onSubmit} profile={props.profile}/> :
           <ProfileData profile={props.profile} isOwner={props.isOwner} toEditMode={() => {
              setEditMode(true)
           }}/>}


       </div>
    </div>
   );
};

const ProfileData = ({profile, isOwner, toEditMode}) => {
   return (<div>

      <div>
         <b>FullName </b>: {profile.fullName}
      </div>
      <div>
         <b>Looking for a job </b>: {profile.lookingForAJob ? "yes" : "no"}
      </div>
      <div>
         <b>About me </b>: {profile.aboutMe}
      </div>
      {profile.lookingForAJob && (<div>
         <b>My professionals skills</b> : {profile.lookingForAJobDescription}
      </div>)}
      <div><b>Contacts</b>: {Object.keys(profile.contacts).map((key) => {
         return <Contact contactTitle={key} contactValue={profile.contacts[key]} key={key}/>
      })}
      </div>

      {isOwner && <div>
         <button onClick={toEditMode}>edit</button>
      </div>}

   </div>)
}


const Contact = ({contactTitle, contactValue}) => {
   return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;
