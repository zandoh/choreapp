export class functions {
  static promisify = (cb: any) =>
    new Promise((resolve, reject) => {
      cb((error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
}
