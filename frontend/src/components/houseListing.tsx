import axios from "axios";
import { useEffect, useState } from "react";
import { useListingSearch } from '../hooks/listingSearchContext'

export function HouseListing()
{
    const lim = 10;

    // Stores the rows of ids, info and pagination from the db
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);  // Current page

    const { filterValues, setFilterValues } = useListingSearch();

    // Function to fetch ids from the API
    const fetchFilteredData = async ({
        page,
        limit,
        singleFamily,
        multiplex,
        townhouse,
        minRooms,
        maxRooms,
        minLivingArea,
        maxLivingArea,
        minPrice,
        maxPrice,
      }: {
        page?: number;
        limit?: number;
        singleFamily?: boolean;
        multiplex?: boolean;
        townhouse?: boolean;
        minRooms?: number;
        maxRooms?: number;
        minLivingArea?: number;
        maxLivingArea?: number;
        minPrice?: number;
        maxPrice?: number;
      }) => {
        try {
          const response = await axios.get('http://localhost:3000/FilterData', {
            params: {
              page,
              limit,
              singleFamily,
              multiplex,
              townhouse,
              minRooms,
              maxRooms,
              minLivingArea,
              maxLivingArea,
              minPrice,
              maxPrice,
            },
          });
          console.log(response.data);  // Check the response in the console
          return response.data.FilterData;
        } catch (error) {
          console.error('Failed to fetch filtered data:', error);
          return [];
        }
      };

    // Fetch data when the page changes (when next page button is clicked)
    const handleSearch = () => {
        setLoading(true);
        fetchFilteredData({
            page: page,
            limit: lim,
            singleFamily: filterValues.residenceTypeToggles.singleFamily,
            multiplex: filterValues.residenceTypeToggles.multiplex,
            townhouse: filterValues.residenceTypeToggles.townhouse,
            minRooms: filterValues.minRooms,
            maxRooms: filterValues.maxRooms,
            minLivingArea: filterValues.minLivingArea,
            maxLivingArea: filterValues.maxLivingArea,
            minPrice: filterValues.minPrice,
            maxPrice: filterValues.maxPrice,
          })
          .then((data) => {
            setFilteredData(data);
            setLoading(false);
          });
    };

    useEffect(() => {
        handleSearch();
    }, [page]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <>
            <button onClick={handleSearch} className="searchButton">Search</button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                filteredData.map((filteredData: any) => (
                    <div id="listingList" key={filteredData.SalesID}>
                        <div className="lhalf1">
                            <img src={`/images/256x256/${filteredData.Image}.jpg`} alt={filteredData.Image} />
                        </div>
                        <div className="lhalf2">
                            <h2>Seattle</h2>
                            <p>Zip Code: {filteredData.zip_code}</p>
                            <div className="listingText">
                                <p>{filteredData.SalePrice}$</p>
                                <p>{filteredData.SqMTotLiving} m&#178;</p>
                                <p>Rooms: {filteredData.Bedrooms}</p>
                            </div>
                            <p className="infoText">
                                Welcome to this {filteredData.PropertyType} house in Seattle built in {filteredData.YrBuilt}.
                                This house has a combined living area of {filteredData.SqMLot} m&#178; with a nice view of the Seattle area.
                            </p>
                        </div>
                    </div>
                )
            ))}

            {/*Pagination Controls*/}
            <div className="prev-next-container">
                <button className="prevHouseList" type="button" onClick={(e) => { e.preventDefault(); handlePageChange(page - 1); }} disabled={page === 1}>Prev</button>
                <p className="houseListPageNum">Page {page}</p>
                <button className="nextHouseList" type="button" onClick={(e) => { e.preventDefault(); handlePageChange(page + 1); }} disabled={filteredData.length < lim}>Next</button>
            </div>
        </>
    );
}