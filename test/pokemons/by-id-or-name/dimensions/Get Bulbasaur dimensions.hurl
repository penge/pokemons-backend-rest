GET {{host}}/api/pokemons/bulbasaur/dimensions

HTTP 200
[Asserts]
jsonpath "$.weight.minimum" == 6.04
jsonpath "$.weight.maximum" == 7.76
jsonpath "$.weight.units" == "kg"

jsonpath "$.height.minimum" == 0.61
jsonpath "$.height.maximum" == 0.79
jsonpath "$.height.units" == "m"
