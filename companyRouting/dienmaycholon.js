// promotion.js
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function promotionDienMayChoLon(req, res) {
    const { url } = req.body;
    try {
        // Fetch dữ liệu từ URL
        const response = await axios.get(url);
        const htmlContent = response.data;

        // Load nội dung HTML bằng cheerio
        const $ = cheerio.load(htmlContent);
        const sectionContent = $('section').html();

        // Khởi tạo biến chứa các thẻ <img> HTML
        let imgTags = '';
        let imgTags2 = '';
        let imgTags3 = '';

        if (sectionContent) {
            const $section = cheerio.load(sectionContent);

            // Xử lý div với id page_specialized
            const divContent = $section('#page_specialized').html();
            if (divContent) {
                const $div = cheerio.load(divContent);
                const imgElements = [];

                $div('img').each((i, elem) => {
                    const src = $div(elem).attr('data-src');
                    if (src) imgElements.push(src);
                });

                if (imgElements.length > 0) {
                    imgTags = imgElements.map(src => `<img src="http:${src}" alt="Image">`).join('');
                } else {
                    return res.send('<h1>Không tìm thấy dữ liệu</h1>');
                }
            } else {
                return res.send('<h1>Không tìm thấy div với id page_specialized</h1>');
            }

            // Xử lý div với class slide
            const promotionContent = $section('.slide').html();
            if (promotionContent) {
                const $div = cheerio.load(promotionContent);
                const imgElements2 = [];

                $div('img').each((i, elem) => {
                    const src = $div(elem).attr('data-src');
                    if (src) imgElements2.push(src);
                });
                imgElements2.shift(); // Loại bỏ phần tử đầu tiên

                if (imgElements2.length > 0) {
                    imgTags2 = imgElements2.map(src => `<img src="http:${src}" alt="Image">`).join('');
                } else {
                    return res.send('<h1>Không tìm thấy dữ liệu</h1>');
                }
            } else {
                return res.send('<h1>Không tìm thấy dữ liệu</h1>');
            }

            // Xử lý div với class preferential
            const preferential = $section('.preferential').html();
            if (preferential) {
                const $div = cheerio.load(preferential);
                const imgElements3 = [];

                $div('img').each((i, elem) => {
                    const src = $div(elem).attr('data-src');
                    if (src) imgElements3.push(src);
                });

                if (imgElements3.length > 0) {
                    imgTags3 = imgElements3.map(src => `<img src="http:${src}" alt="Image">`).join('');
                } else {
                    return res.send('<h1>Không tìm thấy dữ liệu</h1>');
                }
            } else {
                return res.send('<h1>Không tìm thấy dữ liệu</h1>');
            }
        } else {
            return res.send('<h1>Không tìm thấy thẻ section</h1>');
        }

        // Fetch dữ liệu từ URL khuyến mãi
        const urlNew = `${url}tin-khuyen-mai#khuyen-mai-hot`;
        const responseURLKhuyenMai = await axios.get(urlNew);
        const htmlContentKhuyenMai = responseURLKhuyenMai.data;

        // Load nội dung HTML với Cheerio
        const $khuyenmai = cheerio.load(htmlContentKhuyenMai);
        const sectionContentKhuyenMai = $khuyenmai('.list').html();

        if (sectionContentKhuyenMai) {
            const $div = cheerio.load(sectionContentKhuyenMai);
            const nameKhuyenMai = [];
            const ngayKhuyenMai = [];
            const imgElementsKhuyenMai = [];

            $div('img').each((i, elem) => {
                imgElementsKhuyenMai.push($div(elem).attr('data-src'));
                nameKhuyenMai.push($div(elem).attr('alt'));
            });

            $div('span.date').each((i, elem) => {
                ngayKhuyenMai.push($div(elem).text().trim());
            });

            // Kết hợp và sắp xếp dữ liệu
            const combinedData = ngayKhuyenMai.map((date, index) => {
                return {
                    date: new Date(date.split('/').reverse().join('-')),
                    name: nameKhuyenMai[index],
                    img: imgElementsKhuyenMai[index]
                };
            });

            combinedData.sort((a, b) => b.date - a.date);

            const ngayKhuyenMaiSorted = combinedData.map(item => item.date.toLocaleDateString('vi-VN'));
            const nameKhuyenMaiSorted = combinedData.map(item => item.name);
            const imgElementsKhuyenMaiSorted = combinedData.map(item => item.img);

            // Render dữ liệu vào template
            res.render('dienmaycholon', {
                imgTags,
                imgTags2,
                imgTags3,
                ngayKhuyenMai: ngayKhuyenMaiSorted,
                nameKhuyenMai: nameKhuyenMaiSorted,
                imgElementsKhuyenMai: imgElementsKhuyenMaiSorted
            });

        } else {
            res.send('<h1>Không tìm thấy phần tử</h1>');
        }
    } catch (error) {
        console.error('Error:', error); // Ghi lại lỗi để theo dõi
        res.status(500).send('Lỗi dữ liệu không thể lấy được dữ liệu của Điện Máy Xanh, vui lòng load lại dữ liệu thêm lần nữa, Mai Linh tình yêu của anh ơi');
    }
};
