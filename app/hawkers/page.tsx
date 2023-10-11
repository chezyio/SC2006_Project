import * as React from "react";
import HawkerCard from "../components/HawkerCard";
import DataTable from "../components/DataTable";

async function getHawkers() {
    const res = await fetch(
        "https://data.gov.sg/api/action/datastore_search?resource_id=b80cb643-a732-480d-86b5-e03957bc82aa&limit=9999"
    );
    const data = await res.json();

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return data.result.records;
}

const page = async () => {
    const hawkers = await getHawkers();
    console.log(hawkers);
    return (
        <div>
            {hawkers.map((hawker, num) => {
                return <HawkerCard key={num} hawker={hawker} />;
            })}
        </div>
    );
};

export default page;
