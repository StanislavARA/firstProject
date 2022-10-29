import Preloader from "../../common/preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ava from "..//..//../assets/img/149071.png";
const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }
  let userPhoto = props.profile.photos.large;
  if (!userPhoto) {
    userPhoto = ava;
  }
  return (
    <div>
      <div className={s.header}>
        <img src="https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=2000&hei=1100&scl=1.504" />
      </div>
      <div className={s.desriptionBlock}>
        <img src={userPhoto} />
        <div> {props.profile.aboutMe}</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
