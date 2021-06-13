const { BASE_API_URL } = require('../../constants');
const { getName_ImageFront } = require('../../utils/Validation_Info');
const { ErrorCode } = require('../../constants')

async function _uploadMutilPhoto(req, res, next) {
    try {
        if (!req.files) {
            return ErrorCode.ErrorCodeResponse(res, 400, "No file is uploaded", null)
        } else {
            const photos = req.files.files;
            let name_img = getName_ImageFront(photos);
            photos.mv("./public/uploads/" + name_img);
            let data = {
                name: name_img,
                mimetype: photos.mimetype,
                size: photos.size,
                url: `${BASE_API_URL}/uploads/${name_img}`
            }
            return ErrorCode.ErrorCode200(res, data)
        }
    } catch (err) {
        return ErrorCode.ErrorCode500
    }
};

module.exports = { _uploadMutilPhoto };
