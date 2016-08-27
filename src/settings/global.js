/**
 *
 * Global settings
 *
 * Author: Kim Hsiao
 */

import { join as pjoin } from 'path';

export default () => {
  const proot = pjoin(__dirname, '..', '..');

  const conf = {
    port: 30001,
    path: {
      root: proot,
      src: pjoin(proot, 'src'),
      log: pjoin(proot, 'log'),
    },
  };

  return conf;
};
