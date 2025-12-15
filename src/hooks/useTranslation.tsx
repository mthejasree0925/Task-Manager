import { useMemo } from 'react';
import { i18n } from '../i18n';

export const useTranslation = () => {
  const t = useMemo(() => {
    return (key: string, options?: any) => i18n.t(key, options);
  }, [i18n.locale]);

  return { t, locale: i18n.locale };
};