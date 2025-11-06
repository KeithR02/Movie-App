'use client'

import { useState, useEffect} from "react";
import { useRouter } from "next/router";
import MovieCard from "../components/MovieCard";
import { movieList } from "@/data/movieList";
import { saveChoice, getCurrentIndex, setCurrentIndex, Movie } from "@/lib/storage";
import { Flex, View, Button } from "@aws-amplify/ui-react";

interface MovieApiResponse {
    imdbID: string;
    Title: string;
    Year: string;
    Rated: string;
    Poster: string;
    Actors: string;
    Plot: string;
    Response: string;
}

export default function MovieApi() {
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [idx, setIdx] = useState(0);
    const [profileId, setProfileId] = useState("1");
    const router = useRouter();

    async function fetchMovieData(title: string, year: string) {
        const response = await fetch(
            "https://www.omdbapi.com/?t=" + title + "&y=" + year + "&plot=full&apikey=" + process.env.NEXT_PUBLIC_API_KEY);
        const data: MovieApiResponse = await response.json();
        return data;
    }

    async function loadMovies() {
        const results: Movie[] = [];
        for (const m of movieList) {
            const data = await fetchMovieData(m.title, m.year);
            results.push({
                imdbID: data.imdbID,
                Poster: data.Poster,
                Title: data.Title,
                Year: data.Year,
                Rated: data.Rated,
                Actors: data.Actors,
                Plot: data.Plot,
            });
        }
        setMovies(results);
        console.log(results);
    }

    useEffect(() => {
        if (!router.isReady) return;
        const q = (router.query.profile as string) || "1";
        setProfileId(q);
        setIdx(getCurrentIndex(q));
    }, [router.isReady, router.query.profile]);

    useEffect(() => {
        loadMovies();
    }, []);

    const movie = movies ? movies[idx] : undefined;
    
    if (!movies) return <div>Loading...</div>

    function handleChoice(decision: "left" | "right") {
        if (!movie) return;
        saveChoice(
            profileId,
            movie.imdbID,
            decision,
            decision === "right" ? movie : undefined
        );
        const next = idx + 1;
        setIdx(next);
        setCurrentIndex(profileId, next);
    }
    
    if (!movie) return <div><Button onClick={() => router.push("/")}>Go Home</Button></div>
    
    return (
        <View>
            <Flex direction="column" alignItems="center">
                <MovieCard movie={movie} />
                <Flex>
                    <Button onClick={() => handleChoice("left")}>Skip</Button>
                    <Button onClick={() => handleChoice("right")}>Like</Button>
                </Flex>
            </Flex>
        </View>
    );
}



