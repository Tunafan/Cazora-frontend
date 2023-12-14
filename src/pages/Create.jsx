import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { createProduct } from "../api";

export default function Create() {
    const [values, setValues] = useState({
        name: '',
        categories: [''],
        size: '',
        price: '',
        description: '',
        reserved: 0,
        img: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(values);

        try {
            // Kald den nye createProduct-funktion
            const response = await createProduct(values);

            // Håndter succes
            console.log(response);
            navigate('/admin');
        } catch (error) {
            // Håndter fejl
            console.error(error);
        }
    };

    return (
    <div className="container mx-auto my-8">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-semibold mb-4">Tilføj tøj</h2>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Titel</label>
                <input id="name" type="text" placeholder="Indtast navn eller titel" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={e => setValues({ ...values, name: e.target.value })} />
            </div>
            <div className="mb-4">
                <label htmlFor="size" className="block text-gray-700 text-sm font-bold mb-2">Størrelse</label>
                <input id="size" type="text" placeholder="one size/s/m/l/34...49" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={e => setValues({ ...values, size: e.target.value })} />
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Pris</label>
                <input id="price" type="number" placeholder="Indtast pris" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={e => setValues({ ...values, price: e.target.value })} />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Beskrivelse</label>
                <input id="description" type="text" placeholder="max 1024 tegn" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={e => setValues({ ...values, description: e.target.value })} />
            </div>
            <div className="mb-4">
                <label htmlFor="img" className="block text-gray-700 text-sm font-bold mb-2">Foto</label>
                <input id="img" type="text" placeholder="foto URL" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={e => setValues({ ...values, img: e.target.value })} />
            </div>
            <div className="mb-4">
                <label htmlFor="categories" className="block text-gray-700 text-sm font-bold mb-2">Kategorier</label>
                <input id="categories" type="text" placeholder="Vælg kategorier" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={e => setValues({ ...values, categories: e.target.value })} />
            </div>
            <button type="submit" className="bg-cazora hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Indsend</button>
        </form>
    </div>
    )
}