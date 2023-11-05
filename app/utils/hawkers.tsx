export async function getHawkers() {
    const res = await fetch(
        "https://data.gov.sg/api/action/datastore_search?resource_id=b80cb643-a732-480d-86b5-e03957bc82aa&limit=9999"
    );
    const data = await res.json();

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return data.result.records;
}

export async function getHawkersById(id) {
    const res = await fetch(
        "https://data.gov.sg/api/action/datastore_search?resource_id=b80cb643-a732-480d-86b5-e03957bc82aa&limit=9999"
    );
    const data = await res.json();
    const hawker = data.result.records.find((hawker) => hawker._id == id);

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return hawker;
}
