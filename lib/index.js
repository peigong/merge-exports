import fs from 'fs';

const base = __dirname;
const exp = {};

const items = fs.readdirSync(base)
  .filter(item => {
    return (item.indexOf('index') !== 0) && (item.indexOf('.js') > 0);
  })
  .map(item => {
    return require(item);
  });
Object.assign(exp, ...items);

export default exp;
