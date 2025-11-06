import { useEffect, useState } from "react";
import MovieItem from "../components/MovieCard";
import { getLikedMovies, getLikedIds, Movie } from "@/lib/storage";

export default function MatchesPage() {
    const [matched, setMatched] = useState<Movie[]>([]);

    useEffect(() => {
        const ids1 = getLikedIds("1");
        const ids2 = getLikedIds("2");
        const ids2Set = new Set(ids2);
        const commonIds = ids1.filter((id) => ids2Set.has(id));
        const all = [...getLikedMovies("1"), ...getLikedMovies("2")];
        const unique: Record<string, Movie> = {};
        for (const m of all) {
            if (commonIds.includes(m.imdbID) && !unique[m.imdbID]) {
                unique[m.imdbID] = m;
            }
        }

        setMatched(Object.values(unique));
    }, []);

    if (matched.length === 0) {
        return <div>You have no movie matches. You better start swiping!</div>;
    }

    return (
        <div>
            <h1>Matches</h1>
            {matched.map((m) => (
                <MovieItem key={m.imdbID} movie={m} />
            ))}
        </div>
    );
}

