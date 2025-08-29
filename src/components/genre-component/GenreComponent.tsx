"use client";

import React, { FC } from "react";
import styles from "./GenreComponent.module.css";

import {IGenre} from "@/models/IGenre";





type GenreProps = {
    onChangeAction: (genreId: number | null) => void;
    value?: number | null;
    genres: IGenre[]; // ⬅️ новий пропс
};

export const GenreComponent: FC<GenreProps> = ({ onChangeAction, value, genres }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        onChangeAction(val ? Number(val) : null);
    };

    return (
        <div className={styles.container}>
            <label htmlFor="genreSelect" className={styles.label}>
                Choose genre
            </label>
            <select
                id="genreSelect"
                value={value ?? ""}
                onChange={handleChange}
                className={styles.select}
            >
                <option value="">All genres</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
