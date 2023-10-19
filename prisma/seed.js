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

console.log("Seed...");

prisma.user
  .createMany({ data: userData })
  .then(() => prisma.job.createMany({ data: jobData }))
  .then(console.log);
