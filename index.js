const express = require("express");
const app = express();
const path = require('path');
const { connectMongoDB } = require("./setting/connectMongoDB.js");
const IpAddress = require('./models/IpAddress'); // Đường dẫn tới file model

app.use(express.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'public')));

// Routing API function
const promotionDienMayChoLon = require('./companyRouting/dienmaycholon');
const promotionDienMayXanh = require('./companyRouting/dienmayxanh');
const promotionNguyenKim = require('./companyRouting/nguyenkim');
const promotionPico = require('./companyRouting/dienmaypico');
const promotionHC = require('./companyRouting/dienmayhc');
const sosanhgia = require('./companyRouting/sosanh');
// Root Path
app.get("/", async (req, res) => {
    const ip = req.ip; // Hoặc req.connection.remoteAddress
    console.log(req);
    
    console.log(`IP của client: ${ip}`);
    // Lưu IP vào MongoDB
    // const ipAddress = new IpAddress({ ip });
    // await ipAddress.save()
    //     .then(() => console.log(`Địa chỉ IP ${ip} đã được lưu vào DB`))
    //     .catch(err => console.log('Lỗi lưu địa chỉ IP:', err));
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,*');
    await res.render("server", { });
});

// Connected MongoDB
connectMongoDB().then()

// ĐIỆN MÁY CHỢ LỚN
app.post('/promotionDienMayChoLon', promotionDienMayChoLon);
// ĐIỆN MÁY XANH
app.post('/promotionDienMayXanh', promotionDienMayXanh);
// NGUYỄN KIM
app.post('/promotionNguyenKim', promotionNguyenKim);
// PICO
app.post('/promotionPico', promotionPico);
// HC
app.post('/promotionHC', promotionHC)
// SO SANH GIA
app.post('/sosanhgia', sosanhgia)

app.listen(5000, () => {
    console.log("Server chạy port 5000.");
});

module.exports = app;
