import * as React from 'react';
import Button from '@mui/material/Button';


export default function AddFromCollection ({handleCloseLibraryForm, libraryDisplay}) {
console.log(libraryDisplay)

const galleryToSelect = libraryDisplay.map(piece => {
    return (
        <div key={piece.id}>image</div>
    )
})
    // checkbox to allow mor ethan one selected??

    return (
        <>
        Select the piece you'd like to add
        {galleryToSelect}
        <Button onClick={handleCloseLibraryForm}>Save</Button>
        </>
    )
}