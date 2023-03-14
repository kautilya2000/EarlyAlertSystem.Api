import { PrismaClient } from '@prisma/client';
import students from './students';

const prisma = new PrismaClient();

async function main() {
  for (const student of students) {
    await prisma.student.create({
      data: {
        email: student.email,
        firstName: student.firstName,
        lastName: student.lastName,
        homeDepartment: student.homeDepartment,
        ksuId: student.id,
        phoneNumber: student.phoneNumber,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
