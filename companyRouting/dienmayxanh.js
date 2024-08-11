const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function promotionDienMayChoLon(req, res) {
    const {url} = req.body;
    try {
        // Khởi tạo biến chứa các thẻ <img> HTML
        let imgTags = '';
        let imgTags2 = '';
        let imgTags3 = '';

        // Fetch dữ liệu từ URL
        const response = await axios.get(url);
        const htmlContent = response.data;

        // Load nội dung HTML bằng cheerio
        const $ = cheerio.load(htmlContent);
        const sectionContent = $('section').html();

        // big-banner
        const bigBanner = $('.big-banner').html();
        if (bigBanner) {
            const $div = cheerio.load(bigBanner);
            const imgElements = [];

            $div('img').each((i, elem) => {
                const src = $div(elem).attr('src');
                if (src) imgElements.push(src);
            });

            console.log('imgElements', imgElements);

            if (imgElements.length > 0) {
                imgTags2 = imgElements.map(src => `<img src="${src}" alt="Image">`).join('');
            } else {
                return res.send('<h1>Không tìm thấy dữ liệu </h1>');
            }
        } else {
            return res.send('<h1>Không tìm thấy dữ liệu </h1>');
        }


        // sectionContent
        if (sectionContent) {
            const $section = await cheerio.load(sectionContent);

            // Xử lý div với bg-tophome
            const divContent = $section('.bg-tophome').html();
            if (divContent) {
                const $div = cheerio.load(divContent);
                const imgElements = [];

                $div('img').each((i, elem) => {
                    const src = $div(elem).attr('src');
                    if (src) imgElements.push(src);
                });


                console.log('imgElements', imgElements);


                if (imgElements.length > 0) {
                    imgTags = imgElements.map(src => `<img src="${src}" alt="Image">`).join('');
                } else {
                    return res.send('<h1>Không tìm thấy</h1>');
                }
            } else {
                return res.send('<h1>Không tìm thấy</h1>');
            }

            res.render('dienmayxanh', {
                imgTags,
                imgTags2,
                imgTags3,
                // ngayKhuyenMai: ngayKhuyenMaiSorted,
                // nameKhuyenMai: nameKhuyenMaiSorted,
                // imgElementsKhuyenMai: imgElementsKhuyenMaiSorted
            });

        } else {
            return res.send('<h1>Không tìm thấy dữ liệu</h1>');
        }


    } catch (error) {
        res.status(500).send('Lỗi dữ liệu không thể lấy được dữ liệu của Điện Máy Xanh, vui lòng load lại dữ liệu thêm lần nữa, Mai Linh tình yêu của anh ơi');
    }
};
