import type {Metadata} from "next";
import React from "react";

type Props = {
    children: React.ReactNode;
}

const MoviesLayout = ({children}: Props) => {
    return (
        <>
            {children}
        </>
    );
}
export default MoviesLayout;
