const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const port = 3002;
const expressLayouts = require('express-ejs-layouts');

const homeRoute = require('./src/routes/homeRouters');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

app.use(cors())
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
// app.set('view engine', patch.join(__dirname, 'ejs'));

app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static("public"));
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
   const data = await prisma.rtp.findMany();

   const today = new Date();
   const timeNow = {
      day: getDayOfWeek(today.getDay()),
      date: today.getDate(),
      month: getMonthName(today.getMonth()),
      year: today.getFullYear()
   };

   res.render("index",
      {
         layout: "./layouts/main-layouts",
         title: "Home",
         timeNow,
         data
      });
})


function getDayOfWeek(dayIndex) {
   const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
   return days[dayIndex];
}

function getMonthName(monthIndex) {
   const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
   return months[monthIndex];
}

app.get('/search', async (req, res) => {
   const searchTerm = req.query.q.toLowerCase();

   // Gunakan Prisma untuk melakukan pencarian berdasarkan judul
   const results = await prisma.rtp.findMany({
      where: {
         game_name: {
            contains: searchTerm,
            mode: 'insensitive' // Agar pencarian tidak bersifat case-sensitive
         }
      }
   });

   res.json(results);
});




// const data = await prisma.rtp.findMany();

// app.post('/', async (req, res) => {
//    const data = await prisma.rtp.findMany();
//    const searchTerm = req.body.search ? req.body.search.toLowerCase() : '';

//    // Jika input kosong, kembalikan data awal
//    const searchResults = searchTerm
//       ? data.filter(item => item.game_name.toLowerCase().includes(searchTerm))
//       : data;
//    const today = new Date();
//    const timeNow = {
//       day: getDayOfWeek(today.getDay()),
//       date: today.getDate(),
//       month: getMonthName(today.getMonth()),
//       year: today.getFullYear()
//    };

//    res.render("index",
//    {
//       layout: "./layouts/main-layouts",
//       title: "Home",
//       timeNow,
//       data : searchResults
//    });
// });


app.listen(port, () => {
   console.log(`Server is running on port http://localhost:${port}`);
})