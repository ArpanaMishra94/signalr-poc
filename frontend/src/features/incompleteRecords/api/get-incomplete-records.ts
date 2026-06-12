// Centralize API calls

import type { IncompleteRecord } from "../types/IncompleteRecord";

export const getIncompleteRecords = async (): Promise<IncompleteRecord[]> => {

    const response = await fetch(
        "http://localhost:5110/api/test/records"
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch records"
        );
    }

    return response.json();
};