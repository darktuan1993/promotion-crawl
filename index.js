const express = require("express");
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/", async (req, res) => {
    res.render('index.ejs');
});


app.post('/download', async (req, res) => {
    const { url } = req.body;
    try {
        const response = await axios.get(url);
        const htmlContent = response.data;
        // Load nội dung HTML bằng cheerio
        const $ = cheerio.load(htmlContent);
        const sectionContent = $('section').html();
        // Lọc thẻ section
        if (sectionContent) {
            const $section = cheerio.load(sectionContent);
            // Từ thẻ section lọc div có id page_specialized
            const divContent = $section('#page_specialized').html();
            // Từ div có id page_specialized lọc ra

            if (divContent) {
                const $div = cheerio.load(divContent);

                // Tìm tất cả các thẻ <img> trong divContent
                const imgElements = [];
                $div('img').each((i, elem) => {
                    imgElements.push($div(elem).attr('data-src'));
                });

                console.log('imgElements', imgElements);
                if (imgElements.length > 0) {
                    const imgTags = imgElements.map(src => `<img src="${src}" alt="Image">`).join('');
                    res.send(`<div>${imgTags}</div>`);
                } else {
                    res.send('<h1>No images found with data-src attribute</h1>');
                }

            } else {
                res.send('<h1>Không được</h1>');
            }

        } else {
            res.send('<h1>No section found</h1>');
        }

    } catch (error) {
        res.send('Error fetching the website. Please check the URL and try again.');
    }
});



app.listen(5000, () => {
    console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;