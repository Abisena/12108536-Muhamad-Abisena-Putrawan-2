import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
const seeder = new PrismaClient();
async function seed(req) {
  const hashedPassword = await argon2.hash("admin12345");
  const seedCreate = await seeder.users.create({
    data: {
      username: "admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "Admin",
    },
  });

  return seedCreate;
}

try {
  await seed();
  await seeder.$disconnect();
} catch (e) {
  console.error(e);
  await seeder.$disconnect();
  process.exit(1);
}
