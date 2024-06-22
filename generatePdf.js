const puppeteer = require('puppeteer');
const fs = require('fs');
const {
    PDFDocument
} = require('pdf-lib');

const baseUrl = 'http://localhost:5173/ApigeeGuides';
const filePaths = [
    '/',
    '/Design/1_naming',
    '/Design/2_design',
];
const outputPdfPath = 'GovernanceApigee.pdf';


const generatePdf = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    const pdfs = [];

    for (const filePath of filePaths) {
        const url = `${baseUrl}${filePath}`;
        console.log(`Generating PDF for ${url}...`);
        try {
            await page.goto(url, {
                waitUntil: 'domcontentloaded'
            });
            // delete some elements
            await page.evaluate(() => {
                document.querySelector("#app > div > header")?.remove();
                document.querySelector("#app > div > div.VPLocalNav")?.remove();
                document.querySelector("#app > div > header.VPNav")?.remove();
                document.querySelector("#app > div > div.VPLocalNav.has-sidebar")?.remove();
            });

            const pdfBuffer = await page.pdf({
                format: 'A4',
                printBackground: true,
                margin: {
                    top: '1cm',
                    right: '1cm',
                    bottom: '1cm',
                    left: '1cm'
                }
            });
            pdfs.push(pdfBuffer);
            console.log(`PDF generated for ${url}`);
        } catch (error) {
            console.error(`Failed to generate PDF for ${url}: ${error}`);
        }
    }

    await browser.close();
    return pdfs;
};

const combinePdfs = async (pdfBuffers) => {
    const combinedPdf = await PDFDocument.create();

    for (const pdfBuffer of pdfBuffers) {
        const pdf = await PDFDocument.load(pdfBuffer);
        const copiedPages = await combinedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => combinedPdf.addPage(page));
    }

    const combinedPdfBytes = await combinedPdf.save();
    return combinedPdfBytes;
};

(async () => {
    try {
        const pdfBuffers = await generatePdf();
        if (pdfBuffers.length === 0) {
            throw new Error('No PDFs were generated.');
        }

        const combinedPdf = await combinePdfs(pdfBuffers);
        fs.writeFileSync(outputPdfPath, combinedPdf);
        console.log('Combined PDF created successfully!');
    } catch (error) {
        console.error(`Error in PDF generation: ${error}`);
        process.exit(1);
    }
})();
