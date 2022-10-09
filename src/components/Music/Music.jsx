import s from "./Music.module.css";
const Music = () => {
  return (
    <div className={s.item}>
      <iframe
        src={"http://radio-online.com.ua/rns/rns_all.php"}
        style={{ height: 600 }}
      />
    </div>
  );
};

export default Music;
