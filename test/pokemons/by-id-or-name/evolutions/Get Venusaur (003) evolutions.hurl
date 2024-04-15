GET {{host}}/api/pokemons/venusaur/evolutions

HTTP 200
[Asserts]
jsonpath "$" count == 0
