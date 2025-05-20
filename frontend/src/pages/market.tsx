import { NavBar } from "../components/navBar"
import { Footer } from "../components/footer"
import '../scss/out/market.css'
import {
    Chart,


    // Controllers
    BarController,
    LineController,
    PieController,
    DoughnutController,
    RadarController,
    PolarAreaController,
    BubbleController,
    ScatterController,

    // Elements
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Filler,

    // Scales
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    LogarithmicScale,
    TimeScale,
    TimeSeriesScale,

    // Plugins
    Tooltip,
    Legend,
    Title,
    SubTitle,
} from 'chart.js'
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(
    // Controllers
    BarController,
    LineController,
    PieController,
    DoughnutController,
    RadarController,
    PolarAreaController,
    BubbleController,
    ScatterController,
  
    // Elements
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Filler,
  
    // Scales
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    LogarithmicScale,
    TimeScale,
    TimeSeriesScale,
  
    // Plugins
    Tooltip,
    Legend,
    Title,
    SubTitle,
    zoomPlugin
);

// TODO
// Lägg till bidding formulär KLART
// Lägg till inloggnings state (i navbar)
// Två olika charts en för att titta värden en för att titta bidding values KLART
// Knappar för välja olika värden (första charten) KLART
// Info om person som budgivit om man trycker på specifik bud (när man är inloggad)
// Ser lite info om man inte är inloggad men ser mer om man är inloggad
// TODO

