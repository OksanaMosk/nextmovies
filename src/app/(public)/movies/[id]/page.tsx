import { GoBackButtonComponent } from "@/components/go-back-button-component/GoBackButtonComponent";
import { ScrollTopButtonComponent } from "@/components/scroll-top-button-component/ScrollTopButtonComponent";
import styles from "./page.module.css";
import { MovieInfoComponent } from "@/components/movie-info-component/MovieInfoComponent";
import { SearchParams } from "next/dist/server/request/search-params";
import { Metadata } from "next";

type Props = {
    params:Promise<{id:string}>,
    searchParams:Promise<SearchParams>,
}

// Якщо ти не робиш асинхронні запити у generateMetadata, можна прибрати async
export const generateMetadata = async ({ params }: Props): Metadata => {
    const { movieId } = await params;
    return {
        title: `Movie with id # ${movieId}`,
    };
};

// Основна сторінка MovieInfoPage
export default function MovieInfoPage({ params }: Props) {
    const { movieId } = params;

    // Перевірка на наявність movieId (це для безпеки, якщо він не переданий)
    if (!movieId) {
        throw new Error("Movie ID is missing!");
    }

    console.log('Movie ID:', movieId);

    return (
        <div className={styles.container}>
            <GoBackButtonComponent />
            <MovieInfoComponent movieId={movieId} />
            <ScrollTopButtonComponent />
        </div>
    );
}
