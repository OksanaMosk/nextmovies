"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import styles from "./GsapAnimationComponent.module.css";

gsap.registerPlugin(Physics2DPlugin);

interface CellWithPosition extends HTMLElement {
    center_position?: { x: number; y: number };
}

interface Props {
    onAnimationEnd?: () => void;
}

export default function GsapAnimationComponent({ onAnimationEnd }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const clickedRef = useRef(false);
    const cellsRef = useRef<CellWithPosition[]>([]);
    const interactionActiveRef = useRef(true);

    const CELL_SIZE = 24;
    const RADIUS = 250;
    const PULL_DISTANCE = 150;

    const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

    // ✅ Функція розрахунку позицій
    const calculatePositions = () => {
        const centerX = window.innerWidth / 2;
        const containerHeight = window.innerHeight * 0.68;
        const topOffset = 0;
        const centerY = topOffset + containerHeight / 2;

        const gap = CELL_SIZE * 1.5;
        const positionsArr: { x: number; y: number }[] = [];

        positionsArr.push({ x: centerX, y: centerY });

        for (let r = gap; r <= RADIUS; r += gap) {
            const circumference = 2 * Math.PI * r;
            const numBallsOnCircle = Math.floor(circumference / gap);

            for (let i = 0; i < numBallsOnCircle; i++) {
                const angle = (2 * Math.PI * i) / numBallsOnCircle;
                const x = centerX + r * Math.cos(angle);
                const y = centerY + r * Math.sin(angle);
                positionsArr.push({ x, y });
            }
        }

        setPositions(positionsArr);
    };

    // ✅ useEffect для ініціалізації та resize
    useEffect(() => {
        calculatePositions();
        window.addEventListener("resize", calculatePositions);
        return () => window.removeEventListener("resize", calculatePositions);
    }, []);

    // ✅ Оновлення центрів DOM-елементів
    const updateCellPositions = () => {
        cellsRef.current.forEach((cell) => {
            const rect = cell.getBoundingClientRect();
            cell.center_position = {
                x: (rect.left + rect.right) / 2,
                y: (rect.top + rect.bottom) / 2,
            };
        });
    };

    // ✅ Ефект оновлення центрів після оновлення позицій
    useEffect(() => {
        // Зачекати один кадр, щоб DOM-елементи точно промалювались
        requestAnimationFrame(() => {
            updateCellPositions();
        });
    }, [positions]);

    // ✅ Реакція на рух миші
    const handlePointerMove = useCallback((e: PointerEvent) => {
        if (!interactionActiveRef.current) return;

        const pointer_x = e.pageX;
        const pointer_y = e.pageY;

        cellsRef.current.forEach((cell) => {
            const center = cell.center_position;
            if (!center) return;

            const diff_x = pointer_x - center.x;
            const diff_y = pointer_y - center.y;
            const distance = Math.sqrt(diff_x * diff_x + diff_y * diff_y);

            if (distance < PULL_DISTANCE) {
                const percent = 1 - distance / PULL_DISTANCE;
                gsap.to(cell, {
                    duration: 0.2,
                    x: diff_x * percent * 0.7,
                    y: diff_y * percent * 0.7,
                });
            } else {
                gsap.to(cell, {
                    duration: 0.5,
                    x: 0,
                    y: 0,
                    ease: "elastic.out(1, 0.3)",
                });
            }
        });
    }, []);

    // ✅ Анімація розкидання
    const scatterCells = useCallback(() => {
        if (clickedRef.current) return;
        clickedRef.current = true;
        interactionActiveRef.current = false;

        gsap.to(cellsRef.current, {
            duration: 1.6,
            physics2D: {
                velocity: "random(400, 1000)",
                angle: "random(250, 290)",
                gravity: 2000,
            },
            stagger: {
                from: "center",
                amount: 0.3,
            },
            onComplete: () => {
                clickedRef.current = false;
                if (onAnimationEnd) onAnimationEnd();
            },
        });
    }, [onAnimationEnd]);

    // ✅ Ініціалізація клітинок
    useEffect(() => {
        if (!containerRef.current) return;

        cellsRef.current = Array.from(
            containerRef.current.querySelectorAll(".cell")
        ) as CellWithPosition[];

        cellsRef.current.forEach((cell) => {
            gsap.set(cell, { x: 0, y: 0 });
        });

        updateCellPositions();

        window.addEventListener("pointermove", handlePointerMove);
        cellsRef.current.forEach((cell) => {
            cell.addEventListener("pointerup", scatterCells);
        });

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            cellsRef.current.forEach((cell) => {
                cell.removeEventListener("pointerup", scatterCells);
            });
        };
    }, [handlePointerMove, scatterCells, positions]);

    return (
        <div
            ref={containerRef}
            className={styles.gsapCell}
            style={{
                position: "relative",
                width: "100vw",
                height: "68vh",
                marginTop: "20px",
                overflow: "hidden",
                userSelect: "none",
            }}
        >
            {positions.map(({ x, y }, i) => (
                <div
                    key={i}
                    className={`cell ${styles.gsapCellPointer}`}
                    style={{
                        position: "absolute",
                        left: x - CELL_SIZE / 2,
                        top: y - CELL_SIZE / 2,
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        borderRadius: "50%",
                        willChange: "transform",
                        cursor: "pointer",
                    }}
                />
            ))}
        </div>
    );
}
