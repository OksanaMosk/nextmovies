"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import styles from "./SearchComponent.module.css";

export const SearchComponent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const queryInUrl = searchParams.get("query") || "";
    const [searchText, setSearchText] = useState(queryInUrl);

    useEffect(() => {
        setSearchText(queryInUrl);
    }, [queryInUrl]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const params = new URLSearchParams();

        if (searchText.trim()) {
            params.set("query", searchText.trim());
            params.set("pg", "1");
            router.push(`/movies?${params.toString()}`);
        } else {
            router.push("/movies");
        }
    };

    const handleClear = () => {
        setSearchText("");
        router.push("/movies");
    };

    return (
        <div className={styles.container}>
            <label htmlFor="movieSearch" className={`sort-label ${styles.label}`}>
                Search for movies
            </label>
            <form onSubmit={handleSearch} className={styles.form}>
                <div className={styles.inputWrapper}>
                    <input
                        id="movieSearch"
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Find..."
                        className={`search-input ${styles.input}`}
                    />
                    <button type="submit" className={`search-button ${styles.button}`}>
                        🔍︎
                    </button>
                </div>

                {queryInUrl && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className={`search-clearButton ${styles.clearButton}`}
                    >
                        Clear search
                    </button>
                )}
            </form>
        </div>
    );
};
