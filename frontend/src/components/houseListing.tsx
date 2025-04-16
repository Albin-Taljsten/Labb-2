import axios from "axios";
import { useEffect, useState } from "react";

export function HouseListing()
{
    const lim: number = 10;

    // Stores the rows of ids, info and pagination from the db
    const [salesData, setSalesData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);  // Current page
    const [totalIds, setTotalIds] = useState<number>(0);  // Total number of ids (for pagination)

    // Function to fetch ids from the API
    const fetchSalesData = async (page: number) => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/SalesData', {
                params: {
                    page: page,
                    limit: lim, // Shows 50 ids per page (might have to lower this number)
                },
            });
            setSalesData(response.data.SalesData);
            // setTotalIds(response.total)
            console.log(response.data.SalesData);  // Log the fetched data to inspect its structure
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setLoading(false);
        }
    };

    // Fetch data when the page changes (when next page button is clicked)
    useEffect(() => {
        fetchSalesData(page);
    }, [page]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                salesData.map((salesData: any) => (
                    <div id="listingList" key={salesData.SalesID}>
                        <div className="lhalf1">
                            <img src={`/images/256x256/${salesData.Image}.jpg`} alt={salesData.Image} />
                        </div>
                        <div className="lhalf2">
                            <h2>Seattle</h2>
                            <p>Zip Code: {salesData.zip_code}</p>
                            <div className="listingText">
                                <p>{salesData.SalePrice}$</p>
                                <p>{salesData.SqMTotLiving} m&#178;</p>
                                <p>Rooms: {salesData.Bedrooms}</p>
                            </div>
                            <p className="infoText">
                                Welcome to this house in Seattle built in {salesData.YrBuilt}.
                                This house has a combined living area of {salesData.SqMLot} m&#178; with a nice view of the Seattle area.
                            </p>
                        </div>
                    </div>
                )
            ))}

            {/*Pagination Controls*/}
            <div className="prev-next-container">
                <button className="prevHouseList" type="button" onClick={(e) => { e.preventDefault(); handlePageChange(page - 1); }} disabled={page === 1}>Prev</button>
                <p className="houseListPageNum">Page {page}</p>
                <button className="nextHouseList" type="button" onClick={(e) => { e.preventDefault(); handlePageChange(page + 1); }} disabled={salesData.length < lim}>Next</button>
            </div>
        </>
    );
}