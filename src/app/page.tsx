
import MostPopularWrapper from "@/components/most-popular-wrapper/MostPopularWrapperComponent";
import {getPopularMovies} from "@/services/movie_services/movies-servise";
import GsapGalleryComponent from "@/components/gsap-gallery-component/GsapGalleryComponent";
import {IMovie} from "@/models/IMovie";

    export default async function Home() {
        const response = await getPopularMovies()
        const top10: IMovie[] = response.results.filter((m) => m.poster_path).slice(0, 10);
        return (
            <div className="flex flex-col justify-center items-center h-[84%] w-full">
                <MostPopularWrapper>
                    <GsapGalleryComponent  movies={top10}/>
                </MostPopularWrapper>
            </div>
        );
    }
