let values=[]
let sum = 0
let mean = 0

valuesInfo = document.getElementById("values").value
values = valuesInfo.split(",").map(number)

for (let i = 0; i<values.length; i++)
{
    sum+=values[i]
}

mean = sum/values.length

document.getElementById("results").innerHTML = "Mean: " + mean