const multer = require('multer') 

const upload = multer({
    storage: multer.diskStorage({
        destination:
        function(req,file,cb)
        {
            cb(null,"uploads")
        },
        filename: function(req,file,cb)
        {
            cb(null,`${Date.now().toString()}_${file.originalname}`)
        }
    }),

    fileFilter: (req, file, cb) =>{
        if(file.mimetype.startsWith("image")){
            cb(null, true)
        }
        else{
            cb(new Error("only image is allowed."))
        }
    }
}).single("picture")

module.exports = upload;