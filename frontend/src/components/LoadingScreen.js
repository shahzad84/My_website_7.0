import styles from "./Status.module.css";

export default function LoadingScreen() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}></div>

      <h2>Loading content...</h2>
      <p>Please wait while we fetch data</p>
    </div>
  );
}