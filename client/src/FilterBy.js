
export default function FilterBy ({handleStyleFilter, handleTFilter}) {

    const handleSChange = (e) => handleStyleFilter(e.target.value)
    const handleTChange = (e) => handleTFilter(e.target.value)

    return (
    <>
    <h4 id="filterCollection"><strong>FILTER COLLECTION</strong></h4>
        <select name="style" onChange={handleSChange} >
            <option value="">Filter By Style</option>
            <option value="Any" >Any</option>
            <option value="Bohemian">Bohemian</option>
            <option value="Contemporary">Contemporary</option>
            <option value="Industrial">Industrial</option>
            <option value="Mid-Century Modern">Mid-Century Modern</option>
            <option value="Minimalist">Minimalist</option>
            <option value="Modern">Modern</option>
            <option value="Modern Farmhouse">Modern Farmhouse</option>
            <option value="Rustic">Rustic</option>
            <option value="Traditional">Traditional</option>
        </select>
        <select name="type" onChange={handleTChange} >
            <option value="">Filter By Piece Type</option>
            <option value="Accessory">Accessory</option>
            <option value="Flooring">Flooring</option>
            <option value="Furniture">Furniture</option>
            <option value="Lighting">Lighting</option>
            <option value="Misc">MISC</option>
            <option value="Texture" >Texture</option>
        </select>
    </>
    )

}