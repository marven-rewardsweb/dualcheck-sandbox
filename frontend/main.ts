
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

async function checkBackendStatus() {
    const statusEl = document.getElementById("apiStatus");
    if (!statusEl) return;

    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/ping`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            statusEl.className = "status-value success";
            statusEl.innerHTML = "<span>✓</span><span>Connected</span>";
            return data;
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (error) {
        statusEl.className = "status-value error";
        statusEl.innerHTML = "<span>✗</span><span>Disconnected</span>";
        throw error;
    }
}

async function testBackend() {
    const responseEl = document.getElementById("response");
    if (!responseEl) return;

    responseEl.style.display = "none";

    try {
        const data = await checkBackendStatus();
        responseEl.style.display = "block";
        responseEl.innerHTML = `<strong>Success!</strong><br>Backend response: ${JSON.stringify(data, null, 2)}`;
    } catch (error) {
        responseEl.style.display = "block";
        const errorMessage = error instanceof Error ? error.message : String(error);
        responseEl.innerHTML = `<strong>Error:</strong><br>${errorMessage}<br><br>Backend URL: ${BACKEND_URL}<br>Make sure to set VITE_BACKEND_URL environment variable in Vercel.`;
    }
}

// Make testBackend available globally
(window as any).testBackend = testBackend;

// Check backend status on page load
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(checkBackendStatus, 1000);
});