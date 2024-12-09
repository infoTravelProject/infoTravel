import React, { useEffect } from 'react';
import { ReactComponent as WorldMap } from './world.svg';
import './MapComponent.css';

function MapComponent({ highlightedCountries }) {
    useEffect(() => {
        const paths = document.querySelectorAll('.country');

        paths.forEach((path) => {
            // Apply the highlight from props
            if (highlightedCountries.includes(path.id)) {
                path.style.fill = '#4A90E2'; // Highlight color from props
            } else {
                path.style.fill = '#4D4D4D'; // Default color
            }

            // Add mouse enter and leave events
            path.addEventListener('mouseenter', () => {
                path.style.fill = '#4A90E2'; // Highlight on hover
            });

            path.addEventListener('mouseleave', () => {
                // Reapply the highlight based on props
                if (highlightedCountries.includes(path.id)) {
                    path.style.fill = '#4A90E2';
                } else {
                    path.style.fill = '#4D4D4D';
                }
            });
        });

        // Cleanup event listeners on component unmount
        return () => {
            paths.forEach((path) => {
                path.removeEventListener('mouseenter', () => {});
                path.removeEventListener('mouseleave', () => {});
            });
        };
    }, [highlightedCountries]);

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        }}>
            <WorldMap style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
    );
}

export default MapComponent;
