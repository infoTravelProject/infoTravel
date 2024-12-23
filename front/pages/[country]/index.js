import {useRouter} from "next/router";

export default function CountryPage({ params }) {
    const router = useRouter();
    const {country} = router.query;
    return (
        <div>
            <h1>Strona kraju: {country}</h1>
            <p>Tu znajdziesz informacje o kraju.</p>
        </div>
    );
}