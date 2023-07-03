import type { App } from 'vue';
import HexIconPicker from './src/hex-icon-picker.vue';

export { HexIconPicker };
export type IconPickerInstance = InstanceType<typeof HexIconPicker>;

export default {
  install(app: App): void {
    app.component(HexIconPicker.name, HexIconPicker);
  },
};
