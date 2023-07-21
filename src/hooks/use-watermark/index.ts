import { computed } from 'vue';
import { HexCoreFactory } from '/@/engine/renderer/central/useHexCore';

export function useWatermark(core: HexCoreFactory | undefined, redactState: boolean) {
  const watermarkModel = computed(() => {
    if (!core?.state.projectConfig || redactState) return false;
    const { rowGutter, columnGutter, ...options } = core.state.projectConfig.config.watermark;
    return { gap: [rowGutter, columnGutter], ...options };
  });
  return {
    watermarkModel,
  };
}
