
import MostPopularWrapper from "@/components/most-popular-wrapper/MostPopularWrapperComponent";
import {getPopularMovies} from "@/services/movie_services/movies-servise";
import GsapGalleryComponent from "@/components/gsap-gallery-component/GsapGalleryComponent";
import {IMovie} from "@/models/IMovie";

    export default async function Home() {
        const response = await getPopularMovies()
        const top10 = [
            { id: 1, title: "Test Movie 1", poster_path: "/test1.jpg" },
            { id: 2, title: "Test Movie 2", poster_path: "/test2.jpg" },
            { id: 3, title: "Test Movie 1", poster_path: "/test1.jpg" },
            { id: 4, title: "Test Movie 2", poster_path: "/test2.jpg" },
            { id: 5, title: "Test Movie 1", poster_path: "/test1.jpg" },
            { id: 6, title: "Test Movie 1", poster_path: "/test1.jpg" },
            { id: 7, title: "Test Movie 2", poster_path: "/test2.jpg" },
            { id: 8, title: "Test Movie 1", poster_path: "/test1.jpg" },
            { id: 9, title: "Test Movie 2", poster_path: "/test2.jpg" },
            { id: 10, title: "Test Movie 2", poster_path: "/test2.jpg" },

        ];

        return (
            <div className="flex flex-col justify-center items-center h-[84%] w-full">
                <MostPopularWrapper>
                    <GsapGalleryComponent  movies={top10}/>
                </MostPopularWrapper>
            </div>
        );
    }
