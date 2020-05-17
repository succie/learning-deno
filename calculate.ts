export const add = (...args: number[]) => {
  return args.reduce((result, value) => result + value, 0);
};

export const sub = (...args: number[]) => {
  return args.slice(1).reduce((result, value) => result - value, args[0]);
};

export const mul = (...args: number[]) => {
  return args.reduce((result, value) => result * value, 1);
};

export const div = (...args: number[]) => {
  return args.slice(1).reduce((result, value) => result / value, args[0]);
};
