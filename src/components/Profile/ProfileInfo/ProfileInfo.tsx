import Preloader from "../../common/preloader/Preloader";
//@ts-ignore
import s from "./ProfileInfo.module.css";
//@ts-ignore
import ava from "..//..//../assets/img/149071.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import React, {ChangeEvent, useState} from "react";
import ProfileDataForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../Types/Types";
import {ThunkType} from "../../../redux/profile-reducer";



type PropsType = {
   profile: ProfileType
   isOwner: boolean
   savePhoto: (photoFile:File)=>void
   saveProfile: (profile: ProfileType)=>Promise<ThunkType>
   status: string
   updateStatus: (status: string)=> void


}
const ProfileInfo: React.FC<PropsType>  = (props) => {
   const [editMode, setEditMode] = useState(false);
   if (!props.profile) {
      return <Preloader/>;
   }

   let userPhoto = props.profile.photos.large;

   if (!userPhoto) {
      userPhoto = ava;
   }

   const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
         props.savePhoto(e.target.files[0]);
      }
   };

   const onSubmit = (formData: ProfileType)=> {
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
          {/*//@ts-ignore*/}
          {editMode ? <ProfileDataForm initialValues={props.profile} onSubmit={onSubmit} profile={props.profile}/> :
           <ProfileData profile={props.profile} isOwner={props.isOwner} toEditMode={() => {
              setEditMode(true)
           }}/>}


       </div>
    </div>
   );
};
type ProfileDataPropsType = {
   profile: ProfileType
   isOwner: boolean
   toEditMode: ()=>void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, toEditMode}) => {
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
         return <Contact contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} key={key}/>
      })}
      </div>

      {isOwner && <div>
         <button onClick={toEditMode}>edit</button>
      </div>}

   </div>)
}

type ContactPropsType= {
   contactTitle: string
   contactValue: string
}

const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
   return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;
