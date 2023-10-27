/// แก้ใส่จข้อ มูลแต่ละ table เข้าไป
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const hashPassword = bcrypt.hashSync("123456", 10);

const userData = [
  { username: "Andy", password: hashPassword },
  { username: "Bobby", password: hashPassword },
  { username: "Candy", password: hashPassword },
  { username: "Danny", password: hashPassword },
];

const jobData = [
  { title: "Learn HTML", userId: 1 },
  { title: "Learn CSS", userId: 1 },
  { title: "Learn Javascript", userId: 2 },
  { title: "Learn GIT", userId: 3 },
  { title: "Learn React", userId: 4 },
  { title: "Learn Node", userId: 4 },
];

const productData = [
  {
    SKU: "SEAT_01",
    name: "Onsa Armchair",
    desc: "A reclining chair with function and a particular aesthetic: the seat shell and armrests open up from the backrest like a flower. The soft, inviting upholstery, high back and height-adjustable padded seat create a beautiful feeling of relaxation and security. For dreaming, reading, watching TV, or listening to music - in private rooms or hospitality areas",
    category: "SEAT",
    department: "LIVINGROOM",
    price: "309000",
    imageUrl:
      "https://res.cloudinary.com/ds8j71inq/image/upload/v1698053680/LivingRoomPic/Seating/LivSetPic4_sgygcg.jpg",
    vdoUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    dimensions: "w78-0 x D90-109 x H108-0",
  },
];

console.log("Seed...");

prisma.product.createMany({ data: productData });
// prisma.user
//   .createMany({ data: userData })
//   .then(() => prisma.job.createMany({ data: jobData }))
//   .then(console.log);
