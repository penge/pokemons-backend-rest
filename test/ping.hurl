GET {{host}}/ping

HTTP 200
[Asserts]
body == "pong"
