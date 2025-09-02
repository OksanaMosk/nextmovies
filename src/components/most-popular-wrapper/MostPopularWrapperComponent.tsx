"use client";

import React, { useState } from "react";
import GsapAnimationComponent from "@/components/gsap-animation-component/GsapAnimationComponent";
import styles from "./MostPopularWrapperComponent.module.css"

type Props = {
    children: React.ReactNode;
};

export default function MostPopularWrapper({ children }: Props) {
    const [animationFinished, setAnimationFinished] = useState(false);

    return (
        <>
            <div className={styles.titleWrapper}>
                <h1 className={`mainTitle ${styles.mainTitle}`}>Top 10 movies today</h1>
            </div>
            {!animationFinished && (
                <GsapAnimationComponent onAnimationEnd={() => setAnimationFinished(true)} />
            )}
            {animationFinished && (
                <div className={styles.fadeIn}>
                    {children}
                </div>
            )}
        </>
    );
}
