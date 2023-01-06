import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../Types/Types";
import {ThunkType} from "../../redux/profile-reducer";

type PropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
    savePhoto: (photoFile: File) => void
    saveProfile: (profile: ProfileType) => Promise<ThunkType>
}

const Profile = (props: PropsType) => {
    return (
        <div className={s.profile}>
            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                isOwner={props.isOwner}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
            />
            <MyPostsContainer status={null} newPostText={""} currentProfile={null} />
        </div>
    );
};

export default Profile;
