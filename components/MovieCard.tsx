import type { Movie } from "@/lib/storage";
import { View, Flex, Image, Text } from "@aws-amplify/ui-react";

export default function MovieItem({ movie }: { movie: Movie }) {
    return (
        <View as="div" marginTop="1.5rem" textAlign="center" paddingLeft="10rem" paddingRight="10rem">
            <Flex direction="column" alignItems="center" justifyContent="center">
                <Image
                    alt={`${movie.Title} Poster`}
                    src={movie.Poster}
                />
                
                <Flex direction="column" gap="0.25rem">
                    <Text>{movie.Title}</Text>
                    <Text>Year: {movie.Year}</Text>
                    <Text>Rated: {movie.Rated}</Text>
                    <Text>Actors: {movie.Actors}</Text>
                    <Text>{movie.Plot}</Text>
                </Flex>
            </Flex>
        </View>
    );
}
