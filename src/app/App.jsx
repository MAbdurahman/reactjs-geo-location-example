import React, {useState} from 'react';
import { useGeoLocation } from "../hooks/useGeoLocation";

export default function App() {
    const {
        isLoading,
        position: { lat, lng },
        error,
        getPosition
    } = useGeoLocation();
    const [countClicks, setCountClicks] = useState(0);

    function handleClick() {
        setCountClicks((count) => count + 1);
        getPosition();
    }

    return (
        <div className={'wrapper'}>
            <button className={'button'} onClick={handleClick} disabled={isLoading}>
                Get Location
            </button>

            {isLoading && <p>Loading position...</p>}
            {error && <p className={'paragraph'}>{error}</p>}
            {!isLoading && !error && lat && lng && (
                <p className={'paragraph'}>
                    Your GPS Position:{" "}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
                    >
                        {lat}, {lng}
                    </a>
                </p>
            )}

            <p className={'paragraph'}>You requested position {countClicks} times</p>
        </div>
    );
};