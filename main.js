function getMedian(array)
{
    //array.sort()
    array.sort((a, b) => a - b);  // numbers could be string in this case. F.e. 10.1

    let middle = Math.floor(array.length/2)

    if(array.length % 2 == 0)
    {
        return (array[middle-1]+array[middle])/2
    }
    else {
        return array[middle]
    }
}

function getSampleVariance(array, mean)
{
    let varianceSum = 0
    for(let i = 0; i<array.length; i++)
    {
        varianceSum+=((array[i]-mean)*(array[i]-mean))
    }
    
    let variance = varianceSum/(array.length-1)
    return variance
}

function getRange(array)
{
    //array.sort()
    array.sort((a, b) => a - b); // numbers could be string in this case. F.e. 10.1

    let range = array[array.length-1] - array[0]
    return range
}

function getMode(array)
{
    array.sort((a, b) => a - b);

    let frequency = {}
    let count = 0
    let modes = []

    for(let num of array) {
        let numFixed = num.toFixed(2)
        frequency[numFixed] = (frequency[numFixed] || 0) + 1

        if(frequency[numFixed]>count)
            count = frequency[numFixed]
    }

    for(let freq in frequency)
    {
        if(frequency[freq] == count)
            modes.push(parseFloat(freq))
    }

    if(count > 1)
    {
        return modes
    }
    else return "No modes" 
}

function getInterquartileRange(array)
{
    array.sort((a, b) => a - b);

    let firstHalf=[]
    let secondHalf=[]

    if (array.length % 2 == 0) {
        firstHalf = array.slice(0, array.length / 2);
        secondHalf = array.slice(array.length / 2);
    } else {
        let mid = Math.floor(array.length / 2);
        firstHalf = array.slice(0, mid);
        secondHalf = array.slice(mid + 1);
    }

    let q1 = getMedian(firstHalf)
    let q3 = getMedian(secondHalf)

    return q3-q1
}

function calculateZScore(value, mean, sd)
{
    let score = (value-mean)/sd
    return score.toFixed(4)
}

function calculateStats() {
    let sum = 0

    let valuesInfo = document.getElementById("values").value
    let values = valuesInfo.split(",").map(Number)

    if(!values){
        document.getElementById("results").innerHTML = "Error!"
    }

    for (let i = 0; i<values.length; i++)
    {
        let val = values[i]
        sum+=val
    }

    let mean = sum / (values.length)
    let median = getMedian(values).toFixed(2)
    let variance = getSampleVariance(values,mean)
    let standardDeviation = Math.sqrt(variance.toFixed(2)).toFixed(2)
    let range = getRange(values)
    let mode = getMode(values)

    let zscore = document.getElementById("zscore").value
    let zscoreValue = 0
    if(zscore!="")
        zscoreValue = calculateZScore(zscore, mean, standardDeviation)

    document.getElementById("results").innerHTML = 
        "Mean: " + mean.toFixed(2) + 
        "<br>" + "Median: " + median + 
        "<br>" + "Range: " + range + 
        "<br>" + "Mode: " + mode +
        "<br>" + "Variance: " + variance.toFixed(2) +
        "<br>" + "Standard Deviation: " + standardDeviation + 
        "<br>" + "Interquartile Range: " + getInterquartileRange(values) + 
        "<br>" + "Z Score: " + zscoreValue
}