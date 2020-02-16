require('ts-node/register');
require('./main');

const fs = require('fs');

const TurndownService = require('turndown')


// const turndownService = new TurndownService();
// html = `<img class="ds t u ez ak" src="https://miro.medium.com/max/2880/1\*Sff7wJgMYMqTyk0qJ\_ap4g.png" width="1440" height="809" role="presentation"></img>`
// const htmlString = html.toString();
// // turndownService.keep(['pre', 'img'])
// const markdown = turndownService.turndown(htmlString);

// console.log(markdown);

async function parseHtmlToString (){

    let html = await fs.promises.readFile('scrape_medium/test2.html');
        
    let turndownService = new TurndownService();
    
    turndownService.addRule('Fenced', {
        filter: ['pre'],
        replacement: function (content) {
          return '```\r\n' + content + '\r\n```'
        }
      })

    // turndownService.addRule('Title', {
    // filter: ['h1'],
    // replacement: function (content) {
    //     return 
    // }
    // })
    
    // turndownService.addRule('Image', {
    // filter: ['img'],
    // replacement: function (content) {
    //     return "";
    // }
    // })
    const htmlString = html.toString();
    // turndownService.keep(['pre', 'img'])
    const markdown = turndownService.turndown(htmlString);
    
    // markdown = turndownService.turndown(markdown);
    console.log(markdown);
        

    await fs.promises.writeFile('test2.md', markdown)
}


parseHtmlToString();
