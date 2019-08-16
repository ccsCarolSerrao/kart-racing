# Kart Racing
  
  
## What is the challenge?
  
Read [HERE](https://github.com/Gympass/interview-test)!

  
  
## To run this project:
  
1) Clone the repository
```
git clone https://github.com/ccsCarolSerrao/kart-racing.git
```
2) Open in the Visual Studio Code (or another IDE of your choice)
3) Install [Yarn](https://yarnpkg.com/pt-BR/) in your machine
4) Install SQLite globally
```
    yarn add global sqlite3 
```
4) Run yarn:
```
    yarn
```
5) Start server:
```
    yarn start-server
```
6) Have a lot of fun!
  
  

## Let's try!!
  
### POST Upload Race Log
_Don't forget to change the file path. =D_
```
curl --location --request POST "localhost:3000/api/v1/races/upload" --form "raceLog=@<localPath>/kart-racing/mocks/race.log"
```


### GET RankingRace
_Don't forget to change the race id. =D`_
_You get the raceId running the command above._

```
curl --location --request GET "localhost:3000/api/v1/races/<radeId>/ranking"
```