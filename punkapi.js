const rootEndPoint = "https://api.punkapi.com/v2"

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
}

export const getRandomBrewdog = () =>
    fetch(`${rootEndPoint}/beers/random`, { headers }).then(
        (response) => {
            if (response.status !== 200)
                throw new Error(`API answered with status code ${status}`)
            else {
                return response.json()
            }
        }
    )