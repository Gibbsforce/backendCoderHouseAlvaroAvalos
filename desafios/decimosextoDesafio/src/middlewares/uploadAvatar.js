// Multer
import multer from "multer"
// Handling upload image
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/images/");
    },
    filename: (req, file, callback) => {
        callback(null, `${req.body.username.split("@")[0]}${file.originalname}`)
        // callback(null, `${file.originalname}`)
    }
})
const upload = multer({ storage })
export default upload