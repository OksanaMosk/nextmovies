
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback} from "react";
import styles from "./PaginationComponent.module.css";

type PaginationProps = {
    totalPages: number;
    onPageChangeAction: (newPage: number) => void;
    currentPage: number;
};

export const PaginationComponent = ({
                                        totalPages,
                                    }: PaginationProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentPage = searchParams.get("pg") || "1";
    const [pageRange, setPageRange] = useState<number[]>([]);

    const computePageRange = useCallback(() => {
        const pages: number[] = [];
        const maxPagesToShow = 10;
       const current = Number(currentPage);
       const total = totalPages;
        const half = Math.floor(maxPagesToShow / 2);
        let startPage = current - half;
        let endPage = current + half;

        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(total, maxPagesToShow);
        }
        if (endPage > total) {
            endPage = total;
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        setPageRange(pages);
    }, [currentPage, totalPages]);

    useEffect(() => {
        computePageRange();
    }, [computePageRange]);


    const updatePageQuery = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("pg", page.toString());
        router.push(`${window.location.pathname}?${params.toString()}`);
    };

    const handlePageChange = (page: number) => {
        updatePageQuery(page);
    };

    const handlePrevPage = () => {
        if (Number(currentPage) > 1) {
            updatePageQuery(Number(currentPage) - 1);
        }
    };

    const handleNextPage = () => {
        if (Number(currentPage) < totalPages) {
            updatePageQuery(Number(currentPage) + 1);
        }
    };

    return (
        <div className={styles.paginationContainer}>
            <button
                onClick={handlePrevPage}
                disabled={Number(currentPage) <= 1}
                className={`${styles.paginationNav} ${Number(currentPage) <= 1 ? "cursor-not-allowed" : ""}`}
                aria-label="Previous page"
            >
                &#8678;
            </button>

            {pageRange.map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`${styles.paginationButton} ${
                        currentPage === page.toString() ? styles.paginationButtonActive : styles.paginationButtonInactive
                    }`}
                    aria-current={currentPage === page.toString() ? "page" : undefined}
                    aria-label={`Page ${page}`}
                >
                    <span className={styles.paginationButtonText}>{page}</span>
                </button>
            ))}

            <button
                onClick={handleNextPage}
                disabled={Number(currentPage) >= totalPages}
                className={`${styles.paginationNav} ${Number(currentPage) >= totalPages ? "cursor-not-allowed" : ""}`}
                aria-label="Next page"
            >
                &#8680;
            </button>
        </div>
    );
};
