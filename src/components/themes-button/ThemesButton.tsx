"use client"

import { useTheme } from "next-themes";
import {useEffect, useState} from "react";
import Image from "next/image";
import styles from "./ThemesButton.module.css";


const ThemesButton = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={styles.theme}
        >
            <Image
                src={theme === "light" ? "/images/dark.png" : "/images/light.png"}
                alt={theme === "light" ? "Dark Theme" : "Light Theme"}
                width={60}
                height={60}
                style={{ width: 60, height: 60}}
            />
        </button>
    );
};

export default ThemesButton;
