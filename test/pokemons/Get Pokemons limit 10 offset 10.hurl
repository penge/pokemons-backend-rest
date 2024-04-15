GET {{host}}/api/pokemons?limit=10&offset=10

HTTP 200
[Asserts]
jsonpath "$.data" count == 10
jsonpath "$.data[0].id" == "011"

jsonpath "$.meta.limit" == 10
jsonpath "$.meta.offset" == 10
jsonpath "$.meta.count" == 151
