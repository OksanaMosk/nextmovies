import * as React from "react";
import styles from "./SortComponent.module.css";

type SortOption = {
    label: string;
    value: string;
};

interface Props {
    onChangeAction: (sort: string) => void;
    value: string;
}

export const sortOptions: SortOption[] = [
    { label: "All", value: "" },
    { label: "Popularity ↓", value: "popularity.desc" },
    { label: "Popularity ↑", value: "popularity.asc" },
    { label: "Rating ↓", value: "vote_average.desc" },
    { label: "Rating ↑", value: "vote_average.asc" },
    { label: "Release Date ↓", value: "release_date.desc" },
    { label: "Release Date ↑", value: "release_date.asc" },
]

export const SortComponent = ({ onChangeAction, value }: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChangeAction(e.target.value);
    };

    return (
        <div className={styles.container}>
            <label
                htmlFor="sortSelect"
                className={styles.label}
            >
                Sort by
            </label>

            <select
                id="sortSelect"
                value={value}
                onChange={handleChange}
                className={styles.select}
            >
                {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
