const ErrorCodeResponse = (res, code, message, data) => {
    if (data) return res.status(code).json({
        data,
        error: {
            code, message
        }
    })
    else return res.status(code).json({
        error: {
            code, message
        }
    })
};

const ErrorCode500 = (res) => {
    ErrorCodeResponse(res, 500, "Internal server error", null)
};

const ErrorCode200 = (res, data) => {
    ErrorCodeResponse(res, 200, "OK", data)
};

const ErrorCode404 = (res) => {
    ErrorCodeResponse(res, 404, "Something is not right", null)
};

module.exports = { ErrorCode: { ErrorCodeResponse, ErrorCode500, ErrorCode200, ErrorCode404 } }