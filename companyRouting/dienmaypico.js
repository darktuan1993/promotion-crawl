// promotion.js
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function promotionPico(req, res) {
    const { url } = req.body;
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

    try {

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

        const response = await axios.get(`${url}?cachebuster=${new Date().getTime()}`);
        const htmlContent = response.data;
        const $ = cheerio.load(htmlContent);

        // Carosel
        const divContent = $('.homeSlider').html();
        if (divContent) {
            const $div = cheerio.load(divContent);

            $div('img').each((i, elem) => {
                let src = $div(elem).attr('src');
                if (src) imgElements.push(src);
            });

            imgElements = imgElements.slice(0, 22);

            // console.log('imgElements', imgElements);

            if (imgElements.length > 0) {
                imgTags = imgElements.map(src => `<img src="${src}" alt="Image">`).join('');
            } else {
                imgTags = "kHÔNG CÓ CHƯƠNG TRÌNH GÌ"
            }


        } else {
            return res.send('<h1>Không tìm thấy thẻ divContent</h1>');
        }


        const sectionContent = $('blogList').html();
        console.log('tintucsukien', sectionContent);
        
        // if (sectionContent) {
        //     const $div = cheerio.load(sectionContent);
        //     const imgElements = [];

        //     $div('img').each((i, elem) => {
        //         const src = $div(elem).attr('src');
        //         if (src) imgElements.push(src);

        //         // console.log('src', src);
                
        //     });

        //     console.log('imgElements', imgElements);

        //     if (imgElements.length > 0) {
        //         imgTags2 = imgElements.map(src => `<img src="${src}" alt="Image">`).join('');
        //     } else {
        //         // return res.send('<h1>Không tìm thấy dữ liệu </h1>');
        //     }
        // }





        // blogList

        // Chiến giá online
        res.render('dienmaypico', {
            vietnamTime,
            imgTags
        });
    } catch (error) {

    }
}