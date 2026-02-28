/**
 * Error Handler Middleware
 * Catches errors thrown in routes/controllers and sends JSON response
 */
const errorHandler = (err, req, res, next) => {
    // Default to 500 if status Code not set
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
    });
};

module.exports = errorHandler;
