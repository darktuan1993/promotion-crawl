const express = require("express");
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const path = require('path')


app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/", async (req, res) => {
    await res.render("index", {});
});


app.post('/promotion', async (req, res) => {
    const { url } = req.body;
    try {
        const response = await axios.get(url);
        const htmlContent = response.data;
        // Load nội dung HTML bằng cheerio
        const $ = cheerio.load(htmlContent);
        const sectionContent = $('section').html();
        let imgTags = '';
        let imgTags2 = '';

        // Lọc thẻ section
        if (sectionContent) {
            const $section = cheerio.load(sectionContent);

            // Từ thẻ section lọc div có id page_specialized
            const divContent = $section('#page_specialized').html();
            if (divContent) {
                const $div = cheerio.load(divContent);

                // Tìm tất cả các thẻ <img> trong divContent
                const imgElements = [];
                $div('img').each((i, elem) => {
                    imgElements.push($div(elem).attr('data-src'));
                });

                if (imgElements.length > 0) {
                    imgTags = imgElements.map(src => `<img src="http:${src}" alt="Image">`).join('');
                } else {
                    res.send('<h1>No images found with data-src attribute in #page_specialized</h1>');
                    return;
                }
            } else {
                res.send('<h1>Không tìm thấy div với id page_specialized</h1>');
                return;
            }

            // Từ thẻ section lọc div có class slide
            const promotionContent = $section('.slide').html();
            if (promotionContent) {
                const $div = cheerio.load(promotionContent);

                // Tìm tất cả các thẻ <img> trong promotionContent
                const imgElements2 = [];
                $div('img').each((i, elem) => {
                    imgElements2.push($div(elem).attr('data-src'));
                });
                imgElements2.shift();
                if (imgElements2.length > 0) {
                    imgTags2 = imgElements2.map(src => `<img src="http:${src}" alt="Image">`).join('');
                } else {
                    res.send('<h1>No images found with data-src attribute in .slide</h1>');
                    return;
                }
            } else {
                res.send('<h1>Không tìm thấy div với class slide</h1>');
                return;
            }

            // Render cả hai phần tử imgTags và imgTags2 vào template
            res.render('dienmaycholon', { imgTags, imgTags2 });
        } else {
            res.send('<h1>Không tìm thấy thẻ section</h1>');
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
