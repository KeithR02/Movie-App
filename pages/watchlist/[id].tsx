import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MovieCard from "../../components/MovieCard";
import {getLikedMovies, Movie} from "@/lib/storage";

export default function WatchlistPage() {
    const router = useRouter();
    const [profileId, setProfileId] = useState("1");
    const [items, setItems] = useState<Movie[]>([]);

    useEffect(() => {
        if (!router.isReady) return;
        const id = (router.query.id as string) || "1";
        setProfileId(id);
        setItems(getLikedMovies(id));
    }, [router.isReady, router.query.id]);

    if (items.length === 0) return <div>You haven't added any movies. Get to swiping!</div>;

    return (
        <div>
            <h1>Watchlist — Profile {profileId}</h1>
            {items.map((m) => (
                <MovieCard key={m.imdbID} movie={m} />
            ))}
        </div>
    );
}
