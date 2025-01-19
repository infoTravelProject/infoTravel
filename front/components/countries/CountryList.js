import { GiAfrica } from "react-icons/gi";

const CountryList = ({africa, asia, europe, northAmerica, southAmerica, oceania}) => (
    <div className="grid grid-cols-3 gap-20 w-4/5 pb-20">
        <div className="rounded-xl bg-white/[0.05]">
            <table className="table table-striped w-full">
                <thead>
                <tr>
                    <th className="flex flex-row py-5 pl-7 rounded-t-xl bg-white/[0.2]"><p
                        className="basis-2/3 text-left text-xl font-normal">Africa</p><GiAfrica
                        className="basis-1/3 h-8"/></th>
                </tr>
                </thead>
                <tbody>
                {africa.map((item, index) => (<tr key={index}>
                    <td className="px-7 py-1.5 hover:bg-black/[0.2] cursor-pointer"
                        onClick={()=>window.location.href = "/countries/"+item.toLowerCase()}>{item}</td>
                </tr>))}
                </tbody>
            </table>
        </div>
        <div className="rounded-xl bg-white/[0.05]">
            <table className="table table-striped w-full">
                <thead>
                <tr>
                    <th className="flex flex-row py-5 pl-7 rounded-t-xl bg-white/[0.2]"><p
                        className="basis-2/3 text-left text-xl font-normal">Asia</p>
                        <a className="basis-1/3 justify-items-center"><img src="/asia_outline.png" alt="continent symbol" className="h-8 opacity-90"/></a></th>
                </tr>
                </thead>
                <tbody>
                {asia.map((item, index) => (<tr key={index}>
                    <td className="px-7 py-1.5 hover:bg-black/[0.2] cursor-pointer"
                        onClick={()=>window.location.href = "/countries/"+item.toLowerCase()}>{item}</td>
                </tr>))}
                </tbody>
            </table>
        </div>
        <div className="rounded-xl bg-white/[0.05]">
            <table className="table table-striped w-full">
                <thead>
                <tr>
                    <th className="flex flex-row py-5 pl-7 rounded-t-xl bg-white/[0.2]"><p
                        className="basis-2/3 text-left text-xl font-normal">Europe</p>
                        <a className="basis-1/3 justify-items-center"><img src="/europe_outline.png" alt="continent symbol" className="h-8 opacity-90"/></a>
                    </th>
                </tr>
                </thead>
                <tbody>
                {europe.map((item, index) => (<tr key={index}>
                    <td className="px-7 py-1.5 hover:bg-black/[0.2] cursor-pointer"
                        onClick={()=>window.location.href = "/countries/"+item.toLowerCase()}>{item}</td>
                </tr>))}
                </tbody>
            </table>
        </div>
        <div className="rounded-xl bg-white/[0.05]">
            <table className="table table-striped w-full">
                <thead>
                <tr>
                    <th className="flex flex-row py-5 pl-7 rounded-t-xl bg-white/[0.2]"><p
                        className="basis-2/3 text-left text-xl font-normal">North America</p>
                        <a className="basis-1/3 justify-items-center"><img src="/north_america_outline.png" alt="continent symbol" className="h-8 opacity-90"/></a>
                    </th>
                </tr>
                </thead>
                <tbody>
                {northAmerica.map((item, index) => (<tr key={index}>
                    <td className="px-7 py-1.5 hover:bg-black/[0.2] cursor-pointer"
                        onClick={()=>window.location.href = "/countries/"+item.toLowerCase()}>{item}</td>
                </tr>))}
                </tbody>
            </table>
        </div>
        <div className="rounded-xl bg-white/[0.05]">
            <table className="table table-striped w-full">
                <thead>
                <tr>
                    <th className="flex flex-row py-5 pl-7 rounded-t-xl bg-white/[0.2]"><p
                        className="basis-2/3 text-left text-xl font-normal">South America</p>
                        <a className="basis-1/3 justify-items-center"><img src="/south_america_outline.png" alt="continent symbol" className="h-8 opacity-90"/></a>
                    </th>
                </tr>
                </thead>
                <tbody>
                {southAmerica.map((item, index) => (<tr key={index}>
                    <td className="px-7 py-1.5 hover:bg-black/[0.2] cursor-pointer"
                        onClick={()=>window.location.href = "/countries/"+item.toLowerCase()}>{item}</td>
                </tr>))}
                </tbody>
            </table>
        </div>
        <div className="rounded-xl bg-white/[0.05]">
            <table className="table table-striped w-full">
                <thead>
                <tr>
                    <th className="flex flex-row py-5 pl-7 rounded-t-xl bg-white/[0.2]"><p
                        className="basis-2/3 text-left text-xl font-normal">Oceania</p>
                        <a className="basis-1/3 justify-items-center"><img src="/oceania_outline.png" alt="continent symbol" className="h-8 opacity-90"/></a>
                    </th>
                </tr>
                </thead>
                <tbody>
                {oceania.map((item, index) => (<tr key={index}>
                    <td className="px-7 py-1.5 hover:bg-black/[0.2] cursor-pointer"
                        onClick={()=>window.location.href = "/countries/"+item.toLowerCase()}>{item}</td>
                </tr>))}
                </tbody>
            </table>
        </div>
    </div>
);
export default CountryList;