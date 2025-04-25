import React, { createContext, useContext, useState, ReactNode } from "react";

interface FilterValues {
    minRooms: number;
    maxRooms: number;
    minLivingArea: number;
    maxLivingArea: number;
    minPrice: number;
    maxPrice: number;
    residenceTypeToggles: {
        allTypes: boolean;
        singleFamily: boolean;
        multiplex: boolean;
        townhouse: boolean;
    };
}

const defaultFilterValues: FilterValues = {
    minRooms: 0,
    maxRooms: 10,
    minLivingArea: 100,
    maxLivingArea: 1000,
    minPrice: 100000,
    maxPrice: 10000000,
    residenceTypeToggles: {
        allTypes: false,
        singleFamily: false,
        multiplex: false,
        townhouse: false,
    },
};

const ListingSearchContext = createContext<{
    filterValues: FilterValues;
    setFilterValues: React.Dispatch<React.SetStateAction<FilterValues>>;
}>({
    filterValues: defaultFilterValues,
    setFilterValues: () => {},
});

interface ListingSearchProviderProps {
    children: ReactNode;
}

export const ListingSearchProvider: React.FC<ListingSearchProviderProps> = ({ children }) => {
    const [filterValues, setFilterValues] = useState<FilterValues>(defaultFilterValues);

    return (
        <ListingSearchContext.Provider value={{ filterValues, setFilterValues }}>
            {children}
        </ListingSearchContext.Provider>
    );
};

export const useListingSearch = () => {
    const context = useContext(ListingSearchContext);

    if (!context) {
        throw new Error("useListingSearch must be used within a ListingSearchProvider");
    }

    return context;
};