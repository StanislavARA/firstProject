import s from "./ProfileInfo.module.css";

const ProfileInfo = () => {
  return (
    <div>
      <div>
        <img src="https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=2000&hei=1100&scl=1.504" />
      </div>
      <div className={s.desriptionBlock}>ava+description</div>
    </div>
  );
};

export default ProfileInfo;
