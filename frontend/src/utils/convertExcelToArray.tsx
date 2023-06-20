import * as XLSX from "xlsx";

export function convertExcelToArray(file: File) {
  return new Promise<Record<string, any>[]>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const target = event.target;
      if (target) {
        const data = new Uint8Array(target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const headers = excelData[0] as string[];
        const rows = excelData.slice(1);

        const result = rows.map((row: any) => {
          const obj: Record<string, any> = {};

          headers.forEach((header, index) => {
            obj[header] = row[index];
          });
          return obj;
        });

        resolve(result);
      }
    };

    reader.onerror = (event) => {
      reject(event.target?.error);
    };

    reader.readAsArrayBuffer(file);
  });
}
