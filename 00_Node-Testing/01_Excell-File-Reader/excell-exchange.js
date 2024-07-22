

const xlsx = require('xlsx');
const fs = require('fs');

// Load the Excel file
const workbook = xlsx.readFile('data/euro.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];


// Read the first column values
const firstColumnValues = [];
const range = xlsx.utils.decode_range(worksheet['!ref']);
for (let row = range.s.r; row <= range.e.r; row++) {
    const cellAddress = { c: 0, r: row };
    const cellRef = xlsx.utils.encode_cell(cellAddress);
    const cell = worksheet[cellRef];
    if (cell) firstColumnValues.push(cell.v);
}

console.log('First Column Values:', firstColumnValues);

// Apply the exchange rate
const exchangeRateDKK = 7.46;
const exchangeRateSEK = 11.55;
const newValuesDKK = firstColumnValues.map(value => value * exchangeRateDKK);
const newValuesSEK = firstColumnValues.map(value => value * exchangeRateSEK);

console.log('New Values:', newValuesDKK , newValuesSEK);

// Add new values to the worksheet as a new column
for (let row = 0; row < newValuesDKK.length; row++) {
    const cellAddress = { c: 0, r: row };  // first column
    const cellRef = xlsx.utils.encode_cell(cellAddress);
    worksheet[cellRef] = { v: newValuesDKK[row] };
}

for (let row = 1; row < newValuesSEK.length; row++) {
    const cellAddress = { c: 2, r: row };  // Second
    const cellRef = xlsx.utils.encode_cell(cellAddress);
    worksheet[cellRef] = { v: newValuesSEK[row] };
}

// Write the new workbook to a file
xlsx.writeFile(workbook, 'output/dkk.xlsx');
xlsx.writeFile(workbook, 'output/sek.xlsx');
