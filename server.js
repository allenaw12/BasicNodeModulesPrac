const http = require('http')
const fs = require('fs')
const url = require('url')
const querystring = require('querystring')
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query)
  console.log(page);
  if(page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }else if (page === '/api') {
    if('RPSLS' in params){
        let userInput = params['RPSLS'].toLowerCase()

        let random = Math.ceil(Math.random()*5)

        let compThrow = random === 1 ? 'rock' : random === 2 ? 'paper' : random === 3 ? 'scissors' : random === 4 ? 'lizard' : 'spock'

      if(userInput === 'rock' || userInput ==='paper' || userInput ==='scissors' || userInput ==='lizard' || userInput ==='spock'){
        res.writeHead(200, {'Content-Type': 'application/json'})
        function compare(comp, user){
            if(comp === user){
                return 'It is a tie!'
            }else if(
                (comp === 'rock' && (user === 'scissors' || user === 'lizard')) || 
                (comp === 'paper' && (user === 'rock' || user ==='spock')) || 
                (comp === 'scissors' && (user === 'paper' || user ==='lizard')) || 
                (comp === 'lizard' && (user === 'paper' || user ==='spock')) || 
                (comp === 'spock' && (user === 'rock' || user ==='scissors'))){
                return 'Computer WINS!'
            }else{
                return 'YOU WIN!'
            }
        }
        const objToJson = {
          choice: params['RPSLS'],
          comp: compThrow,
          winner: compare(compThrow, userInput),
        }
        res.end(JSON.stringify(objToJson));
      }else{
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          choice: params['RPSLS'] || 'unknown',
          comp: compThrow,
          winner: "unknown user choice....unknown winner",
        }
        res.end(JSON.stringify(objToJson));
      }//student != leon
    }//student if
  }else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
