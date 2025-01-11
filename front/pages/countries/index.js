import data from '@/data/world.json';
import CountryList from '@/components/countries/CountryList';
import React from "react";

export default function CountriesPage(){
    return(<div className="text-white/[0.9] justify-items-center">
        <div className="pt-24 pb-8 text-2xl font-thin w-4/5">
            <h2>List of all countries</h2>
            <hr className="h-px mt-2 bg-white/[0.5] border-0"/>
        </div>
        <CountryList {...data.regions}/>
    </div>);
}