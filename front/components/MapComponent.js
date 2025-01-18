import React, { useEffect, useRef, useState } from "react";

const MapComponent = () => {
    const [svgContent, setSvgContent] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const svgContainerRef = useRef(null);

    useEffect(() => {
        fetch("/world.svg")
            .then((response) => response.text())
            .then((data) => setSvgContent(data))
            .catch((error) => console.error("Error loading SVG:", error));
    }, []);

    useEffect(() => {
        if (!svgContainerRef.current) return;

        const svgContainer = svgContainerRef.current;
        svgContainer.innerHTML = svgContent;

        const countries = svgContainer.querySelectorAll("[id]");

        countries.forEach((country) => {
            const countryTitle = country.getAttribute("title");

            country.setAttribute("fill", "#CCCCCC");

            country.addEventListener("mouseenter", () => {
                country.setAttribute("fill", "#FFD700");
            });

            country.addEventListener("mouseleave", () => {
                if (!searchQuery || !countryTitle?.toLowerCase().includes(searchQuery)) {
                    country.setAttribute("fill", "#CCCCCC");
                }
            });

            if (searchQuery && countryTitle?.toLowerCase().includes(searchQuery)) {
                country.setAttribute("fill", "#FFD700");
            }

            country.style.cursor = "pointer";
            country.addEventListener("click", () => {
                console.log(`Navigating to: /countries/${countryTitle.toLowerCase()}`);
                window.location.href = `/countries/${countryTitle.toLowerCase()}`;
            });
        });

        return () => {
            countries.forEach((country) => {
                country.removeEventListener("mouseenter", () => {});
                country.removeEventListener("mouseleave", () => {});
                country.removeEventListener("click", () => {});
            });
        };
    }, [svgContent, searchQuery]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Country name..."
                value={searchQuery}
                onChange={handleSearch}
            />
            <div ref={svgContainerRef}></div>
        </div>
    );
};

export default MapComponent;