export async function getServices(): Promise<string[]> {
    const domain = window.location.protocol + "//" + window.location.host;

    const response = await fetch(`${domain}/api/services`, {next: { revalidate: 60 }});
    return await response.json();
}