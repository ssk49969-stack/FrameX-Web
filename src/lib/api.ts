/**
 * FrameX Studios - Secure Data Fetcher
 * Built by: Backend JSON Architect
 */
export async function fetchAgencyData() {
  try {
    const response = await fetch("/api/data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("FrameX Studios - Data Fetch Error:", error);
    return null;
  }
}
