import styles from "./Status.module.css";

export default function NoInternet() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>⚠</div>

      <h2>No Internet Connection</h2>
      <p>Check your connection and try again</p>

      <button
        className={styles.retryBtn}
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
    </div>
  );
}