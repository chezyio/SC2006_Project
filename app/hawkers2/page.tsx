import React from "react";
import { Payment, columns } from "../components/columns";
import { DataTable } from "../components/data-table";

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    const res = await fetch(
        "https://data.gov.sg/api/action/datastore_search?resource_id=b80cb643-a732-480d-86b5-e03957bc82aa&limit=9999"
    );
    const data = await res.json();

    return data.result.records;
}

const page = async () => {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default page;
