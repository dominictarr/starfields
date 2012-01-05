var fs = require('fs')
  , http = require('http')
  
  
  http.createServer(function (req, res) {
    res.writeHeader(200, {'content-type': 'text/html'})
    fs.createReadStream('starfield.html').pipe(res)
  }).listen(process.env.PORT || 8080)