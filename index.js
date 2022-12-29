const axios = require('axios');
const cheerio = require('cheerio');
var fs = require('fs');
const fetchProcessors = async () => {
    try {
        const response = await axios.get('https://www.amazon.in/s?k=processors+for+pc&crid=2U86PX4AA8H54&sprefix=processor+%2Caps%2C1952&ref=nb_sb_ss_softlines-tsdoa-joint-contextual-iss_3_10');
        const html = response.data
        const $ = cheerio.load(html)

        const processors = []

        $('div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.s-list-col-right').each((index, el)=>{
            const processor = $(el)
            const title = processor.find('span.a-size-medium.a-color-base.a-text-normal').text()
            processors.push({title:title})
        })
        return processors
    } catch (error) {
        console.error(error);
    }
}

fetchProcessors().then(processors => {
    console.log(processors)
})