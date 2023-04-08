import readXlsxFile from 'read-excel-file/node';

const filepath = __dirname + '/data/Alert_Table.xlsx';

type SupportName = {
  supportNames: { name: string; type: string }[];
  ksuId: string;
  courseID: string;
  createdAt: string;
  updatedAt: string;
};

export const getAlerts = async (): Promise<SupportName[]> => {
  const alerts = await readXlsxFile(filepath);
  const supportNames: SupportName[] = alerts
    ?.slice(1)
    ?.map((alert: any): SupportName => {
      const supportName: string = alert[3];
      // it contains the support name along with the type of support (e.g. "Smith, Shanoe (Advisor)")
      // we  want the name (e.g. "Smith, Shanoe") and the type of support (e.g. "Advisor")
      // also, if there are multiple support names, they are seperated by semicolons along with the type of support (e.g. "Smith, Shanoe (Advisor); Jones, John (Advisor)")
      // we want the names (e.g. "Smith, Shanoe; Jones, John") along with the type of support (e.g. "Advisor")
      // we want to return an array of objects with the name and type of support
      const supportNames = supportName?.split(';')?.map((name: string) => {
        const [supportName, supportType] = name.split('(');
        return {
          name: supportName.trim(),
          type: supportType?.replace(')', '').trim(),
        };
      });
      const ksuId: string = alert[1].toString();
      const ksuIdPadded = ksuId.padStart(9, '0');
      return {
        supportNames: supportNames?.filter(Boolean) || [],
        ksuId: ksuIdPadded,
        courseID: alert[2],
        createdAt: alert[4],
        updatedAt: alert[5],
      };
    });
  // now we have an array of arrays of objects
  // we want merge the arrays of objects into one array of objects using the spread operator
  const mergedSupportNames: SupportName[] = [].concat(...supportNames);
  return mergedSupportNames.filter(Boolean);
};

// getAlerts().then((supportNames) => console.log(supportNames));
