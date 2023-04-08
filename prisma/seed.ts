import { PrismaClient } from '@prisma/client';
import { getDepartments, getStudents } from './students';
import { getInstructors } from './instructor';
import { getCourses } from './courses';
import { getSupport, getUnits } from './support';
import { getEvents } from './supportEvent';

const prisma = new PrismaClient();

async function importDepartments() {
  const departments = await getDepartments();
  for (const department of departments) {
    await prisma.department.create({
      data: {
        name: department,
      },
    });
  }
  console.log('Departments imported');
}

async function importStudents() {
  const students = await getStudents();
  for (const student of students) {
    const department = await prisma.department.findMany({
      where: {
        name: student.homeDepartment,
      },
    });
    if (department.length === 0) {
      throw new Error(`Department ${student.homeDepartment} not found`);
    }
    await prisma.student.create({
      data: {
        ksuId: student.ksuId,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phoneNumber: student.phoneNumber,
        Department: {
          connect: {
            id: department[0].id,
          },
        },
        major: student.major,
        gpa: student.gpa,
        cohort: student.cohort,
        academicStanding: student.academicStanding,
      },
    });
  }
  console.log('Students imported');
}

async function importInstructors() {
  const instructors = await getInstructors();
  for (const instructor of instructors) {
    await prisma.instructor.create({
      data: {
        firstName: instructor.firstName,
        lastName: instructor.lastName,
        middleName: instructor.middleName,
        email: instructor.email,
      },
    });
  }
  console.log('Instructors imported');
}

async function importCourses() {
  const courses = await getCourses();
  for (const course of courses) {
    await prisma.course.create({
      data: {
        courseNumber: course.courseNumber,
        courseName: course.courseName,
        courseSubjectCode: course.courseSubjectCode,
        creditHours: course.creditHours,
      },
    });
  }
  console.log('Courses imported');
}

async function importUnits() {
  const units = await getUnits();
  for (const unit of units) {
    await prisma.unit.create({
      data: {
        name: unit,
      },
    });
  }
  console.log('Units imported');
}

async function importSupport() {
  const supports = await getSupport();
  for (const support of supports) {
    const unit = await prisma.unit.findMany({
      where: {
        name: support.supportUnit,
      },
    });
    if (unit.length === 0) {
      throw new Error(`Unit ${support.supportUnit} not found`);
    }
    await prisma.support.create({
      data: {
        supportId: support.supportId,
        supportName: support.supportName,
        supportEmail: support.supportEmail,
        Unit: {
          connect: {
            id: unit[0].id,
          },
        },
        type: support.supportType,
      },
    });
  }
  console.log('Support imported');
}

async function importSupportEvents() {
  const events = await getEvents();
  for (const event of events) {
    const support = await prisma.support.findUnique({
      where: {
        supportId: event.supportId,
      },
    });
    const student = await prisma.student.findUnique({
      where: {
        ksuId: event.ksuId,
      },
    });

    if (student && support) {
      await prisma.supportEvent.create({
        data: {
          date: event.date,
          Student: {
            connect: {
              id: student.id,
            },
          },
          Support: {
            connect: {
              id: support.id,
            },
          },
        },
      });
    }
  }
  console.log('Support Events imported');
}

async function main() {
  await importDepartments();
  await importStudents();
  await importInstructors();
  await importCourses();
  await importUnits();
  await importSupport();
  await importSupportEvents();
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
