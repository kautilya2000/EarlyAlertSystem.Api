import readXlsxFile from 'read-excel-file/node';

const filepath = __dirname + '/data/Support_Event_table.xlsx';

export const getEvents = async () => {
  const events = await readXlsxFile(filepath);
  return events.slice(1).map((event: any) => {
    // pad ksuId with zeros to 9 digits
    const ksuId: string = event[1].toString();
    const paddedKsuId = ksuId.padStart(9, '0');
    return {
      supportId: event[0],
      ksuId: paddedKsuId,
      date: event[2],
    };
  });
};

getEvents().then((events) => console.log(events));
