const http = require("http")

http.createServer(function(request, response) {
    console.log(request)
    response.end("Hello world! :D")
})
.listen(3000)