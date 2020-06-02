let express = require("express");
let multer = require("multer");
let path = require("path");
let bodyParser = require("body-parser");
 
let app = express();
app.use(bodyParser.urlencoded({extended: true}));
 
app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/master.html`));
});
 
let diskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {

    let math = ["image/png", "image/jpeg"];
    if (math.indexOf(file.mimetype) === -1) {
      let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
      return callback(errorMess, null);
    }

    let filename = `${Date.now()}-trungquandev-${file.originalname}`;
    callback(null, filename);
  }
});
 
let uploadFile = multer({storage: diskStorage}).single("file");
 app.post("/upload", (req, res) => {
  uploadFile(req, res, (error) => {
    if (error) {
      return res.send(`Error when trying to upload: ${error}`);
    }

    console.log(`------Request body-----`);
    console.log(req.body);

    console.log(`------Request file-----`);
    console.log(req.file);

    console.log(`------Test Done-----`)
  });
});
 
app.listen(8017, "localhost", () => {
});