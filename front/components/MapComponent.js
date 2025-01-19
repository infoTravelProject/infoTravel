import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import countryJSON from "@/data/world.json";

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

            country.setAttribute("fill", "rgba(255,255,255,0.3)");
            country.setAttribute("stroke", "rgb(0,0,0)");
            country.setAttribute("stroke-linejoin", "round");
            country.setAttribute("stroke-linecap", "round");

            country.addEventListener("mouseenter", () => {
                country.setAttribute("fill", "rgba(255,255,255,0.1)");
            });

            country.addEventListener("mouseleave", () => {
                if (!searchQuery || !countryTitle?.toLowerCase().includes(searchQuery)) {
                    country.setAttribute("fill", "rgba(255,255,255,0.3)");
                }
            });

            if (searchQuery && countryTitle?.toLowerCase().includes(searchQuery)) {
                country.setAttribute("fill", "#1F90E0");
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

    const handleSearch = (item) => {
        setSearchQuery(item.toLowerCase());
    };
    //todo <temp>
    const handleEnterInput = (item)=>{
        for (const region in countryJSON.regions) {
            if (countryJSON.regions.hasOwnProperty(region)) {
                countryJSON.regions[region].forEach(country => {
                    if(country.toString().toLowerCase().includes(item.toLowerCase())){
                        window.location.href = `/countries/${country.toLowerCase()}`;
                    }
                });
            }
        }
    }
    //todo </temp>

    return (
        <div className={"w-full h-fit flex flex-col items-center justify-center gap-16 pt-10"}>
            <div className={"w-96"}>
                <Button type={"input"} inputType={"search"} inputPlaceholder={"Search countries..."} onChange={handleSearch} onSelect={handleEnterInput}/>
            </div>
            <div ref={svgContainerRef} className={"bg-gradient-radial from-it-blue/[0.1] via-70% via-transparent to-transparent"}></div>
        </div>
    );
};

export default MapComponent;