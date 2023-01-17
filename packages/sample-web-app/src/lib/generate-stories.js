const fs = require('fs');
const { generate } = require('./stories.template')
const routes = `${__dirname}/../routes`;

const list = fs.readdirSync(routes)

console.log("Start generate stories.");
list.forEach(page => {
  const [pagename] = page.split('.');
  generate(pagename)
})



