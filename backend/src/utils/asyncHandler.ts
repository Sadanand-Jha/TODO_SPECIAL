import { Request, Response, NextFunction, RequestHandler } from "express";

// 1. Define the type for the function that will be wrapped.
// This is the actual Express controller logic that returns a Promise.
export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

// 2. Define the type for the wrapper function itself.
// It takes an AsyncRequestHandler and returns a standard Express RequestHandler.
export type AsyncHandlerWrapper = (
  requestHandler: AsyncRequestHandler
) => RequestHandler;


// 3. Apply the type to your function implementation.
const asyncHandler: AsyncHandlerWrapper = (
  requestHandler
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    // This is the core logic: execute the handler, catch any promise rejection, and pass it to Express's error handler (next).
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};

export { asyncHandler };