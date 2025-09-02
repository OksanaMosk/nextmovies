"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import Image from "next/image";
import { IMovie } from "@/models/IMovie";
import styles from "./GsapGalleryComponent.module.css";

gsap.registerPlugin(Observer);

interface Props {
    movies: IMovie[];
}

export default function GsapGalleryComponent({ movies }: Props) {

    function useArrayRefs<T extends HTMLElement>(length: number) {
        const refs = useRef<(T | null)[]>([]);

        const setRef = useCallback((index: number) => (el: T | null) => {
            refs.current[index] = el;
        }, []);

        return [refs, setRef] as const;
    }

    const [sectionRefs, setSectionRef] = useArrayRefs<HTMLElement>(movies.length);
    const [outerWrapperRefs, setOuterWrapperRef] = useArrayRefs<HTMLDivElement>(movies.length);
    const [innerWrapperRefs, setInnerWrapperRef] = useArrayRefs<HTMLDivElement>(movies.length);
    const [slideImageRefs, setSlideImageRef] = useArrayRefs<HTMLImageElement>(movies.length);
    const [imageRefs, setImageRef] = useArrayRefs<HTMLImageElement>(movies.length);

    const countRef = useRef<HTMLSpanElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const wrap = gsap.utils.wrap(0, movies.length);

    const gotoSection = useCallback(
        (index: number, direction: number) => {
            setAnimating(true);
            index = wrap(index);

            const tl = gsap.timeline({
                defaults: { duration: 2, ease: "expo.inOut" },
                onComplete: () => {
                    setAnimating(false);

                    imageRefs.current.forEach((img, i) => {
                        if (i !== index) {
                            gsap.set(img, {
                                xPercent: 0,
                                autoAlpha: 0,
                                zIndex: 0,
                            });
                        }
                    });

                    sectionRefs.current.forEach((sec, i) => {
                        if (!sec) return;
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
                    outerWrapperRefs.current[index],
                    { xPercent: 100 * direction },
                    { xPercent: 0 },
                    0.3
                )
                .fromTo(
                    innerWrapperRefs.current[index],
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

            if (countRef.current) {
                gsap.set(countRef.current, { textContent: String(index + 1) });
            }

            setCurrentIndex(index);
        },
        [currentIndex, wrap, sectionRefs, outerWrapperRefs, innerWrapperRefs, slideImageRefs, imageRefs]
    );

    useEffect(() => {
        if (!galleryRef.current) return;

        gsap.set(outerWrapperRefs.current, { xPercent: 100 });
        gsap.set(innerWrapperRefs.current, { xPercent: -100 });
        gsap.set(outerWrapperRefs.current[0], { xPercent: 0 });
        gsap.set(innerWrapperRefs.current[0], { xPercent: 0 });
        const scrollObserver = Observer.create({
            target: galleryRef.current,
            type: "wheel,touch,pointer",
            preventDefault: true,

            onWheel: (self) => {
                const originalEvent = self.event as WheelEvent | PointerEvent | TouchEvent;
                const target = originalEvent.target as HTMLElement;
                const shouldIgnore =
                    target.closest("a") ||
                    target.closest("button") ||
                    target.closest("nav") ||
                    target.closest("input") ||
                    target.closest("textarea") ||
                    target.closest(".burger") ||
                    target.closest(".menuList") ||
                    target.closest(".rightBlock");

                if (shouldIgnore) {
                    originalEvent.preventDefault = () => {};
                }
            },

            onDown: () => {
                if (!animating) gotoSection(currentIndex + 1, +1);
            },

            onUp: () => {
                if (!animating) gotoSection(currentIndex - 1, -1);
            },
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
    }, [animating, currentIndex, gotoSection, outerWrapperRefs, innerWrapperRefs]);

    return (
        <div ref={galleryRef} className={styles.containerTop}>
            {movies.map((movie, i) => (
                <section
                    key={movie.id}
                    ref={setSectionRef(i)}
                    className={styles.slide}
                >
                    <div ref={setOuterWrapperRef(i)} className={styles.slideOuter}>
                        <div ref={setInnerWrapperRef(i)} className={styles.slideInner}>
                            <div className={styles.slideContent}>
                                <div className={styles.slideContainer}>
                                    <h2 className={`slideheading ${styles.slideheading}`}>
                                        {movie.title}
                                    </h2>
                                    <figure className={styles.slideImgCont}>
                                        <Image
                                            ref={setSlideImageRef(i)}
                                            className={styles.slideImg}
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
                <div className={styles.overlayContent}>
                    <p className={`count ${styles.overlayCount}`}>
                        <span ref={countRef} className={`count ${styles.count}`}>
                            1
                        </span>
                    </p>
                    <figure className={styles.overlayImgCont}>
                        {movies.map((movie, i) => (
                            <Image
                                key={movie.id}
                                ref={setImageRef(i)}
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
