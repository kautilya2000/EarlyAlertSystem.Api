import readXlsxFile from 'read-excel-file/node';

const filepath = __dirname + '/data/Instructor_table.xlsx';

export const getInstructors = async () => {
  const instructors = await readXlsxFile(filepath);
  return instructors.slice(1).map((instructor: any) => ({
    firstName: instructor[1],
    lastName: instructor[2],
    middleName: instructor[3],
    email: instructor[4],
  }));
};

// getInstructors().then((instructors) => console.log(instructors));
