export async function getServices(): Promise<string[]> {
    const response = await fetch("http://localhost:3000/api/services", {next: { revalidate: 60 }});
    return await response.json();
}