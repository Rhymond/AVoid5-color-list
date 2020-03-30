const colors = require("./colors");
const fs = require('fs');

const contents = fs.readFileSync('tmplt.html', 'utf8');

let c = "";
colors.forEach(color => {
  let found = false;
  ['e', 'é', 'ě', 'ē', 'è', 'ë'].forEach(v => {
    if (color.name.toLowerCase().includes(v) || color.hex.toLowerCase().includes(v)) {
      found = true;
    }
  });

  if (found) { return }

  c += "<tr>";
  c += `<td><span class='blok' style='background-color: ${color.hex}'></span></td>`;
  c += `<td>${color.hex}</td>`;
  c += `<td>${color.name}</td>`;
  c += "</tr>";
});

const indx = contents.replace("{{colors}}", c);
fs.writeFile("colors.html", indx, err => {
  if (err) console.error(err);
  console.log('File is created successfully.');
});
