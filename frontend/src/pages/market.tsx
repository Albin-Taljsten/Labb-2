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
    SubTitle
);

// TODO
// Lägg till bidding formulär
// Lägg till inloggnings state (i navbar)
// Två olika charts en för att titta värden en för att titta bidding values
// Knappar för välja olika värden (första charten)
// Info om person som budgivit om man trycker på specifik bud (när man är inloggad)
// Ser lite info om man inte är inloggad men ser mer om man är inloggad
// TODO

export function Market() {

    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    const [fetchedData, setFetchedData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [xValues, setXValues] = useState([50,60,70,80,90,100,110,120,130,140,150]);
    const [yValues, setYValues] = useState([7,8,8,9,9,9,10,11,14,14,15]);

    const [chartValue, setChartValue] = useState<string>("line");

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
                makeChart(new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: xValues,
                        datasets: [
                            {
                                label: 'Votes',
                                data: yValues,
                                borderColor: 'rgba(255, 0, 0, 0.2)',
                                backgroundColor: 'red',
                                fill: false,
                                tension: 0.3
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Vote Results',
                            }
                        }
                    }
                }));
                break;
            case "bar":
                makeChart(new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: xValues,
                        datasets: [
                            {
                                label: 'Votes',
                                data: yValues,
                                borderColor: 'rgba(0, 17, 255, 0.2)',
                                backgroundColor: 'blue',
                                fill: false,
                                tension: 0.3
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Vote Results',
                            }
                        }
                    }
                }));
                break;
        }
    }

    useEffect(() => {

        chooseChart(chartValue);

        return () => {
            chartInstanceRef.current?.destroy();
          };
    }, [chartValue]);

    useEffect(() => {
        const chart = chartInstanceRef.current;
        if (!chart) return;

        chart.data.labels = xValues;
        chart.data.datasets[0].data = yValues;
        chart.update();
    }, [xValues, yValues]);

    // useEffect(() => {
    //     if (!chartInstanceRef.current) return;

    //     const labels = fetchedData.map(item => item.name);
    //     const values = fetchedData.map(item => item.sales);

    //     const chart = chartInstanceRef.current;
    //     chart.data.labels = labels;
    //     chart.data.datasets[0].data = values;
    //     chart.update();
    // }, [fetchedData]);

    function randomizeData()
    {
        setXValues(xValues.map(x => x + 10));
        setYValues(yValues.map(() => Math.floor(Math.random() * 15) + 5));
    }

    function lineChart()
    {
        setChartValue("line");
    }
    function barChart()
    {
        setChartValue("bar");
    }
    function pieChart()
    {
        setChartValue("pie");
    }
    

    return (
        <>
            <NavBar activePage="market"></NavBar>

            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {fetchedData.map((fetchedData: any, index) => (
                            <h1></h1> //Here if needed for the data
                        ))}
                    </div>
                )}
            </div>

            <div className="chartButtons">
                <button className="chartButton" onClick={lineChart}>Line Chart</button>
                <button className="chartButton" onClick={barChart}>Bar Chart</button>
                <button className="chartButton" onClick={pieChart}>Pie Chart</button>
            </div>

            <div className="testChart">
                <canvas 
                    ref= { chartRef } 
                    style= {{ 
                        maxHeight: '250px',
                        maxWidth: '500px',
                    }}
                >
                </canvas>
            </div>
            <button className="randomButton" onClick={randomizeData}>Randomize</button>
            <Footer></Footer>
        </>
    );
}