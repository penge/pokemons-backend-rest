GET {{host}}/api/pokemons?limit=10

HTTP 200
[Asserts]
jsonpath "$.data" count == 10
jsonpath "$.data[0].id" == "001"

jsonpath "$.meta.limit" == 10
jsonpath "$.meta.offset" == 0
jsonpath "$.meta.count" == 151
