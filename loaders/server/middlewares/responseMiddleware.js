export const responseMiddleware = (req, res, next) => {
    res.apiResponse = function (body) {
        if (body !== null) {
            const success = res.statusCode < 400;
            const formattedResponse = {
                success,
                data: success ? body : null,
                message: success ? 'Successful.' : 'An error occurred.',
                error: success ? null : body.message || 'Unknown error',
            };
            return res.send.call(this, formattedResponse);
        }
        return res.send.call(this, body);
    };
    next();
};
