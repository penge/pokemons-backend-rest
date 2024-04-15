GET {{host}}/api/pokemons/ivysaur/evolutions

HTTP 200
[Asserts]
jsonpath "$" count == 1

jsonpath "$[0].id" == "003"
jsonpath "$[0].name" == "Venusaur"
