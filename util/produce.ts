import { enableES5, produce } from 'immer';

export default (...args: any) => {
  enableES5();
  // @ts-ignore
  return produce(...args);
};
