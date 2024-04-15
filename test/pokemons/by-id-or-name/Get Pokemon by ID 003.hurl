GET {{host}}/api/pokemons/003

HTTP 200
[Asserts]
jsonpath "$.*" count == 8
jsonpath "$.id" == "003"
jsonpath "$.name" == "Venusaur"
jsonpath "$.classification" == "Seed"
jsonpath "$.types[0]" == "Grass"
jsonpath "$.types[1]" == "Poison"
jsonpath "$.fleeRate" == 0.05
jsonpath "$.maxCP" == 2392
jsonpath "$.maxHP" == 2580
jsonpath "$.evolution" == null
