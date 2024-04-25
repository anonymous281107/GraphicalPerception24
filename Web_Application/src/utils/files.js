import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Get filename from the path of the image
export const getFileName = (filePath, depth = 1) => {
    const name = filePath.split('/')
    if (depth > 1) {
        let fileName = ""
        while (depth >= 1) {
            fileName += name[name.length - depth] + "_"
            console.log(name[name.length - depth])
            depth--
        }
        return fileName.substring(0, fileName.length - 1)
    }
    return name[name.length - depth]
}
// process a row to get it into the csv displayable format
const processRow = (row) => {
    return row.map(e => e.join(",")).join("\n")
};
/**
 * 
 * @param {*} colNames an Array of column names
 * @returns the column names in a csv readable format
 */
const getCsvCols = (colNames) => {
    const numberOfCols = colNames.length
    return colNames.reduce((accCols, col, index) => index === numberOfCols - 1 ? accCols + col + "\n" : accCols + col + ",", "");
}
/**
 * 
 * Downloads the data for a particular session
 * 
 * @param {*} session the session for which data is to be downloaded
 * 
 */
export const downloadZip = async (session) => {
    const { name, data } = session
    const zip = new JSZip()
    const colNames = ["scale", "posX", "posY", "windowWidth", "windowHeight", "time"]

    const folder = zip.folder(name)
    const csvNames = Object.keys(data).map(key => ({ key, fileName: getFileName(key, 2) }))
    csvNames.forEach(csvName => {
        let csvFile = getCsvCols(colNames)
        const row = data[csvName.key].map(el => Object.keys(el).map(elKey => el[elKey]))
        csvFile += processRow(row);
        folder.file(`${csvName.fileName}.csv`, csvFile, { type: "string" })
    })

    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, `${name}.zip`)
}