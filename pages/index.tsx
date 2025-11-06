"use client";

import Link from "next/link";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import {Authenticator} from "@aws-amplify/ui-react";

Amplify.configure(outputs);

export default function HomePage() {
    return (
        <Authenticator>
            {({ signOut, user }) => (
                <main>
                    <div>
                        <header>
                            <h1>Movie Matcher</h1>
                            <p>Swipe until you find a movie match!</p>
                        </header>

                        <section>
                            <Link href="/swipe?profile=1">
                                <p>Start swiping — Profile 1</p>
                            </Link>

                            <Link href="/swipe?profile=2">
                                <p>Start swiping — Profile 2</p>
                            </Link>
                        </section>

                        <section>
                            <Link href="/watchlist/1">
                                <p>Watchlist — Profile 1</p>
                            </Link>

                            <Link href="/watchlist/2">
                                <p>Watchlist — Profile 2</p>
                            </Link>

                            <Link href="/matches">
                                <p>Movies you both matched with!</p>
                            </Link>
                        </section>

                        <button onClick={signOut}>Sign out</button>
                    </div>
                </main>
            )}
        </Authenticator>
    );
}
