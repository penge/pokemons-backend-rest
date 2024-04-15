GET {{host}}/api/pokemons?type=poison

HTTP 200
[Asserts]
jsonpath "$.data" count == 20
jsonpath "$.data[0].types[0]" == "Grass"
jsonpath "$.data[0].types[1]" == "Poison"

jsonpath "$.meta.type" == "Poison"
jsonpath "$.meta.limit" == 20
jsonpath "$.meta.offset" == 0
jsonpath "$.meta.count" == 33
