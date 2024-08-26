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


        // Fetch dữ liệu từ URL khuyến mãi
        const urlNew = `${url}post`;
        // console.log('urlNew', urlNew);

        const responseURLKhuyenMai = await axios.get(urlNew);
        const htmlContentKhuyenMai = responseURLKhuyenMai.data;
        const $postUrl = cheerio.load(htmlContentKhuyenMai);
        const sectionContentKhuyenMai = $postUrl('.sidebar-wrapper').html();
        // console.log('sectionContentKhuyenMai', sectionContentKhuyenMai);
        
        if (sectionContentKhuyenMai) {
            const $div = cheerio.load(sectionContentKhuyenMai);
            $div('img').each((i, elem) => {
                // console.log('elem', elem);
                
                imgElementsbannerRight.push($div(elem).attr('src'));
                
            });
            if (imgElementsbannerRight.length > 0) {
                imgElementsbannerRight = imgElementsbannerRight.map(src => `<img src="${src}" alt="Image">`).join('');
            } else {
                return res.send('<h1>Không tìm thấy</h1>');
            }
            
        }



        // Fetch dữ liệu từ URL khuyến mãi
        // const urlNew2 = `${url}hot-deal`;
        // console.log('urlNew', urlNew2);

        // const responseURLKhuyenMai2 = await axios.get(urlNew2);
        // const htmlContentKhuyenMai2 = responseURLKhuyenMai2.data;

        // console.log('htmlContentKhuyenMai2', htmlContentKhuyenMai2);
        

        // // Load nội dung HTML với Cheerio
        // const $khuyenmai = cheerio.load(htmlContentKhuyenMai2);
        // const sectionContentKhuyenMai2 = $khuyenmai('.infinite-scroll-component__outerdiv').html();
        // console.log('sectionContentKhuyenMai2', sectionContentKhuyenMai2);
        

        // if (sectionContentKhuyenMai) {
        //     const $div = cheerio.load(sectionContentKhuyenMai2);


        //     $div('img').each((i, elem) => {
        //         console.log('elem', elem);

        //         imgElementsKhuyenMai.push($div(elem).attr('data-original'));
        //         nameKhuyenMai.push($div(elem).attr('alt'));
        //     });

        //     $div('span.news-info').each((i, elem) => {
        //         ngayKhuyenMai.push($div(elem).text().trim());
        //     });



        //     if (ngayKhuyenMai.length > 0) {
        //         ngayKhuyenMaiSorted = ngayKhuyenMai
        //         nameKhuyenMaiSorted = nameKhuyenMai
        //         imgElementsKhuyenMaiSorted = imgElementsKhuyenMai

        //     }

        // }

        // console.log(ngayKhuyenMai, imgElementsKhuyenMai, nameKhuyenMai);
        



        // Chiến giá online
        res.render('dienmaypico', {
            vietnamTime,
            imgTags,
            imgElementsbannerRight,
            // ngayKhuyenMaiSorted,
            // nameKhuyenMaiSorted,
            // imgElementsKhuyenMaiSorted
        });
    } catch (error) {

    }
}