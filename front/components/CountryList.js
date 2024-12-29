const CountryList = ({africa, asia, europe, northAmerica, southAmerica, oceania}) => (
    <div>
        <table>
            <tbody>
            <tr className="text-center"><th>Africa</th></tr>
            {africa.map((item, index) => (
                <tr key={index}><td>{item}</td></tr>
            ))}
            <tr><th>Asia</th></tr>
            {asia.map((item, index) => (
                <tr key={index}><td>{item}</td></tr>
            ))}
            <tr><th>Europe</th></tr>
            {europe.map((item, index) => (
                <tr key={index}><td>{item}</td></tr>
            ))}
            <tr><th>North America</th></tr>
            {northAmerica.map((item, index) => (
                <tr key={index}><td>{item}</td></tr>
            ))}
            <tr><th>South America</th></tr>
            {southAmerica.map((item, index) => (
                <tr key={index}><td>{item}</td></tr>
            ))}
            <tr><th>Oceania</th></tr>
            {oceania.map((item, index) => (
                <tr key={index}><td>{item}</td></tr>
            ))}
            </tbody>
        </table>
    </div>
);
export default CountryList;