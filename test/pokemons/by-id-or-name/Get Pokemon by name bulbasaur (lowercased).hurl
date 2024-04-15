GET {{host}}/api/pokemons/bulbasaur

HTTP 200
[Asserts]
jsonpath "$.*" count == 8
jsonpath "$.id" == "001"
jsonpath "$.name" == "Bulbasaur"
jsonpath "$.classification" == "Seed"
jsonpath "$.types[0]" == "Grass"
jsonpath "$.types[1]" == "Poison"
jsonpath "$.fleeRate" == 0.1
jsonpath "$.maxCP" == 951
jsonpath "$.maxHP" == 1071
jsonpath "$.evolution.to" == "002"
jsonpath "$.evolution.requiredAmount" == 25
jsonpath "$.evolution.requiredName" == "Bulbasaur candies"
