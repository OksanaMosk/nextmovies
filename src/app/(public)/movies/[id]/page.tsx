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
export const generateMetadata=async ({params}:Props):Promise<Metadata> => {
    const {movieId} = await params

    return {
        title: `Movie with id # ${movieId}`,
    };
};


export default function MovieInfoPage({ params }: Props) {
    const { movieId } = params;


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
