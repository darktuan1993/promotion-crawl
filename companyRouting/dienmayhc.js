// promotion.js
const axios = require('axios');
const cheerio = require('cheerio');
module.exports = async function promotionDienMayHC(req, res) {
    const date = new Date();
    const options = {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,  // Sử dụng định dạng 24 giờ, nếu muốn 12 giờ, đổi thành true
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const vietnamTime = date.toLocaleString('vi-VN', options);
    let imgTags = '';
    let imgTags2 = '';
    let imgTags3 = '';
    let imgTags4 = '';
    let imgElements = [];
    let imgElementsbannerRight = [];
    let imgElementsthuonghieu = [];
    let imgElementsthanhtoan = [];
    let nameKhuyenMai = [];
    let ngayKhuyenMai = [];
    let imgElementsKhuyenMai = [];
    let ngayKhuyenMaiSorted = [];
    let nameKhuyenMaiSorted = [];
    let imgElementsKhuyenMaiSorted = []
    try {

        const { url } = req.body;
        console.log(url);

        // Fetch dữ liệu từ URL
        const response = await axios.get(`${url}`);
        const htmlContent = response.data;

        const $ = cheerio.load(htmlContent);
        // Ảnh carosel
        const divContent = $('.t-Region-carouselRegions').html();
        if (divContent) {
            const $div = cheerio.load(divContent);

            $div('img').each((i, elem) => {
                let src = $div(elem).attr('src');
                src = 'https://hc.com.vn/' + src
                if (src) imgElements.push(src);
            });
            if (imgElements.length > 0) {
                imgTags = imgElements.map(src => `<img src="${src}" alt="Image">`).join('');
            } else {
                imgTags = "kHÔNG CÓ CHƯƠNG TRÌNH GÌ"
            }
        } else {
            return res.send('<h1>Không tìm thấy thẻ divContent</h1>');
        }

        // 4 ảnh ở dưới
        const divContent2 = await $('.t-Region-bodyWrap').html();
        console.log(divContent2);
        
        if (divContent2) {
            const $div = cheerio.load(divContent2);

            $div('img').each((i, elem) => {
                let src = $div(elem).attr('src');
                console.log('src', src);

                src = 'https://hc.com.vn/' + src
                if (src) imgElementsbannerRight.push(src);
            });
            if (imgElementsbannerRight.length > 0) {
                imgTags2 = imgElementsbannerRight.map(src => `<img src="${src}" alt="Image">`).join('');
            } else {
                imgTags2 = "kHÔNG CÓ CHƯƠNG TRÌNH GÌ"
            }
            // console.log('imgTags2', imgTags2);

        } else {
            return res.send('<h1>Không tìm thấy thẻ divContent</h1>');
        }



        // Load nội dung HTML bằng cheerio
        const sectionContent = $('section').html();
        res.render('dienmayhc', {
            vietnamTime,
            imgTags,
            imgTags2
        });


    } catch (error) {

    }




}
