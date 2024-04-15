GET {{host}}/api/pokemons/bulbasaur/evolutions

HTTP 200
[Asserts]
jsonpath "$" count == 2

jsonpath "$[0].id" == "002"
jsonpath "$[0].name" == "Ivysaur"

jsonpath "$[1].id" == "003"
jsonpath "$[1].name" == "Venusaur"
