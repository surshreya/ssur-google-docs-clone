const server = require("./app.js");

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server listening on PORT ${port}...`);
});
