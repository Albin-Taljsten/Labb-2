import '../scss/listingSearch.css'

import { useState } from "react";
import { ButtonList } from './buttonList';

export function ListingSearch()
{
    const [isDropdownOpenLeft, setDropdownOpenLeft] = useState(false);
    const [isDropdownOpenRight, setDropdownOpenRight] = useState(false);

    function toggleDropdownLeft()
    {
        setDropdownOpenLeft(prev => !prev);
    }

    function toggleDropdownRight()
    {
        setDropdownOpenRight(prev => !prev);
    }

    return (
        <>
            <div id="listingSearch">
                <h3>Residence Type</h3>
                <button className='residence'>All types</button>
                <button className='residence'>Villas</button>
                <button className='residence'>Apartments</button>
                <button className='residence'>Other</button>
                <br/>
                <h3>Rooms</h3>
                <div className='roomsDropdownSection'>
                    <div className='roomsButtonSection'>
                        <button onClick={toggleDropdownLeft} className="roomsDropdown left">Min</button>
                        <h1>-</h1>
                        <button onClick={toggleDropdownRight} className="roomsDropdown right">Max</button>
                    </div>


                    <div className={`dropdown-content left ${isDropdownOpenLeft ? "show" : ""}`}>
                        <ButtonList rooms='min,1 room,2 rooms,3 rooms,4 rooms,5 rooms,6 rooms,7 rooms,8 rooms,9 rooms,10 rooms+'></ButtonList>
                        {/**TODO: Make button list into special element*/}
                        {/**MAYBE: Make a function that can take the inputed text for use elsewere*/}
                    </div>


                    <div className={`dropdown-content right ${isDropdownOpenRight ? "show" : ""}`}>
                        <ButtonList rooms='max,1 room,2 rooms,3 rooms,4 rooms,5 rooms,6 rooms,7 rooms,8 rooms'></ButtonList>
                    </div>
                </div>
                <br/>
                <div className='test'>
                    <h3>Living Area</h3>
                    <p>SearchForm3</p>
                    <br/>
                    <h3>Price Range</h3>
                </div>
            </div>
        </>
    );
}
