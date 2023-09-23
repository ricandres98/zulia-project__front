import styles from "./styles.module.css";

const FullScreenLoader = () => {
  // const { firstLoad, setFirstLoad } = useContext(authContext);

  // useEffect(() => {
  //   if (firstLoad) {
  //     setTimeout(() => {
  //       setFirstLoad(false);
  //     }, 2000);
  //   }
  // }, []);

  return (
    <div className={styles.fullscreen}>
      <div className={styles.container}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
};

export { FullScreenLoader };
