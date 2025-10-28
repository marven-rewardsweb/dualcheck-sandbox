type PingResponse = { message: string };

async function ping(baseUrl = "http://localhost:8080"): Promise<PingResponse> {
    const res = await fetch(`${baseUrl}/api/v1/ping`);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const data = (await res.json()) as unknown;

    // Narrowing súper simple (sin librerías):
    if (
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof (data as any).message === "string"
    ) {
        return data as PingResponse;
    }
    throw new Error("Invalid response error");
}

// Ejecutar si se llama directamente con `node --loader ts-node/esm` o solo para type-check:
if (require.main === module) {
    ping().then((r) => {
        // eslint-disable-next-line no-console
        console.log("Ping says:", r.message);
    }).catch((e) => {
        console.error(e);
        process.exit(1);
    });
}

export { ping, type PingResponse };