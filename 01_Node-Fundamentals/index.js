import http from 'http'
import dotenv from 'dotenv'; 

dotenv.config();
const PORT = process.env.PORT || 6000;
 const server = http.createServer((req, res) =>{
res.writeHead(200, {'Content-Type' : 'application/json'});

console.log(req.url);
if (req.url === '/users') {

    res.end(JSON.stringify ([{ name: 'John Doe'} , {name: 'Alex Doe'}]));
}

if (req.url === '/products') {

    res.end(JSON.stringify ([{ name: 'Iphone15'} , {name: 'Samsung Galaxy'}]));
}

// res.end ('Route not found');
// res.end(JSON.stringify({ message: 'Hello World'}));
 });

// console.log(process.env.PORT || 3000); // o || atribui um valor default caso o PORT nãos eja atribuido

 server.listen(PORT, () => {
 console.log(`server is running on port ${PORT}`);

 }); 