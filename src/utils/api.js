export async function searchBooks(query) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Network error: ${response.status}`)
    }

    const data = await response.json()
    return data.docs
}