import styles from "./VoteAverageComponent.module.css"

type PercentageLoaderProps = {
    vote_average: number;
};

export const VoteAverageComponent = ({ vote_average }: PercentageLoaderProps) => {
    const percentage = (vote_average / 10) * 100;
    return (
        <div className={styles.container}>
        <div className={styles.background} />
    <div
    className={styles.progress}
    style={{
        background: `conic-gradient(#7c86ff ${percentage}%, #ffffff ${percentage}%)`,
    }}
    />
    <div className={styles.inner} />
    <div className={styles.text}>
        {Math.round(percentage)}%
        </div>
        </div>
);
};
