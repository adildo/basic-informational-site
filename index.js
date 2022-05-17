const http = require('http')
const path = require('path')
const fs = require('fs');

//Create server object
const server = http.createServer((req, res) => {

    // creating the path base on the entered  url
    let filePath = __dirname 

    switch(req.url){
        case '/':
            filePath += '/index.html'
            res.statusCode = 200
            break;
        case '/about':
            filePath += '/about.html'
            res.statusCode = 200
            break;
        case '/about-me':
            res.statusCode = 301
            res.setHeader('Location', '/about')
            res.end()
            break;
        case '/contact-me':
            filePath += '/contact-me.html'
            res.statusCode = 200
            break;
        default:
            filePath += '/404.html'
            res.statusCode = 404
            break;
    }

    

    // getting the extension of the file ('.js / .html or whatever it is)
    let extname = path.extname(filePath)

    // setting the base of the Content-Type
    let contentType = 'text/html';

    //Check ext and set content type
    switch(extname) {
        case '.js':
            contentType = "text/javascript";
            break;
        case '.css':
            contentType = "text/css";
            break;
        case '.json':
            contentType = "application/json";
            break;
        case '.png':
            contentType = "image/png";
            break;
        case '.jpg':
            contentType = "image/jpg";
            break;
    }
    fs.readFile(filePath, (error, content) => {
        if (error)  {
            if (error.code === 'ENOENT'){
                //Page not found
                fs.readFile(
                    path.join(__dirname, '404.html'), 
                    (error, content) => {
                        res.setHeader('Content-Type', 'text/html');
                        res.end(content, 'utf8')
                    }
                )
            } else {
                // Some server error
                res.writeHead(500)
                res.end(`Server Error: ${error.code}`)
            }
        } else {
            //Success
            res.setHeader('Content-Type', contentType)
            res.end(content, 'utf8')
        }
    })
})
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log('Server running...'));