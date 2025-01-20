import ExchangeRate from "@/components/countries/ExchangeRate";

const CurrencyInfo = ({ currency, toCurrency }) => (
    <div className="bg-[#111111] p-6 rounded-lg mt-12">
        <ExchangeRate initialFromCurrency={currency} initialToCurrency={toCurrency}/>
    </div>
);

export default CurrencyInfo;
