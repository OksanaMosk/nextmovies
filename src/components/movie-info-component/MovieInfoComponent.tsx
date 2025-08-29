
import Image from "next/image";
import {VoteAverageComponent} from "@/components/vote-average-component/VoteAverageComponent";
import {SearchParams} from "next/dist/server/request/search-params";

import styles from "./MovieInfoComponent.module.css";
import {IMovieDetails} from "@/models/IMovieDetails";
import {getByIdMovie} from "@/services/movie_services/movies-servise";

type Props = {
  id: string ;
  searchParams: Promise<SearchParams>;
};

export const MovieInfoComponent= async ({id}:Props ) => {
    const movieItem: IMovieDetails = await getByIdMovie(id);
    //
    // window.scrollTo({ top: 0, behavior: "smooth" });
    const {
        adult,
        popularity,
        belongs_to_collection,
        budget,
        genres,
        homepage,
        imdb_id,
        origin_country,
        original_language,
        original_title,
        overview,
        poster_path,
        production_companies,
        production_countries,
        release_date,
        revenue,
        runtime,
        spoken_languages,
        status,
        tagline,
        title,
        vote_average,
        vote_count,
    } = movieItem

    return (
        <div className={styles.container}>
            <div className={styles.flexRowResponsive}>
                {poster_path ? (
                    <Image
                        src={`https://image.tmdb.org/t/p/original${poster_path}`}
                        alt={title}
                        className={styles.posterImage}
                        width={500}
                        height={400}
                    />
                ) : (
                    <div className={styles.noPoster}>
                        <Image
                            src='/images/placeholder.webp/'
                            alt="No poster"
                            className={styles.placeholder}
                            width={500}
                            height={400}
                        />
                    </div>
                )}
                <div className={styles.content}>
                    <h1 className={styles.title}>{title}</h1>
                    {tagline && <p className={styles.tagline}>{tagline}</p>}
                    <div className={styles.details}>
                        <p><strong>ID:</strong> {id}</p>
                        <p><strong>Original:</strong> {original_title}</p>
                        <p><strong>Lang:</strong> {original_language.toUpperCase()}</p>
                        <p><strong>Release:</strong> {release_date}</p>
                        <p><strong>Runtime:</strong> {runtime} min</p>
                        <p><strong>Status:</strong> {status}</p>
                        <p><strong>Budget:</strong> ${budget.toLocaleString()}</p>
                        <p><strong>Revenue:</strong> ${revenue.toLocaleString()}</p>
                        <p><strong>IMDb:</strong> {imdb_id}</p>
                        <p><strong>Popularity:</strong> {popularity.toFixed(1)}</p>
                        <p><strong>Adult:</strong> {adult ? "Yes" : "No"}</p>
                        {homepage && (
                            <p>
                                <strong>Homepage:</strong>{" "}
                                <a href={homepage} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                    Visit
                                </a>
                            </p>
                        )}
                    </div>
                    {overview && <p className={styles.overview}>{overview}</p>}
                    {genres?.length > 0 && (
                        <div className={styles.genres}>
                            {genres.map((g) => (
                                <span key={g.id} className={styles.genreBadge}>{g.name}</span>
                            ))}
                        </div>
                    )}
                    <div className={styles.voteContainer}>
                        <VoteAverageComponent vote_average={vote_average} />
                        <p>({vote_count} votes)</p>
                    </div>
                    {belongs_to_collection && (
                        <div className={styles.collectionSection}>
                            <p><strong>Collection:</strong> {belongs_to_collection.name}</p>
                            {belongs_to_collection.backdrop_path ? (
                                <Image
                                    src={`https://image.tmdb.org/t/p/original${belongs_to_collection.backdrop_path}`}
                                    alt={belongs_to_collection.name}
                                    className={styles.collectionImage}
                                    width={500}
                                    height={300}
                                    sizes="(max-width: 600px) 100vw, 500px"
                                    priority
                                />
                            ) : (
                                <div className={styles.collectionNoPoster}>No poster</div>
                            )}
                        </div>
                    )}
                    <div className={styles.twoColsTop}>
                        <div>
                            {production_companies?.length > 0 && (
                                <>
                                    <h3 className={styles.titlesParagraf}>Production Companies</h3>
                                    <ul className={styles.productionList}>
                                        {production_companies.map((c) => (
                                            <li key={c.id} className={styles.productionItem}>
                                                {c.logo_path && (
                                                    <Image
                                                        src={`https://image.tmdb.org/t/p/w200${c.logo_path}`}
                                                        alt={c.name}
                                                        className={styles.productionLogo}
                                                        width={30}
                                                        height={30}
                                                    />
                                                )}
                                                <span>
                                                {c.name} {c.origin_country && `(${c.origin_country})`}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                        {spoken_languages && spoken_languages.length > 0 && (
                            <div>
                                <h3 className={styles.titlesParagraf}>Spoken Languages</h3>
                                <ul className={styles.languagesList}>
                                    {spoken_languages.map((lang) => (
                                        <li key={lang.iso_639_1}>
                                            {lang.english_name} ({lang.name})
                                        </li>
                                    ))}
                                </ul>
                            </div>)}
                    </div>
                    <div className={styles.twoColsBottom}>
                        {production_countries?.length > 0 && (
                            <div className={styles.leftBottom}>
                                <h3 className={styles.titlesParagraf}>Production Countries</h3>
                                <ul className={styles.productionCountriesList}>
                                    {production_countries.map((co) => (
                                        <li key={co.iso_3166_1} className={styles.countryBadge}>
                                            {co.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div>
                            <h3 className={styles.titlesParagraf}>Origin Country</h3>
                            <p className={styles.originCountry}>{origin_country}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
