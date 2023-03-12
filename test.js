let a = { y: 10 }
a.x = a
//console.log(JSON.stringify(a))

let arr = [1, "Turing", { x: 2 }, { 3: 4 }]
delete arr[1]
console.log(arr.length)
console.log(arr)

for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "Turing") arr.splice(i, 1)
    else console.log(arr[i])
}
