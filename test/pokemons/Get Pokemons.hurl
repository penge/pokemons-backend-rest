GET {{host}}/api/pokemons

HTTP 200
[Asserts]
jsonpath "$.data" count == 20
jsonpath "$.data[0].*" count == 4
jsonpath "$.data[0].id" == "001"
jsonpath "$.data[0].name" == "Bulbasaur"
jsonpath "$.data[0].classification" == "Seed"
jsonpath "$.data[0].types[0]" == "Grass"
jsonpath "$.data[0].types[1]" == "Poison"

jsonpath "$.meta.limit" == 20
jsonpath "$.meta.offset" == 0
jsonpath "$.meta.count" == 151
