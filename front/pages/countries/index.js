import data from '@/data/world.json';
import CountryList from '@/components/CountryList';
import React from "react";

export default function CountriesPage(){
    return(<div className="text-white justify-items-center">
        <div className="text-center p-10 text-5xl font-thin">List of all countries</div>
        <CountryList {...data.regions}/>
    </div>);
}