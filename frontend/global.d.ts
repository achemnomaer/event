/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
// global.d.ts
import mongoose from "mongoose";


declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

export {};
