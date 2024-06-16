const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
    // Read the JSON file
    const data = JSON.parse(fs.readFileSync('/Users/visheshgoyal/JavaScript WebDev/NodeJs/ServerTest/TestData.json', 'utf8'));

    // HTML content with a table for user data
    let htmlContent = `
        <html>
        <head>
            <title>${data.title}</title>
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                table, th, td {
                    border: 1px solid black;
                }
                th, td {
                    padding: 8px;
                    text-align: left;
                }
            </style>
        </head>
        <body>
            <h1>${123}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Id</th>
                    </tr>
                </thead>
                <tbody>
    `;

    // Populate table rows with user data
    data.forEach(user => {
        htmlContent += `
            <tr>
                <td>${user.name}</td>
                <td>${user.id}</td>
            </tr>
        `;
    });

    htmlContent += `
                </tbody>
            </table>
        </body>
        </html>
    `;

    // Launch a headless browser
    const browser = await puppeteer.launch();

    // Open a new page
    const page = await browser.newPage();

    // Set the content of the page
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Define the PDF options
    const pdfOptions = {
        path: 'output.pdf', // Path to save the PDF file
        format: 'A4', // Format of the PDF
        printBackground: true // Print background graphics
    };

    // Convert the page to PDF
    await page.pdf(pdfOptions);

    // Close the browser
    await browser.close();

    console.log('PDF generated successfully!');
})();
