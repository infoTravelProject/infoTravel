const CurrencyInfo = ({ currencyName, todo }) => (
    <div className="bg-[#111111] p-6 rounded-lg mt-12">
        <h3 className="text-xl font-bold mb-4">{currencyName}</h3>
        <p>{todo}</p>
    </div>
);

export default CurrencyInfo;
