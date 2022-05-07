export default {
  baseError: (res: Response) => new Error(`An error occurred: status code ${res.status}`)
};
