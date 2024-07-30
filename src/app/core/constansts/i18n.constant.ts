export type LangDefinition = {
    id: LangId;
    label: string;
};

export const avalibleLangs: LangDefinition[] = [
    {
        id: 'en',
        label: 'English',
    },
    {
        id: 'ru',
        label: 'Русский',
    },
];

export type LangId = 'en' | 'ru';
