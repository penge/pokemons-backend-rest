GET {{host}}/api/pokemons/bulbasaur/attacks

HTTP 200
[Asserts]
jsonpath "$.fast" count == 2

jsonpath "$.fast[0].name" == "Tackle"
jsonpath "$.fast[0].type" == "Normal"
jsonpath "$.fast[0].damage" == 12

jsonpath "$.fast[1].name" == "Vine Whip"
jsonpath "$.fast[1].type" == "Grass"
jsonpath "$.fast[1].damage" == 7

jsonpath "$.special" count == 3

jsonpath "$.special[0].name" == "Power Whip"
jsonpath "$.special[0].type" == "Grass"
jsonpath "$.special[0].damage" == 70

jsonpath "$.special[1].name" == "Seed Bomb"
jsonpath "$.special[1].type" == "Grass"
jsonpath "$.special[1].damage" == 40

jsonpath "$.special[2].name" == "Sludge Bomb"
jsonpath "$.special[2].type" == "Poison"
jsonpath "$.special[2].damage" == 55
