import styles from "./Status.module.css"; // or Youtube.module.css if you prefer

export default function EmptyState({
  title = "Nothing here",
  message = "No data available",
  showBack = false,
  onBack,
  label = "→ INFO",
}) {
  return (
    <section className={styles.yt}>
      <div className={styles.ytContainer}>
        <div className={styles.ytHeader}>
          <div>
            {showBack && (
              <button className={styles.backBtn} onClick={onBack}>
                ← Back
              </button>
            )}

            <p className={styles.sectionLabel}>{label}</p>

            <h2 className={styles.sectionTitle}>{title}</h2>

            <p className={styles.emptyText}>{message}</p>
          </div>
        </div>
      </div>
    </section>
  );
}