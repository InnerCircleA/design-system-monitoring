const fs = require('fs');
const { generate } = require('./stories.template')
const routes = `${__dirname}/../routes`;

console.log("start")
const list = fs.readdirSync(routes)

list.forEach(page => {
  const [pagename] = page.split('.');
  generate(pagename)
})



