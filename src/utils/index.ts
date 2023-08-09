import { TargetContext } from '../types';

export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean },
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  if (noopener) {
    feature.push('noopener=yes');
  }
  if (noreferrer) {
    feature.push('noreferrer=yes');
  }

  window.open(url, target, feature.join(','));
}
