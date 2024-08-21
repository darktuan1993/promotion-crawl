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
const promotionNguyenKim = require('./companyRouting/nguyenkim');
const promotionPico = require('./companyRouting/dienmaypico');

// Root Path
app.get("/", async (req, res) => {
    await res.render("server", { });
});

// ĐIỆN MÁY CHỢ LỚN
app.post('/promotionDienMayChoLon', promotionDienMayChoLon);
// ĐIỆN MÁY XANH
app.post('/promotionDienMayXanh', promotionDienMayXanh);
// NGUYỄN KIM
app.post('/promotionNguyenKim', promotionNguyenKim);

// PICO
app.post('/promotionPico', promotionPico);

app.listen(5000, () => {
    console.log("Server chạy port 5000.");
});

module.exports = app;
