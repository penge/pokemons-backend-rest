GET {{host}}/api/pokemon-types

HTTP 200
[Asserts]
jsonpath "$" count == 17
jsonpath "$[0]" == "Bug"
jsonpath "$[16]" == "Water"
