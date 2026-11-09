import * as migration_20261109_153446_iniziale from './20261109_153446_iniziale';
import * as migration_20261109_154627_foto_su_r2 from './20261109_154627_foto_su_r2';
import * as migration_20261109_161606_bozze_ordine_testo_ricco from './20261109_161606_bozze_ordine_testo_ricco';
import * as migration_20261109_162513_personalizzazione from './20261109_162513_personalizzazione';

export const migrations = [
  {
    up: migration_20261109_153446_iniziale.up,
    down: migration_20261109_153446_iniziale.down,
    name: '20261109_153446_iniziale',
  },
  {
    up: migration_20261109_154627_foto_su_r2.up,
    down: migration_20261109_154627_foto_su_r2.down,
    name: '20261109_154627_foto_su_r2',
  },
  {
    up: migration_20261109_161606_bozze_ordine_testo_ricco.up,
    down: migration_20261109_161606_bozze_ordine_testo_ricco.down,
    name: '20261109_161606_bozze_ordine_testo_ricco',
  },
  {
    up: migration_20261109_162513_personalizzazione.up,
    down: migration_20261109_162513_personalizzazione.down,
    name: '20261109_162513_personalizzazione'
  },
];
