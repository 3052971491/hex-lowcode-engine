import { computed, inject, isRef, ref, unref, InjectionKey, Ref } from 'vue';
import { get } from 'lodash-es';
import English from '/@/locale/lang/en';
import type { MaybeRef } from '@vueuse/core';
import type { Language } from '/@/locale';

export type TranslatorOption = Record<string, string | number>;
export type Translator = (path: string, option?: TranslatorOption) => string;
export type LocaleContext = {
  locale: Ref<Language>;
  lang: Ref<string>;
  t: Translator;
};

export const buildTranslator = (locale: MaybeRef<Language>): Translator => {
  return (path, option) => translate(path, option, unref(locale));
};

export const translate = (path: string, option: undefined | TranslatorOption, locale: Language): string => {
  return (get(locale, path, path) as string).replace(/\{(\w+)\}/g, (_, key) => `${option?.[key] ?? `{${key}}`}`);
};

export const buildLocaleContext = (locale: MaybeRef<Language>): LocaleContext => {
  const lang = computed(() => unref(locale).name);
  const localeRef = isRef(locale) ? locale : ref(locale);
  return {
    lang,
    locale: localeRef,
    t: buildTranslator(locale),
  };
};

export const localeContextKey: InjectionKey<Ref<Language | undefined>> = Symbol('localeContextKey');

export const useLocale = (localeOverrides?: Ref<Language | undefined>) => {
  const locale = localeOverrides || inject(localeContextKey, ref())!;
  return buildLocaleContext(computed(() => locale.value || English));
};
