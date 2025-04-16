import '../scss/out/listingSearch.css'

import { useEffect, useRef, useState } from "react";
import { ButtonList } from './buttonList';

export function ListingSearch()
{
    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log('🔄 Fetching from backend...');
    
        fetch('http://localhost:3000')
        .then((res) => {
            console.log('✅ Response status:', res.status);
            return res.json();
        })
        .then((data) => {
            console.log('📦 JSON received:', data);
            if (data && data.message) {
            setMessage(data.message);
            } else {
            setMessage('⚠️ No message received');
            }
        })
        .catch((err) => {
            console.error('❌ Fetch error:', err);
            setMessage('❌ Failed to load message');
        });
    }, []);

    // Show or Hide dropdown
    const [isDropdownOpenLeft, setDropdownOpenLeft] = useState(false);
    const [isDropdownOpenRight, setDropdownOpenRight] = useState(false);

    // Change button text
    const [buttonTextLeft, setButtonTextLeft] = useState('Min');
    const [buttonTextRight, setButtonTextRight] = useState('Max');

    // Refs for buttons
    const leftButtonRef = useRef<HTMLButtonElement>(null);
    const rightButtonRef = useRef<HTMLButtonElement>(null);
    const leftDropdownRef = useRef<HTMLDivElement>(null);
    const rightDropdownRef = useRef<HTMLDivElement>(null);

    // Functions to handle button text
    function handleButtonTextLeft(label: string)
    {
        setButtonTextLeft(label);
        setDropdownOpenLeft(false);
    }

    function handleButtonTextRight(label: string)
    {
        setButtonTextRight(label);
        setDropdownOpenRight(false);
    }


    // Checks clicks outside the buttons and dropdowns
    function handleClickOutside(event: MouseEvent)
    {
        if (
            leftButtonRef.current && !leftButtonRef.current.contains(event.target as Node) &&
            leftDropdownRef.current && !leftDropdownRef.current.contains(event.target as Node)
        )
        {
            setDropdownOpenLeft(false);
        }
        if (
            rightButtonRef.current && !rightButtonRef.current.contains(event.target as Node) &&
            rightDropdownRef.current && !rightDropdownRef.current.contains(event.target as Node)
        )
        {
            setDropdownOpenRight(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);



    // Toggle dropdowns
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
                        <button ref={leftButtonRef} onClick={toggleDropdownLeft} className="roomsDropdown left">{buttonTextLeft}</button>
                        <h1>-</h1>
                        <button ref={rightButtonRef} onClick={toggleDropdownRight} className="roomsDropdown right">{buttonTextRight}</button>
                    </div>


                    <div ref={leftDropdownRef} className={`dropdown-content left ${isDropdownOpenLeft ? "show" : ""}`}>
                        <ButtonList rooms='Min,1 room,2 rooms,3 rooms,4 rooms,5 rooms,6 rooms,7 rooms,8 rooms,9 rooms,10 rooms+' onButtonClick={handleButtonTextLeft}></ButtonList>
                    </div>


                    <div ref={rightDropdownRef} className={`dropdown-content right ${isDropdownOpenRight ? "show" : ""}`}>
                        <ButtonList rooms='Max,1 room,2 rooms,3 rooms,4 rooms,5 rooms,6 rooms,7 rooms,8 rooms,9 rooms,10 rooms+' onButtonClick={handleButtonTextRight}></ButtonList>
                    </div>
                </div>
                <br/>
                <div className='test'>
                    <h3>Living Area</h3>
                    <p>{message}</p>
                    <br/>
                    <h3>Price Range</h3>
                </div>
            </div>
        </>
    );
}
