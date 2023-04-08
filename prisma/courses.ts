import readXlsxFile from 'read-excel-file/node';

const filepath = __dirname + '/data/Course_table.xlsx';

export const getCourses = async () => {
  const courses = await readXlsxFile(filepath);
  return courses.slice(1).map((course: any) => ({
    courseNumber: course[2].toString(),
    courseName: course[1],
    courseSubjectCode: course[3],
    creditHours: course[4] ?? 0,
  }));
};

// getCourses().then((courses) => console.log(courses));
