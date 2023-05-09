
import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {

    return(
        <div id="loading"style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <h2>CONTENT COMING YOUR WAY</h2>
            <ReactLoading
                type="spinningBubbles"
                color="#263A29"
                height={100}
                width={200}
            />
        </div>
    )
}