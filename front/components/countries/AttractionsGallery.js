import { useState, useEffect, useRef } from "react";

export default function AttractionsGallery({ attractions }) {
    const [isPaused, setIsPaused] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const galleryRef = useRef(null);

    const updateScrollProgress = () => {
        if (galleryRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;
            const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
            setScrollProgress(progress);
        }
    };

    useEffect(() => {
        const gallery = galleryRef.current;

        const handleScroll = () => {
            updateScrollProgress();
        };

        if (gallery) {
            gallery.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (gallery) {
                gallery.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                if (galleryRef.current) {
                    galleryRef.current.scrollLeft += 1; //auto slide
                    updateScrollProgress();
                }
            }, 25); // slide speed
            return () => clearInterval(interval);
        }
    }, [isPaused]);

    return (
        <div
            className="relative overflow-hidden w-full mt-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* left button */}
            <button
                onClick={() => {
                    if (galleryRef.current) {
                        galleryRef.current.scrollLeft -= 350;
                        updateScrollProgress();
                    }
                }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full shadow-md hover:bg-gray-600 border-2 border-amber-600"
            >
                ←
            </button>

            {/* right button */}
            <button
                onClick={() => {
                    if (galleryRef.current) {
                        galleryRef.current.scrollLeft += 350;
                        updateScrollProgress();
                    }
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full shadow-md hover:bg-gray-600 border-2 border-amber-600"
            >
                →
            </button>

            {/* gallery */}
            <div
                ref={galleryRef}
                className="flex gap-5 overflow-x-scroll scroll-smooth scrollbar-hide"
            >
                {attractions.map((attraction, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-64 bg-[#1e1e1e] rounded-lg shadow-md"
                    >
                        <img
                            src={attraction.image}
                            alt={attraction.name}
                            className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-white">
                                {attraction.name}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">
                                Location: {attraction.location}
                            </p>
                            <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                                {attraction.short_description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* progress */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-800 rounded-md">
                <div
                    className="h-full bg-blue-500 rounded-md"
                    style={{
                        width: `${scrollProgress}%`,
                    }}
                ></div>
            </div>
        </div>
    );
}
