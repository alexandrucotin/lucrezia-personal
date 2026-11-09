import * as migration_20261109_153446_iniziale from './20261109_153446_iniziale';
import * as migration_20261109_154627_foto_su_r2 from './20261109_154627_foto_su_r2';

export const migrations = [
  {
    up: migration_20261109_153446_iniziale.up,
    down: migration_20261109_153446_iniziale.down,
    name: '20261109_153446_iniziale',
  },
  {
    up: migration_20261109_154627_foto_su_r2.up,
    down: migration_20261109_154627_foto_su_r2.down,
    name: '20261109_154627_foto_su_r2'
  },
];
