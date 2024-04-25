import { papers } from 'configuration';

// Convert 2D array to 1D
export const flattenArray = (arr) => arr.reduce((finalArr, newArr) => finalArr.concat(newArr), [])
// Get all experiment names
export const getAllExperimentNames = () => flattenArray(papers.map(paper => paper.experiments.map(experiment => experiment.name)))
// Get an experiments assets by experiment name
export const getExperimentAssests = (experimentName) => {
    let foundExperiment = flattenArray(papers.map(paper => (paper.experiments.filter(experiment => experiment.name === experimentName))))
    if (foundExperiment && foundExperiment.length) {
        foundExperiment = foundExperiment[0]
        return foundExperiment.assets
    }
    else {
        return null
    }
}