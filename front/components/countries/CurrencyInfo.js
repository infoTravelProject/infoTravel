import ExchangeRate from "@/components/countries/ExchangeRate";

const CurrencyInfo = ({ currency, toCurrency }) => (
    <div className="bg-[#111111] p-6 rounded-lg mt-12">
        <h3 className="text-xl font-bold mb-4 flex justify-center">{currency.toUpperCase()+" -> "+toCurrency.toUpperCase()}</h3>
        <ExchangeRate fromCurrency={currency} toCurrencyp={toCurrency}/>
    </div>
);

export default CurrencyInfo;
