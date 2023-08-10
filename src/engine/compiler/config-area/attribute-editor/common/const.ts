import { computed } from 'vue';

export const useConst = (t: any) => {
  const defaultOptions = [
    {
      title: `onClick`,
      value: 'onClick',
    },
  ];

  const formOptions = [
    {
      title: `onChange ${t('el.changeInValue')}`,
      value: 'onChange',
    },
    {
      title: `onFocus ${t('el.changeInValue')}`,
      value: 'onFocus',
    },
    {
      title: `onBlur ${t('el.changeInValue')}`,
      value: 'onBlur',
    },
  ];

  const options = computed(
    () =>
      (
        componentType?: string,
      ): {
        title: string;
        value: string;
      }[] => {
        if (!componentType || ['Button', 'Text'].includes(componentType)) {
          return defaultOptions;
        }

        if (['Collapse', 'Tabs'].includes(componentType)) {
          return [
            {
              title: `onChange ${t('el.changeInValue')}`,
              value: 'onChange',
            },
          ];
        }

        if (['Filter'].includes(componentType)) {
          return [
            {
              title: `onSearch`,
              value: 'onSearch',
            },
            {
              title: `onReset`,
              value: 'onReset',
            },
          ];
        }

        return formOptions;
      },
  );
  return [options];
};
