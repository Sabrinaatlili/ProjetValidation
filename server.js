// import app 
const app = require("./backend/app");
//  App is listening to Reqs on Port 3000
// http://localhost:3000
app.listen(3000, () => {
    console.log("APP Education is listening on Port 3000 ...");
});