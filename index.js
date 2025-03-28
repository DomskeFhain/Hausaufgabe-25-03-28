const express = require('express'); // import express
const app = express(); // as an app
const fs = require('fs'); // import fs
app.use(express.json()); // Middleware to write in body
// Helpfunction
function readFile() {
    const data = fs.readFileSync("chars.json", "utf8");
    return JSON.parse(data);
}
function writeFile(data) {
    fs.writeFileSync("chars.json", JSON.stringify(data, null, 2));  // JSON.stringify converts Java object to JSON format
}
app.get("/chars", (req, res) => {
    const chars = readFile(); // read from file
    res.json(chars);
});
app.post("/chars", (req, res) => {
    const chars = readFile(); // read from file
    const { charClass, name } = req.body;
   if(name && charClass){
        const newChar = {
            id: chars.length + 1,
            charClass: charClass,
            name: name
        }
        chars.push(newChar)
        writeFile(chars); // write to file
        res.json(201).json(newChar);
    }
    else{
        res.send("Data incomplete")
    }

});
app.put("/chars/:id", (req, res) => {
    const id = req.params.id;
    const chars = readFile(); // read from file
    const newName = req.body.name;
    const foundChar = chars.find(char => char.id == id);
    foundChar.name = newName;
    res.json(foundChar);
    writeFile(chars); // write to file
});
app.delete("/chars/:id", (req, res) => {
    const id = req.params.id;
    const chars = readFile(); // read from file
    const index = chars.findIndex(char => char.id == id);
    const deletedChar = chars.splice(index, 1);
    writeFile(chars); // write to file
    res.json("Deleted " + deletedChar[0].name)
});
app.listen(9000, () => {
    console.log("Server läuft auf http://localhost:9000/chars")
}); 