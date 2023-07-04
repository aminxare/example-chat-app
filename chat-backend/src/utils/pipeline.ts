/**
 * 
 * @param callbacks is an array of functions that will be executed from 0
 * @returns a function that accepts a parameter as first argument value
 */
const pipeline = function (callbacks: ((x: any) => any)[]) {
  return function (x?: any) {
    return callbacks.reduce((a, b) => b(a), x);
  };
};

export default pipeline;
