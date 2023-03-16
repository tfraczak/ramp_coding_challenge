export const classNameBuilder = (...classes: string[]) => (
  `ramp ${classes.filter((className) => className).join(' ')}`
);