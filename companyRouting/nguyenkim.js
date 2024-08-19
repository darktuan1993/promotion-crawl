const axios = require('axios');
const cheerio = require('cheerio');



module.exports = async function promotionNguyenKim(req, res) {
    const { url } = req.body;
    // console.log('url', url);

    try {

        let imgTags = '';
        let imgTags2 = '';
        let imgTags3 = '';
        let imgElements = [];
        let imgElementsbannerRight = [];

        // Fetch dữ liệu từ URL
        const response = await axios.get(`${url}?cachebuster=${new Date().getTime()}`);
        const htmlContent = response.data;
        const $ = cheerio.load(htmlContent);
        const divContent = $('#nk-banner-home').html();
        // Ảnh carosel
        if (divContent) {
            const $div = await cheerio.load(divContent);

            $div('img').each((i, elem) => {
                let src = $div(elem).attr('data-src');
                src = 'https://cdn.nguyenkimmall.com/' + src

                if (src) imgElements.push(src);
            });

            imgElements.shift();
            if (imgElements.length > 0) {
                imgTags = imgElements.map(src => `<img src="${src}" alt="Image">`).join('');
            } else {
                imgTags = "kHÔNG CÓ CHƯƠNG TRÌNH"
            }
            // console.log('imgTags', imgTags);
            

        } else {
            return res.send('<h1>Không tìm thấy thẻ divContent</h1>');
        }

        // Ảnh banner Right
        // const bannerRight = $('.banner_home__').html();
        // if (bannerRight) {
        //     const $bannerRight = await cheerio.load(bannerRight);

        //     $bannerRight('img').each((i, elem) => {
        //         let src = $div(elem).attr('data-src');
        //         src = 'https://cdn.nguyenkimmall.com/' + src

        //         if (src) imgElementsbannerRight.push(src);
        //     });
            
        //     console.log('imgElementsbannerRight', imgElementsbannerRight);
            

        //     // imgElements.shift();
        //     // if (imgElements.length > 0) {
        //     //     imgTags = imgElements.map(src => `<img src="${src}" alt="Image">`).join('');
        //     // } else {
        //     //     imgTags = "kHÔNG CÓ CHƯƠNG TRÌNH"
        //     // }
        //     // console.log('imgTags', imgTags);


        // } else {
        //     return res.send('<h1>Không tìm thấy thẻ bannerRight</h1>');
        // }

        res.render('nguyenkim', {
            imgTags
        });

    } catch (error) {

    }


}