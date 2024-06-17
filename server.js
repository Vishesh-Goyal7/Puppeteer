const puppet = require('puppeteer')

async function htmlToPdf(target, dest){
    try{
        
        const browser = await puppet.launch({headless:"new"})
        const page = await browser.newPage()
        await page.goto(target, {waitUntil:"networkidle0"})
        await page.pdf({
            path: dest,
            format: "A4",
            printBackground: true
        })

        await browser.close()

    } catch(err){
        console.log(err);
    }
}

const target = "https://github.com/Vishesh-Goyal7/MongooseAPI"
const dest = "/Users/visheshgoyal/JavaScript WebDev/Puppeteer/output.pdf"

htmlToPdf(target, dest).then(() => {
    console.log(`Pdf created successfully`);
}).catch((error) => {
    console.log(error);
})