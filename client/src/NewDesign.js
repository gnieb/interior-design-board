import React, {useState} from "react";

export default function NewDesign ({designs, handleNewD}) {
    
    const new_design = {
        name: "",
        designer_id: "",
    }

    const [formData, setFormData] = useState(new_design)
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const newD = {
            name: formData.name,
            designer_id: designs[0].designer_id
        }
        fetch("/designs", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newD)
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(r => {
                        handleNewD(r)
                    })
                }
            })

        setFormData({
            name: "",
            designer_id: ""
        })
    }

    return (
        <>
        <h3>This will actually be where the fancy library magic goes but whatever</h3>
        <form onSubmit={handleSubmit}>
            <label>Give your new design a name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange}/>
            <button type="submit">Create</button>
        </form>
        </>
    )
}

// how are we going to display this..... Konva library??

