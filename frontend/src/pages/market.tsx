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

export function Market() {

    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    const [xValues, setXValues] = useState([50,60,70,80,90,100,110,120,130,140,150]);
    const [yValues, setYValues] = useState([7,8,8,9,9,9,10,11,14,14,15]);

    useEffect(() => {
        
        const canvas = chartRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
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
        });

        return () => {
            chartInstanceRef.current?.destroy();
          };
    }, []);

    useEffect(() => {
        const chart = chartInstanceRef.current;
        if (!chart) return;

        chart.data.labels = xValues;
        chart.data.datasets[0].data = yValues;
        chart.update();
    }, [xValues, yValues]);

    function randomizeData()
    {
        setXValues(xValues.map(x => x + 10));
        setYValues(yValues.map(() => Math.floor(Math.random() * 15) + 5));
    }

    return (
        <>
            <NavBar activePage="market"></NavBar>
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