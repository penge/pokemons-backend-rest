# ------ 1. To favorite pokemon, we need to be authorized. ------

POST {{host}}/api/pokemons/001/favorite
{ "favorite": true }

HTTP 401


# ------ 2. To get favorite pokemons, we need to be authorized. ------

GET {{host}}/api/pokemons?favorite=true

HTTP 401


# ------ 3. Adding 2 pokemons to favorites. ------

POST {{host}}/api/pokemons/001/favorite
x-webauth-user: "joe@domain.com"
{ "favorite": true }

HTTP 201
[Asserts]
jsonpath "$" == true


POST {{host}}/api/pokemons/025/favorite
x-webauth-user: "joe@domain.com"
{ "favorite": true }

HTTP 201
[Asserts]
jsonpath "$" == true


# ------ 4. Our 2 favorite pokemons should be in favorites list. ------

GET {{host}}/api/pokemons?favorite=true
x-webauth-user: "joe@domain.com"

HTTP 200
[Asserts]
jsonpath "$.data" count == 2
jsonpath "$.data[0].id" == "001"
jsonpath "$.data[1].id" == "025"

jsonpath "$.meta.limit" == 20
jsonpath "$.meta.offset" == 0
jsonpath "$.meta.count" == 2


# ------ 5. Removing our 2 pokemons from favorites. ------

POST {{host}}/api/pokemons/001/favorite
x-webauth-user: "joe@domain.com"
{ "favorite": false }

HTTP 200
[Asserts]
jsonpath "$" == false


POST {{host}}/api/pokemons/025/favorite
x-webauth-user: "joe@domain.com"
{ "favorite": false }

HTTP 200
[Asserts]
jsonpath "$" == false


# ------ 6. Check our 2 pokemons are no longer in favorites list. ------

GET {{host}}/api/pokemons?favorite=true
x-webauth-user: "joe@domain.com"

HTTP 200
[Asserts]
jsonpath "$.data" count == 0

jsonpath "$.meta.limit" == 20
jsonpath "$.meta.offset" == 0
jsonpath "$.meta.count" == 0
