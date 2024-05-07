export const errorHandler = (error, req, res, next) => {
    console.log(`Error ${error.stack}`);
    const status = error.status || 500;
    res.status(status).json({msg: error.message});
}