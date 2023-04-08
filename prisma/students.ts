import readXlsxFile from 'read-excel-file/node';

const filepath = __dirname + '/data/Student_table.xlsx';

export const getDepartments = async (): Promise<string[]> => {
  try {
    const students = await readXlsxFile(filepath, { sheet: 1 });
    return [
      ...new Set(
        students
          .slice(2)
          .map((student: any) => student[5])
          .filter(Boolean),
      ),
    ];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getStudents = async () => {
  try {
    const students = await readXlsxFile(filepath, { sheet: 1 });
    return students.slice(2).map((student: any) => {
      return {
        ksuId: student[0],
        firstName: student[1],
        lastName: student[2],
        email: student[3],
        phoneNumber: student[4],
        homeDepartment: student[5],
        major: student[6],
        gpa: student[7],
        cohort: student[8],
        academicStanding: student[9],
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};
