const axios = require('axios');
const cheerio = require('cheerio');



module.exports = async function promotionNguyenKim(req, res) {
    const { url } = req.body;
    // console.log('url', url);

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
        // Fetch dữ liệu từ URL
        const response = await axios.get(`${url}?cachebuster=${new Date().getTime()}`);
        const htmlContent = response.data;
        const $ = cheerio.load(htmlContent);

        // Ảnh carosel
        const divContent = $('#nk-banner-home').html();
        if (divContent) {
            const $div = cheerio.load(divContent);

            $div('img').each((i, elem) => {
                let src = $div(elem).attr('data-src');
                src = 'https://cdn.nguyenkimmall.com/' + src

                if (src) imgElements.push(src);
            });

            imgElements.shift();
            if (imgElements.length > 0) {
                imgTags = imgElements.map(src => `<img src="${src}" alt="Image">`).join('');
            } else {
                imgTags = "kHÔNG CÓ CHƯƠNG TRÌNH GÌ"
            }
            // console.log('imgTags', imgTags);


        } else {
            return res.send('<h1>Không tìm thấy thẻ divContent</h1>');
        }

        // Ảnh banner Right
        const bannerRight = $('.banner-right').html();
        if (bannerRight) {

            const $bannerRight = cheerio.load(bannerRight);
            $bannerRight('img').each((i, elem) => {
                let src = $bannerRight(elem).attr('src');
                src = 'https://cdn.nguyenkimmall.com/' + src
                if (src) imgElementsbannerRight.push(src);

            });
            if (imgElementsbannerRight.length > 0) {
                imgTags2 = imgElementsbannerRight.map(src => `<img src="${src}" alt="Image">`).join('');
            } else {
                imgTags2 = "kHÔNG CÓ CHƯƠNG TRÌNH"
            }


        } else {
            return res.send('<h1>Không tìm thấy thẻ bannerRight</h1>');
        }
        // Ưu đẫi thương hiệu
        const uudaithuonghieu = $('.nk_banner_floor_carousel_2020').html();
        if (uudaithuonghieu) {

            const $uudaithuonghieu = cheerio.load(uudaithuonghieu);
            $uudaithuonghieu('img').each((i, elem) => {
                let src = $uudaithuonghieu(elem).attr('data-src');
                src = 'https://cdn.nguyenkimmall.com/' + src
                if (src) imgElementsthuonghieu.push(src);

            });
            console.log('imgElementsthuonghieu', imgElementsthuonghieu);
            
            if (imgElementsthuonghieu.length > 0) {
                imgTags3 = imgElementsthuonghieu.map(src => `<img src="${src}" alt="Image">`).join('');
            } else {
                imgTags3 = "kHÔNG CÓ CHƯƠNG TRÌNH"
            }


        } else {
            return res.send('<h1>Không tìm thấy thẻ bannerRight</h1>');
        }
        // Ưu đẫi thanh toán
        const uudaithanhtoan = $('.nk_banner_floor_carousel_2020').eq(1).html();
        if (uudaithanhtoan) {

            const $uudaithanhtoan = cheerio.load(uudaithanhtoan);
            $uudaithanhtoan('img').each((i, elem) => {
                let src = $uudaithanhtoan(elem).attr('data-src');
                src = 'https://cdn.nguyenkimmall.com/' + src
                if (src) imgElementsthanhtoan.push(src);

            });
            console.log('imgElementsthuonghieu', imgElementsthanhtoan);

            if (imgElementsthanhtoan.length > 0) {
                imgTags4 = imgElementsthanhtoan.map(src => `<img src="${src}" alt="Image">`).join('');
            } else {
                imgTags4 = "kHÔNG CÓ CHƯƠNG TRÌNH"
            }


        } else {
            return res.send('<h1>Không tìm thấy thẻ bannerRight</h1>');
        }
        
        // Fetch dữ liệu từ URL khuyến mãi
        const urlNew = `${url}khuyen-mai.html`;
        // console.log('urlNew', urlNew);

        const responseURLKhuyenMai = await axios.get(urlNew);
        const htmlContentKhuyenMai = responseURLKhuyenMai.data;

        console.log('htmlContentKhuyenMai', htmlContentKhuyenMai);
        

        // Load nội dung HTML với Cheerio
        const $khuyenmai = await cheerio.load(htmlContentKhuyenMai);
        const sectionContentKhuyenMai = $khuyenmai('.khuyen-mai-moi').html();

        // console.log('sectionContentKhuyenMai', sectionContentKhuyenMai);
        if (sectionContentKhuyenMai) {
            const $div = cheerio.load(sectionContentKhuyenMai);


            $div('img').each((i, elem) => {
                // console.log('elem', elem);

                imgElementsKhuyenMai.push($div(elem).attr('src'));
                nameKhuyenMai.push($div(elem).attr('alt'));
            });

            $div('span').each((i, elem) => {
                ngayKhuyenMai.push($div(elem).text().trim());
            });



            if (ngayKhuyenMai.length > 0) {
                ngayKhuyenMaiSorted = ngayKhuyenMai
                nameKhuyenMaiSorted = nameKhuyenMai
                imgElementsKhuyenMaiSorted = imgElementsKhuyenMai

            }

        }

        console.log(ngayKhuyenMai, imgElementsKhuyenMai, nameKhuyenMai);
        
        res.render('nguyenkim', {
            imgTags,
            imgTags2,
            imgTags3,
            imgTags4,
            ngayKhuyenMaiSorted,
            nameKhuyenMaiSorted,
            imgElementsKhuyenMaiSorted
        });

    } catch (error) {

    }


}