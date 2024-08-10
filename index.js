const express = require("express");
const app = express();
const path = require('path')

app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routing API function
const promotionDienMayChoLon = require('./companyRouting/dienmaycholon')
const promotionDienMayXanh = require('./companyRouting/dienmayxanh')
// Root Path
app.get("/", async (req, res) => {
    await res.render("index", {});
});

// ĐIỆN MÁY CHỢ LỚN
app.post('/promotion', promotionDienMayChoLon);

// ĐIỆN MÁY XANH
app.post('/promotionDienMayXanh', promotionDienMayXanh)


app.listen(5000, () => {
    console.log("Running Server on port 5000.");
});

module.exports = app;
