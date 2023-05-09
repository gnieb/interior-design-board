
import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {

    return(
        <div id="loading">
            <h2>Loading in ReactJs - GeeksforGeeks</h2>
            <ReactLoading
                type="spinningBubbles"
                color="#0000FF"
                height={100}
                width={100}
            />
        </div>
    )
}