const express = require("express");
const app = express();
const path = require('path');
// const puppeteer = require('puppeteer');

app.use(express.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routing API function
const promotionDienMayChoLon = require('./companyRouting/dienmaycholon');
const promotionDienMayXanh = require('./companyRouting/dienmayxanh');

// Root Path
app.get("/", async (req, res) => {
    await res.render("server", {});
});

// ĐIỆN MÁY CHỢ LỚN
app.post('/promotion', promotionDienMayChoLon);

// ĐIỆN MÁY XANH
app.post('/promotionDienMayXanh', promotionDienMayXanh);

// Route để xuất PDF cho trang Điện Máy Chợ Lớn
// app.get('/download-pdf-cholon', async (req, res) => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     // Render trang HTML mà bạn muốn xuất PDF
//     await page.goto(`http://localhost:5000/promotion`, {
//         waitUntil: 'networkidle0'
//     });

//     // Tạo file PDF từ trang HTML đã render
//     const pdf = await page.pdf({format: 'A4'});

//     await browser.close();

//     // Thiết lập header để tải file PDF
//     res.setHeader('Content-Disposition', 'attachment; filename=dienmaycholon.pdf');
//     res.setHeader('Content-Type', 'application/pdf');

//     // Gửi file PDF về phía người dùng
//     res.send(pdf);
// });

// Route để xuất PDF cho trang Điện Máy Xanh
// app.get('/download-pdf-xanh', async (req, res) => {
//     const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
//     console.log(browser)
//     const page = await browser.newPage();

//     // Render trang HTML mà bạn muốn xuất PDF
//     await page.goto(`http://localhost:5000`, {
//         waitUntil: 'networkidle0'
//     });

//     // Tạo file PDF từ trang HTML đã render
//     const pdf = await page.pdf({format: 'A3', printBackground: true});
//     // console.log(pdf)
//     await browser.close();

//     // Thiết lập header để tải file PDF
//     res.setHeader('Content-Disposition', 'attachment; filename=dienmayxanh.pdf');
//     res.setHeader('Content-Type', 'application/pdf');

//     // Gửi file PDF về phía người dùng
//     res.send(pdf);
// });

app.listen(5000, () => {
    console.log("Server chạy port 5000.");
});

module.exports = app;
