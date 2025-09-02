import {GoBackButtonComponent} from "@/components/go-back-button-component/GoBackButtonComponent";
import {ScrollTopButtonComponent} from "@/components/scroll-top-button-component/ScrollTopButtonComponent";
import {MovieInfoComponent} from "@/components/movie-info-component/MovieInfoComponent";
import {SearchParams} from "next/dist/server/request/search-params";
import {Metadata} from "next";
import styles from "./page.module.css";

type Props = {
    params: Promise<{ id: string }>,
    searchParams: Promise<SearchParams>,
}
export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const {id} = await params

    return {
        title: `Movie with id # ${id}`,
    };
};


export default async function MovieInfoPage({params, searchParams}: Props) {
    const {id} = await params;


    if (!id) {
        throw new Error("Movie ID is missing!");
    }

    console.log('Movie ID:', id);

    return (
        <div className={styles.container}>
            <GoBackButtonComponent/>
            <MovieInfoComponent id={id} searchParams={searchParams}/>
            <ScrollTopButtonComponent/>
        </div>
    );
}
