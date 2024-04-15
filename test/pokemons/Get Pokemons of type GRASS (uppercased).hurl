GET {{host}}/api/pokemons?type=Grass

HTTP 200
[Asserts]
jsonpath "$.data" count == 14
jsonpath "$.data[0].types[0]" == "Grass"
jsonpath "$.data[13].types[0]" == "Grass"

jsonpath "$.meta.type" == "Grass"
jsonpath "$.meta.limit" == 20
jsonpath "$.meta.offset" == 0
jsonpath "$.meta.count" == 14
