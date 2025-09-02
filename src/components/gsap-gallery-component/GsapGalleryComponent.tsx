"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import styles from "./GsapGalleryComponent.module.css";
import Image from "next/image";
import { IMovie } from "@/models/IMovie";

gsap.registerPlugin(Observer);

interface Props {
    movies: IMovie[];
}

export default function GsapGalleryComponent({ movies }: Props) {
    const sectionRefs = useRef<HTMLElement[]>([]);
    const imageRefs = useRef<HTMLImageElement[]>([]);
    const slideImageRefs = useRef<HTMLImageElement[]>([]);
    const outerWrappers = useRef<HTMLDivElement[]>([]);
    const innerWrappers = useRef<HTMLDivElement[]>([]);
    const countRef = useRef<HTMLSpanElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const wrap = gsap.utils.wrap(0, movies.length);

    const setRef = <T extends HTMLElement>(
        refArray: React.MutableRefObject<T[]>,
        index: number
    ) => {
        return (el: T | null) => {
            if (el) refArray.current[index] = el;
        };
    };

    const gotoSection = useCallback(
        (index: number, direction: number) => {
            setAnimating(true);
            index = wrap(index);

            const tl = gsap.timeline({
                defaults: { duration: 2, ease: "expo.inOut" },
                onComplete: () => {
                    setAnimating(false);

                    // ✅ Повернути всі попередні великі картинки назад
                    imageRefs.current.forEach((img, i) => {
                        if (i !== index) {
                            gsap.set(img, {
                                xPercent: 0,
                                autoAlpha: 0,
                                zIndex: 0
                            });
                        }
                    });

                    sectionRefs.current.forEach((sec, i) => {
                        const h = sec.querySelector(`.${styles.slideheading}`) as HTMLElement;
                        if (i !== index && h) {
                            gsap.set(h, { autoAlpha: 0 });
                        }
                    });
                },
            });

            const heading = sectionRefs.current[currentIndex]?.querySelector(
                `.${styles.slideheading}`
            ) as HTMLElement;

            const nextHeading = sectionRefs.current[index]?.querySelector(
                `.${styles.slideheading}`
            ) as HTMLElement;

            gsap.set(sectionRefs.current, { zIndex: 0, autoAlpha: 0 });
            gsap.set(sectionRefs.current[currentIndex], { zIndex: 1, autoAlpha: 1 });
            gsap.set(sectionRefs.current[index], { zIndex: 2, autoAlpha: 1 });

            gsap.set(imageRefs.current, { zIndex: 0, autoAlpha: 0 });
            gsap.set(imageRefs.current[index], { zIndex: 2, autoAlpha: 1 });
            gsap.set(imageRefs.current[currentIndex], { zIndex: 1, autoAlpha: 1 });

            tl.to(
                imageRefs.current[currentIndex],
                {
                    xPercent: -100 * direction,
                    autoAlpha: 0,
                    duration: 2,
                    ease: "power3.inOut",
                },
                0
            )
                .to(
                    heading,
                    {
                        "--width": 800,
                        xPercent: 30 * direction,
                        autoAlpha: 0,
                    } as gsap.TweenVars,
                    0.3
                )
                .fromTo(
                    nextHeading,
                    {
                        "--width": 800,
                        xPercent: -30 * direction,
                        autoAlpha: 0,
                    } as gsap.TweenVars,
                    {
                        "--width": 200,
                        xPercent: 0,
                        autoAlpha: 1,
                    } as gsap.TweenVars,
                    0.3
                )
                .fromTo(
                    outerWrappers.current[index],
                    { xPercent: 100 * direction },
                    { xPercent: 0 },
                    0.3
                )
                .fromTo(
                    innerWrappers.current[index],
                    { xPercent: -100 * direction },
                    { xPercent: 0 },
                    0.3
                )
                .fromTo(
                    slideImageRefs.current[index],
                    {
                        scale: 2,
                    },
                    { scale: 1 },
                    0.3
                );

            gsap.set(countRef.current, { textContent: String(index + 1) });
            setCurrentIndex(index);
        },
        [currentIndex, wrap]
    );

    useEffect(() => {
        if (!galleryRef.current) return;

        gsap.set(outerWrappers.current, { xPercent: 100 });
        gsap.set(innerWrappers.current, { xPercent: -100 });
        gsap.set(outerWrappers.current[0], { xPercent: 0 });
        gsap.set(innerWrappers.current[0], { xPercent: 0 });

        const scrollObserver = Observer.create({
            target: galleryRef.current,
            type: "wheel,touch,pointer",
            preventDefault: (event) => {
                const target = event.target as HTMLElement;
                // 🐞 DEBUG: подивитись, хто викликає подію
                console.log('Scroll event target:', event.target);
                const shouldIgnore = (
                    target.closest("a") ||
                    target.closest("button") ||
                    target.closest("nav") ||
                    target.closest("input") ||
                    target.closest("textarea") ||
                    target.closest(".burger") ||
                    target.closest(".menuList") ||
                    target.closest(".rightBlock")
                );


                return !shouldIgnore;
            },
            allowClicks: true,
            wheelSpeed: -1,
            tolerance: 10,
            onUp: () => !animating && gotoSection(currentIndex + 1, +1),
            onDown: () => !animating && gotoSection(currentIndex - 1, -1),
        });
        const handleKey = (e: KeyboardEvent) => {
            if (animating) return;
            if (["ArrowUp", "ArrowLeft"].includes(e.code)) {
                gotoSection(currentIndex - 1, -1);
            }
            if (["ArrowDown", "ArrowRight", "Space", "Enter"].includes(e.code)) {
                gotoSection(currentIndex + 1, +1);
            }
        };

        document.addEventListener("keydown", handleKey);

        return () => {
            scrollObserver.kill();
            document.removeEventListener("keydown", handleKey);
        };
    }, [animating, currentIndex, gotoSection]);

    return (
        <div ref={galleryRef} className={styles.containerTop}>
            {movies.map((movie, i) => (
                <section
                    key={movie.id}
                    ref={setRef(sectionRefs, i)}
                    className={styles.slide}
                >
                    <div ref={setRef(outerWrappers, i)} className={styles.slideouter}>
                        <div ref={setRef(innerWrappers, i)} className={styles.slideinner}>
                            <div className={styles.slidecontent}>
                                <div className={styles.slidecontainer}>
                                    <h2 className={`slideheading ${styles.slideheading}`}>
                                        {movie.title}
                                    </h2>
                                    <figure className={styles.slideimgcont}>
                                        <Image
                                            ref={setRef(slideImageRefs, i)}
                                            className={styles.slideimg}
                                            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                                            alt={movie.title}
                                            width={342}
                                            height={513}
                                            priority={true}
                                        />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            <section className={styles.overlay}>
                <div className={styles.overlaycontent}>
                    <p className={`count ${styles.overlaycount}`}>
            <span ref={countRef} className={`count ${styles.count}`}>
              1
            </span>
                    </p>
                    <figure className={styles.overlayimgcont}>
                        {movies.map((movie, i) => (
                            <Image
                                key={movie.id}
                                ref={setRef(imageRefs, i)}
                                className={styles.image}
                                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                alt={movie.title}
                                width={800}
                                height={1200}
                                priority={false}
                            />
                        ))}
                    </figure>
                </div>
            </section>
        </div>
    );
}
