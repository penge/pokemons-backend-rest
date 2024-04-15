# ------ 1. Adding pokemons to favorites by 2 different users. ------

POST {{host}}/api/pokemons/006/favorite
x-webauth-user: "bob@domain.com"
{ "favorite": true }

HTTP 201


POST {{host}}/api/pokemons/007/favorite
x-webauth-user: "sally@domain.com"
{ "favorite": true }

HTTP 201


# ------ 2. Check each user sees only his/her favorites. ------

GET {{host}}/api/pokemons?favorite=true
x-webauth-user: "bob@domain.com"

HTTP 200
[Asserts]
jsonpath "$.data" count == 1
jsonpath "$.data[0].id" == "006"


GET {{host}}/api/pokemons?favorite=true
x-webauth-user: "sally@domain.com"

HTTP 200
[Asserts]
jsonpath "$.data" count == 1
jsonpath "$.data[0].id" == "007"


# ------ 3. Check other user favorite remains untouched. ------

POST {{host}}/api/pokemons/007/favorite
x-webauth-user: "bob@domain.com" # Bob didn't add 007 to his favorites, but he added 006.
{ "favorite": false }

HTTP 200


GET {{host}}/api/pokemons?favorite=true
x-webauth-user: "sally@domain.com"

HTTP 200
[Asserts]
jsonpath "$.data" count == 1
jsonpath "$.data[0].id" == "007" # Sally's pokemon should remain in her list.


# ------ 4. Remove pokemons from favorites. ------

POST {{host}}/api/pokemons/006/favorite
x-webauth-user: "bob@domain.com"
{ "favorite": false }

HTTP 200


POST {{host}}/api/pokemons/007/favorite
x-webauth-user: "sally@domain.com"
{ "favorite": false }

HTTP 200


# ------ 5. Check favorites list is empty. ------

GET {{host}}/api/pokemons?favorite=true
x-webauth-user: "bob@domain.com"

HTTP 200
[Asserts]
jsonpath "$.data" count == 0


GET {{host}}/api/pokemons?favorite=true
x-webauth-user: "sally@domain.com"

HTTP 200
[Asserts]
jsonpath "$.data" count == 0
