import readXlsxFile from 'read-excel-file/node';

const filepath = __dirname + '/data/Support_table.xlsx';

export const getUnits = async () => {
  const support = await readXlsxFile(filepath);
  return [
    ...new Set(
      support
        .slice(1)
        .map((support: any) => support[3])
        .filter(Boolean),
    ),
  ];
};

export const getSupport = async () => {
  const support = await readXlsxFile(filepath);
  return support.slice(1).map((support: any) => ({
    supportId: support[0],
    supportName: support[1],
    supportEmail: support[2],
    supportUnit: support[3],
    supportType: support[4],
  }));
};

// getSupport().then((support) => console.log(support));
// getUnits().then((units) => console.log(units));