export function Market() {
    const [loggedIn, setLoggedIn] = useState(true);
    const toggleLogin = () => {
        setLoggedIn(prev => !prev);
    }

    const [activeView, setActiveView] = useState<'chart' | 'form'>('chart');
    const toggleActiveView = () => {
        setActiveView('form');
    }

    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    const [fetchedData, setFetchedData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [chartValue, setChartValue] = useState<string>("line");
    const [chartKey, setChartKey] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const propertyIDRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);
    const nameIDRef = useRef<number>(0);

    const [isFormValid, setIsFormValid] = useState(false)

    const [bidHistory, setBidHistory] = useState<any[]>([]);
    const ws = useRef<WebSocket | null>(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/SalesData');
            console.log(response.data);
            setFetchedData(response.data.SalesData);
        } catch (error) {
            console.error('Failed to fetch data: ', error)
            setFetchedData([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    const makeChart = (newChart: Chart) =>
    {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = newChart;
    }

    const chooseChart = (chartType: string) => 
    {
        const canvas = chartRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        switch (chartType)
        {
            case "line":
                lineChart();
                break;
            case "bar":
                barChart();
                break;
            case "pie":
                pieChart();
                break;
        }
    }

    const validationFrame = useRef<number | null>(null);

    const handleInput = () => {

        if (validationFrame.current !== null)
        {
            cancelAnimationFrame(validationFrame.current);
        }

        validationFrame.current = requestAnimationFrame(() => {
                        const allFilled = 
                nameRef.current?.value &&
                emailRef.current?.value &&
                propertyIDRef.current?.value &&
                amountRef.current?.value;

            setIsFormValid(!!allFilled);
        })
    };

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:3000');

        ws.current.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === 'history') {
                console.log(data);
                setBidHistory(data.bids);
            }
        };

        ws.current.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            ws.current?.close();
        };
    }, []);

    const handleSubmit = () => {
        if (!isFormValid) return;

        const data = {
            name: nameRef.current!.value,
            email: emailRef.current!.value,
            propertyID: propertyIDRef.current!.value,
            amount: amountRef.current!.value,
            nameID: nameIDRef.current,
        };

        if (ws.current && ws.current.readyState === WebSocket.OPEN)
        {
            ws.current.send(JSON.stringify(data));
            console.log('Sent bid data: ', data);
        } else {
            console.error('WebSocket is not open');
        }
    };

    useEffect(() => {
        if(fetchedData.length === 0) return;
        chooseChart(chartValue);

        return () => {
            chartInstanceRef.current?.destroy();
          };
    }, [chartValue, fetchedData, chartKey]);

    function barChart()
    {   
        const ctx = chartRef.current?.getContext('2d');
        if(!ctx) return;

        const singleFamilyAmount = fetchedData.filter(item => item.PropertyType === "Single Family");
        const multiplexAmount = fetchedData.filter(item => item.PropertyType === "Multiplex");
        const townsHouseAmount = fetchedData.filter(item => item.PropertyType === "Townhouse");

        const averageSingleFamily = singleFamilyAmount.reduce((acc, item) => acc + item.SalePrice, 0) / singleFamilyAmount.length || 0;
        const averageMultiplex = multiplexAmount.reduce((acc, item) => acc + item.SalePrice, 0) / multiplexAmount.length || 0;
        const averageTownHouse = townsHouseAmount.reduce((acc, item) => acc + item.SalePrice, 0) / townsHouseAmount.length || 0;

        makeChart(new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Single Family', 'Multiplex', 'Townhouse'],
                datasets: [{
                    data: [averageSingleFamily, averageMultiplex, averageTownHouse],
                    backgroundColor: [
                    'rgba(3, 104, 0, 0.8)',
                    'rgba(0, 17, 255, 0.8)',
                    'rgba(255, 0, 0, 0.8)',
                        ],
                    borderColor: [
                    'rgba(9, 255, 0, 1)',
                    'rgba(0, 17, 255, 1)',
                    'rgba(255, 0, 0, 1)'
                    ],
                    borderWidth: 1
                }]
                
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => '$' + value.toLocaleString(),
                        }
                    }
                    
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        }));
    }

    function pieChart()
    {   
        
        const ctx = chartRef.current?.getContext('2d');
        if(!ctx) return;

        const singleFamily = fetchedData.filter(item => item.PropertyType === "Single Family").reduce((acc, item) => acc + 1, 0);
        const multiplex = fetchedData.filter(item => item.PropertyType === "Multiplex").reduce((acc, item) => acc + 1, 0);
        const townHouse = fetchedData.filter(item => item.PropertyType === "Townhouse").reduce((acc, item) => acc + 1, 0);
        makeChart(new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Single-Family', 'Multiplex', 'Townhouse'],
            datasets: [
                {
                    label: 'Property Types Count',
                    data: [singleFamily, multiplex, townHouse],
                    backgroundColor: [
                        'rgba(3, 104, 0, 0.8)',
                        'rgba(0, 17, 255, 0.8)',
                        'rgba(255, 0, 0, 0.8)',
                    ],
                    borderColor: [
                        'rgba(9, 255, 0, 1)',
                        'rgba(0, 17, 255, 1)',
                        'rgba(255, 0, 0, 1)'
                    ],
                    borderWidth: 1
                
                }]
            },
        
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    },
                }
            }
        }));
    }

    function lineChart()
    {
        const ctx = chartRef.current?.getContext('2d');
        if(!ctx) return;

        const groupByYear = new Map<number, number[]>();
        const currentYear = new Date().getFullYear();
       

        fetchedData
            .filter(item => {
                const year = Number(item.YrBuilt)
                return year >= 1800 && year <= currentYear && item.SalePrice;
            })
            .forEach(item => {
                const year = Number(item.YrBuilt);
                if (!groupByYear.has(year)) groupByYear.set(year, []);
                groupByYear.get(year)!.push(item.SalePrice)
        });
        
        const dataPoints = Array.from(groupByYear.entries())
            .map(([year, prices]) => ({
                x: year,
                y: prices.reduce((sum, p) => sum + p, 0) / prices.length
            }))
            .sort((a, b) => a.x - b.x);
        
        makeChart(new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Average Sale Price per year Built',
                    data: dataPoints,
                    fill: false,
                    borderColor: 'blue',
                    backgroundColor: 'blue',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'linear',
                        title: {
                            display: true,
                            text: 'Year Built'
                        },
                        ticks:{
                            stepSize: 10,
                            callback: value => Number(value).toFixed(0)
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'US dollar'
                        },
                        ticks: {
                            callback: value => '$' + value.toLocaleString()
                        }
                    }
                },
                plugins: {
                    zoom: {
                        pan:{
                            enabled:true,
                            mode: 'x',
                        },
                        zoom: {
                            wheel: {
                                enabled: true,
                            },
                            pinch:{
                                enabled: true,
                            },
                            mode: 'x',
                        }

                    }
                }
            }
        }));

    }

    return (
        <>
            <NavBar activePage="market" loggedIn={loggedIn} toggleLogin={toggleLogin}></NavBar>

            <div className="chartButtonsContainer">
                <div className="chartButtons">
                    <select className="chartDropdown" value={chartValue} onMouseDown={() => {setActiveView('chart'); setChartKey(prev => !prev);}} onChange={ (e) => {setChartValue(e.target.value); setActiveView('chart');}}>
                        <option value="" disabled>Select Chart</option>
                        <option value="line">Average Sale Price per year Built</option>
                        <option value="bar">Average cost per type</option>
                        <option value="pie">Property type</option>
                    </select>
                    <button className="chartButton" onClick={() => setActiveView('form')}>Bidding</button>
                </div>
            </div>

            <div className="testChart">
                {activeView === 'chart' ? (     
                    <>               
                        <canvas 
                            ref= { chartRef } 
                            style= {{ 
                                maxWidth: '700px',
                                width: '400px',
                            }}
                        >
                        </canvas>
                    </>
                ) : (
                    <div className="biddingForm">
                        <h1>Place a bid on a property</h1>

                        <div className="name">
                            <p>Full name:</p>
                            <input 
                                ref={nameRef}
                                name="name" 
                                type="text" 
                                placeholder="Jon Doe"
                                onInput={handleInput}
                            />
                        </div>

                        <div className="email">
                            <p>Email:</p>
                            <input 
                                ref={emailRef}
                                name="email" 
                                type="email" 
                                placeholder="example@gmail.com"
                                onInput={handleInput}
                            />
                        </div>

                        <div className="propertyID">
                            <p>Property ID:</p>
                            <input 
                                ref={propertyIDRef}
                                name="propertyID" 
                                type="number" 
                                placeholder="7 digits e.g. 2800016"
                                onInput={handleInput}
                            />
                        </div>

                        <div className="amount">
                            <p>Bid amount:</p>
                            <input 
                                ref={amountRef}
                                type="number" 
                                placeholder="Enter amount in USD"
                                onInput={handleInput}
                            />
                        </div>
                        <button type="submit" onClick={handleSubmit} disabled={!isFormValid}>Submit bid</button>
                        {loggedIn ? (
                            // För anonyma användare
                            <div className="bidCardContainer">
                                <h2>Bid History</h2>
                                <ul className="cardList">
                                    {bidHistory.map((bid, i) => (
                                        <div key={i} className="bidCard">
                                            <h3>Anonymous {bid.nameID}</h3>
                                            <p>Bid Amount: {bid.amount}$</p>
                                            <p>PropertyID: {bid.propertyID}</p>
                                        </div>
                                    ))}
                                </ul>

                            </div>
                        ) : (
                            // För mäklare
                            <div className="bidCardContainer">
                                <h2>Bid History</h2>
                                <ul className="cardList">
                                    {bidHistory.map((bid, i) => (
                                        <div key={i} className="bidCard">
                                            <h3>{bid.name}</h3>
                                            <p>Email: {bid.email}</p>
                                            <p>Bid Amount: {bid.amount}$</p>
                                            <p>PropertyID: {bid.propertyID}</p>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer></Footer>
        </>
    );
}