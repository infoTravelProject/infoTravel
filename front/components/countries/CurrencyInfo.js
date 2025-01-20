import ExchangeRate from "@/components/countries/ExchangeRate";

const CurrencyInfo = ({ currencyName, currency }) => (
    <div className="bg-[#111111] p-6 rounded-lg mt-12">
        <h3 className="text-xl font-bold mb-4">{currencyName}</h3>
        <ExchangeRate fromCurrency={currency} />
    </div>
);

export default CurrencyInfo;
