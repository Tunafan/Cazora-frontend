// ProductModal.jsx
import React, { useEffect, useState } from 'react';
import { getOneParticularProduct } from '../api';
import { reserveProduct } from './Reservation';

export default function ProductModal({ isOpen, onClose, productId }) {
    const [product, setProduct] = useState(null);
    const [fittingRoom, setFittingRoom] = useState(''); // Tilføjede fittingRoom-state
    const [contactInfo, setContactInfo] = useState(''); // Tilføjede contactInfo-state
    const [pickUpTime, setPickUpTime] = useState(''); // Tilføjede pickUpTime-state
    const [reservationSuccess, setReservationSuccess] = useState(false);

    useEffect(() => {


        const fetchProductDetails = async () => {
            console.log("Fetching product details for productId:", productId);
            try {
                if (productId) {
                    const productData = await getOneParticularProduct(productId);
                    console.log("Product data:", productData);
                    setProduct(productData[0]);
                }
            } catch (error) {
                console.error('Fejl ved indlæsning af produkt detaljer: ', error);
            }
        };

        if (isOpen) {
            fetchProductDetails();
        }
    }, [isOpen, productId]);

    const handleReserveClick = async () => {
        try {
            await reserveProduct(productId, fittingRoom, contactInfo, pickUpTime);
            setReservationSuccess(true);
        } catch (error) {
            console.error('Fejl ved reservation: ', error);
        }
    };


    if (!isOpen || !product) {
        return null;
    }

    return (
        <div className={`modal ${isOpen ? 'block' : 'hidden'} fixed inset-0 overflow-y-auto`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-content mx-auto my-8 p-6 max-w-3xl bg-white rounded-lg text-left">
                <span className="close absolute top-1 right-4 cursor-pointer text-3xl" onClick={onClose}>&times;</span>
                <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-lg mb-2">Price: {product.price} DKK</p>
                <p className="text-lg mb-2">Size: {product.size}</p>
                <p className="text-lg mb-2">Categories: {product.categories}</p>
                <img src={product.img} alt={product.name} className="object-contain h-64 w-full bg-purple-200 rounded-md" />

                {/* Reservér knap og formular */}
                {!reservationSuccess && (
                    <div className="mt-4">
                        <input type="text" placeholder="Fitting Room" value={fittingRoom} onChange={(e) => setFittingRoom(e.target.value)} className="mb-2 p-2 w-full rounded-md" />
                        <input type="text" placeholder="Contact Info" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} className="mb-2 p-2 w-full rounded-md" />
                        <input type="datetime-local" placeholder="Pickup Time" value={pickUpTime} onChange={(e) => setPickUpTime(e.target.value)} className="mb-4 p-2 w-full rounded-md" />
                        <button onClick={handleReserveClick} className="bg-cazora text-white py-2 px-4 rounded-md hover:bg-opacity-80">
                            Reservér
                        </button>
                    </div>
                )}

                {reservationSuccess && <p className="text-green-500 mt-4">Produktet er nu reserveret!</p>}
            </div>
        </div>
    );
}

