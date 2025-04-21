import '../scss/out/listingSearch.css'

import { useEffect, useRef, useState } from "react";
import { ButtonList } from './buttonList';

export function ListingSearch()
{
    // Limit option function vars
    const [selectedMinRooms, setSelectedMinRooms] = useState<number | null>(null);
    const [selectedMaxRooms, setSelectedMaxRooms] = useState<number | null>(null);

    const [selectedMinLivingArea, setSelectedMinLivingArea] = useState<number | null>(null);
    const [selectedMaxLivingArea, setSelectedMaxLivingArea] = useState<number | null>(null);

    const [selectedMinPrice, setSelectedMinPrice] = useState<number | null>(null);
    const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | null>(null);


    
    // Show or Hide dropdown
    const [isDropdownOpenLeftRooms, setDropdownOpenLeftRooms] = useState(false);
    const [isDropdownOpenRightRooms, setDropdownOpenRightRooms] = useState(false);

    const [isDropdownOpenLeftLivingArea, setDropdownOpenLeftLivingArea] = useState(false);
    const [isDropdownOpenRightLivingArea, setDropdownOpenRightLivingArea] = useState(false);

    const [isDropdownOpenLeftPrice, setDropdownOpenLeftPrice] = useState(false);
    const [isDropdownOpenRightPrice, setDropdownOpenRightPrice] = useState(false);



    // Change button text
    const [buttonTextLeftRooms, setButtonTextLeftRooms] = useState('Min');
    const [buttonTextRightRooms, setButtonTextRightRooms] = useState('Max');

    const [buttonTextLeftLivingArea, setButtonTextLeftLivingArea] = useState('Min');
    const [buttonTextRightLivingArea, setButtonTextRightLivingArea] = useState('Max');

    const [buttonTextLeftPrice, setButtonTextLeftPrice] = useState('Min');
    const [buttonTextRightPrice, setButtonTextRightPrice] = useState('Max');



    // Refs for buttons
    const leftButtonRefRooms = useRef<HTMLButtonElement>(null);
    const rightButtonRefRooms = useRef<HTMLButtonElement>(null);
    const leftDropdownRefRooms = useRef<HTMLDivElement>(null);
    const rightDropdownRefRooms = useRef<HTMLDivElement>(null);

    const leftButtonRefLivingArea = useRef<HTMLButtonElement>(null);
    const rightButtonRefLivingArea = useRef<HTMLButtonElement>(null);
    const leftDropdownRefLivingArea = useRef<HTMLDivElement>(null);
    const rightDropdownRefLivingArea = useRef<HTMLDivElement>(null);

    const leftButtonRefPrice = useRef<HTMLButtonElement>(null);
    const rightButtonRefPrice = useRef<HTMLButtonElement>(null);
    const leftDropdownRefPrice = useRef<HTMLDivElement>(null);
    const rightDropdownRefPrice = useRef<HTMLDivElement>(null);

    function parseRoomLabel(label: string): number | null 
    {
        if (label === 'Min' || label === 'Max') return null;
        const match = label.match(/\d+/); // Checks for digits in a string
        return match ? parseInt(match[0]) : null;
    }

    // Functions to handle button text
    function handleButtonTextLeftRooms(label: string)
    {
        setButtonTextLeftRooms(label);
        const parsed = parseRoomLabel(label)
        if (parsed !== null)
        {
            setSelectedMinRooms(parsed);
        }
        setDropdownOpenLeftRooms(false);
    }

    function handleButtonTextRightRooms(label: string)
    {
        setButtonTextRightRooms(label);
        const parsed = parseRoomLabel(label)
        if (parsed !== null)
        {
            setSelectedMaxRooms(parsed);
        }
        setDropdownOpenRightRooms(false);
    }



    function handleButtonTextLeftLivingArea(label: string)
    {
        setButtonTextLeftLivingArea(label);
        const parsed = parseRoomLabel(label)
        if (parsed !== null)
        {
            setSelectedMinLivingArea(parsed);
        }
        setDropdownOpenLeftLivingArea(false);
    }

    function handleButtonTextRightLivingArea(label: string)
    {
        setButtonTextRightLivingArea(label);
        const parsed = parseRoomLabel(label)
        if (parsed !== null)
        {
            setSelectedMaxLivingArea(parsed);
        }
        setDropdownOpenRightLivingArea(false);
    }



    function handleButtonTextLeftPrice(label: string)
    {
        setButtonTextLeftPrice(label);
        const parsed = parseRoomLabel(label)
        if (parsed !== null)
        {
            setSelectedMinPrice(parsed);
        }
        setDropdownOpenLeftPrice(false);
    }

    function handleButtonTextRightPrice(label: string)
    {
        setButtonTextRightPrice(label);
        const parsed = parseRoomLabel(label)
        if (parsed !== null)
        {
            setSelectedMaxPrice(parsed);
        }
        setDropdownOpenRightPrice(false);
    }


    // Checks clicks outside the buttons and dropdowns
    function handleClickOutsideRooms(event: MouseEvent)
    {
        if (
            leftButtonRefRooms.current && !leftButtonRefRooms.current.contains(event.target as Node) &&
            leftDropdownRefRooms.current && !leftDropdownRefRooms.current.contains(event.target as Node)
        )
        {
            setDropdownOpenLeftRooms(false);
        }
        if (
            rightButtonRefRooms.current && !rightButtonRefRooms.current.contains(event.target as Node) &&
            rightDropdownRefRooms.current && !rightDropdownRefRooms.current.contains(event.target as Node)
        )
        {
            setDropdownOpenRightRooms(false);
        }
    }

    

    function handleClickOutsideLivingArea(event: MouseEvent)
    {
        if (
            leftButtonRefLivingArea.current && !leftButtonRefLivingArea.current.contains(event.target as Node) &&
            leftDropdownRefLivingArea.current && !leftDropdownRefLivingArea.current.contains(event.target as Node)
        )
        {
            setDropdownOpenLeftLivingArea(false);
        }
        if (
            rightButtonRefLivingArea.current && !rightButtonRefLivingArea.current.contains(event.target as Node) &&
            rightDropdownRefLivingArea.current && !rightDropdownRefLivingArea.current.contains(event.target as Node)
        )
        {
            setDropdownOpenRightLivingArea(false);
        }
    }



    function handleClickOutsidePrice(event: MouseEvent)
    {
        if (
            leftButtonRefPrice.current && !leftButtonRefPrice.current.contains(event.target as Node) &&
            leftDropdownRefPrice.current && !leftDropdownRefPrice.current.contains(event.target as Node)
        )
        {
            setDropdownOpenLeftPrice(false);
        }
        if (
            rightButtonRefPrice.current && !rightButtonRefPrice.current.contains(event.target as Node) &&
            rightDropdownRefPrice.current && !rightDropdownRefPrice.current.contains(event.target as Node)
        )
        {
            setDropdownOpenRightPrice(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutsideRooms);
        document.addEventListener("click", handleClickOutsideLivingArea);
        document.addEventListener("click", handleClickOutsidePrice);

        return () => {
            document.removeEventListener("click", handleClickOutsideRooms);
            document.removeEventListener("click", handleClickOutsideLivingArea);
            document.removeEventListener("click", handleClickOutsidePrice);
        };
    }, []);



    // Toggle dropdowns
    function toggleDropdownLeftRooms()
    {
        setDropdownOpenLeftRooms(prev => !prev);
    }

    function toggleDropdownRightRooms()
    {
        setDropdownOpenRightRooms(prev => !prev);
    }



    function toggleDropdownLeftLivingArea()
    {
        setDropdownOpenLeftLivingArea(prev => !prev);
    }

    function toggleDropdownRightLivingArea()
    {
        setDropdownOpenRightLivingArea(prev => !prev);
    }

    

    function toggleDropdownLeftPrice()
    {
        setDropdownOpenLeftPrice(prev => !prev);
    }

    function toggleDropdownRightPrice()
    {
        setDropdownOpenRightPrice(prev => !prev);
    }

    return (
        <>
            <div id="listingSearch">
                <h3>Residence Type</h3>
                <button className='residence'>All types</button>
                <button className='residence'>Single Family</button>
                <button className='residence'>Multiplex</button>
                <button className='residence'>Townhouse</button>
                <br/>
                <h3>Rooms</h3>
                <div className='roomsDropdownSection'>
                    <div className='roomsButtonSection'>
                        <button ref={leftButtonRefRooms} onClick={toggleDropdownLeftRooms} className="roomsDropdown left">{buttonTextLeftRooms}</button>
                        <h1>-</h1>
                        <button ref={rightButtonRefRooms} onClick={toggleDropdownRightRooms} className="roomsDropdown right">{buttonTextRightRooms}</button>
                    </div>


                    <div ref={leftDropdownRefRooms} className={`dropdown-content left ${isDropdownOpenLeftRooms ? "show" : ""}`}>
                        <ButtonList 
                        key={`min-${selectedMinRooms ?? 'null'}-${selectedMaxRooms ?? 'null'}`}
                        mode='min' currentMin={selectedMinRooms ?? 1}
                        currentMax={selectedMaxRooms ?? 10}
                        rooms='Min,1 room,2 rooms,3 rooms,4 rooms,5 rooms,6 rooms,7 rooms,8 rooms,9 rooms,10 rooms+'
                        onButtonClick={handleButtonTextLeftRooms}>
                        </ButtonList>
                    </div>


                    <div ref={rightDropdownRefRooms} className={`dropdown-content right ${isDropdownOpenRightRooms ? "show" : ""}`}>
                        <ButtonList
                        key={`max-${selectedMinRooms ?? 'null'}-${selectedMaxRooms ?? 'null'}`}
                        mode='max' currentMin={selectedMinRooms}
                        currentMax={selectedMaxRooms}
                        rooms='Max,1 room,2 rooms,3 rooms,4 rooms,5 rooms,6 rooms,7 rooms,8 rooms,9 rooms,10 rooms+'
                        onButtonClick={handleButtonTextRightRooms}>
                        </ButtonList>
                    </div>
                </div>
                <br/>
                <h3>Living Space</h3>
                <div className='livingAreaDropdownSection'>
                    <div className='livingAreaButtonSection'>
                        <button ref={leftButtonRefLivingArea} onClick={toggleDropdownLeftLivingArea} className="livingAreaDropdown left">{buttonTextLeftLivingArea}</button>
                        <h1>-</h1>
                        <button ref={rightButtonRefLivingArea} onClick={toggleDropdownRightLivingArea} className="livingAreaDropdown right">{buttonTextRightLivingArea}</button>
                    </div>


                    <div ref={leftDropdownRefLivingArea} className={`dropdown-content left ${isDropdownOpenLeftLivingArea ? "show" : ""}`}>
                        <ButtonList 
                        key={`min-${selectedMinLivingArea ?? 'null'}-${selectedMaxLivingArea ?? 'null'}`}
                        mode='min' currentMin={selectedMinLivingArea}
                        currentMax={selectedMaxLivingArea}
                        rooms='Min,<100 m&#178;,200 m&#178;,300 m&#178;,400 m&#178;,500 m&#178;,600 m&#178;,700 m&#178;,800 m&#178;,900 m&#178;,1000 m&#178;+'
                        onButtonClick={handleButtonTextLeftLivingArea}>
                        </ButtonList>
                    </div>


                    <div ref={rightDropdownRefLivingArea} className={`dropdown-content right ${isDropdownOpenRightLivingArea ? "show" : ""}`}>
                        <ButtonList
                        key={`max-${selectedMinLivingArea ?? 'null'}-${selectedMaxLivingArea ?? 'null'}`}
                        mode='max' currentMin={selectedMinLivingArea}
                        currentMax={selectedMaxLivingArea}
                        rooms='Max,<100 m&#178;,200 m&#178;,300 m&#178;,400 m&#178;,500 m&#178;,600 m&#178;,700 m&#178;,800 m&#178;,900 m&#178;,1000 m&#178;+'
                        onButtonClick={handleButtonTextRightLivingArea}>
                        </ButtonList>
                    </div>
                </div>
                <br/>
                <h3>Price Range</h3>
                <div className='priceDropdownSection'>
                    <div className='priceButtonSection'>
                        <button ref={leftButtonRefPrice} onClick={toggleDropdownLeftPrice} className="priceDropdown left">{buttonTextLeftPrice}</button>
                        <h1>-</h1>
                        <button ref={rightButtonRefPrice} onClick={toggleDropdownRightPrice} className="priceDropdown right">{buttonTextRightPrice}</button>
                    </div>


                    <div ref={leftDropdownRefPrice} className={`dropdown-content left ${isDropdownOpenLeftPrice ? "show" : ""}`}>
                        <ButtonList 
                        key={`min-${selectedMinPrice ?? 'null'}-${selectedMaxPrice ?? 'null'}`}
                        mode='min' currentMin={selectedMinPrice}
                        currentMax={selectedMaxPrice}
                        rooms='Min,<100 000 $,500 000 $,1 000 000 $,2 000 000 $,3 000 000 $,4 000 000 $,5 000 000 $,10 000 000 $+'
                        onButtonClick={handleButtonTextLeftPrice}>
                        </ButtonList>
                    </div>


                    <div ref={rightDropdownRefPrice} className={`dropdown-content right ${isDropdownOpenRightPrice ? "show" : ""}`}>
                        <ButtonList
                        key={`max-${selectedMinPrice ?? 'null'}-${selectedMaxPrice ?? 'null'}`}
                        mode='max' currentMin={selectedMinPrice}
                        currentMax={selectedMaxPrice}
                        rooms='Min,<100 000 $,500 000 $,1 000 000 $,2 000 000 $,3 000 000 $,4 000 000 $,5 000 000 $,10 000 000 $+'
                        onButtonClick={handleButtonTextRightPrice}>
                        </ButtonList>
                    </div>
                </div>
            </div>
        </>
    );
}
