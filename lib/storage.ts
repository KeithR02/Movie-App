export type Choice = "left" | "right";

export type Movie = {
    imdbID: string;
    Poster: string;
    Title: string;
    Year: string;
    Rated: string;
    Actors: string;
    Plot: string;
};

export type ChoiceHistory = {
    imdbID: string;
    decision: Choice;
    movie?: Movie;
};

export function getChoices(profileId: string): ChoiceHistory[] {
    const key = "choices" + profileId;
    const saved = localStorage.getItem(key);
    if (saved) {
        return JSON.parse(saved);
    } else {
        return [];
    }
}

export function saveChoice(profileId: string, imdbID: string, decision: Choice, movie?: Movie) {
    const key = "choices" + profileId;
    const current = getChoices(profileId);
    
    const already = current.find((c) => c.imdbID === imdbID);
    if (!already) {
        current.push({ imdbID, decision, movie });
        localStorage.setItem(key, JSON.stringify(current));
    }
}

export function getLikedMovies(profileId: string): Movie[] {
    const choices = getChoices(profileId);
    const liked = choices.filter((c) => c.decision === "right" && c.movie);
    return liked.map((c) => c.movie!);
}

export function getLikedIds(profileId: string): string[] {
    const choices = getChoices(profileId);
    const liked = choices.filter((c) => c.decision === "right");
    return liked.map((c) => c.imdbID);
}

export function getCurrentIndex(profileId: string): number {
    const key = "index" + profileId;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : 0;
}

export function setCurrentIndex(profileId: string, idx: number) {
    const key = "index" + profileId;
    localStorage.setItem(key, JSON.stringify(idx));
}