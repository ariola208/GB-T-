export type LangCode = "yo" | "fon" | "ddn";
export const LANGS: LangCode[] = ["yo", "fon", "ddn"];
export const CATEGORIES = ["salutations", "remerciements", "directions", "marche", "restaurant", "politesse", "culture"];

type L3 = { fr: string; en: string; pt: string };
export type Form = { text: string; pron?: string; audio?: string; verified: boolean };
export type Phrase = {
  id: string; cat: string; fr: string; en: string; pt: string;
  context?: L3; forms: Partial<Record<LangCode, Form>>;
};

/*
 * AJOUTER UNE ENTRÉE VALIDÉE (après relecture par un locuteur) :
 *   forms: { fon: { text: "...", pron: "...", audio: "/audio/fon/morning.mp3", verified: true } }
 * Fichiers audio : public/audio/<langue>/<id>.mp3 (enregistrés avec l'accord de la personne).
 * Yoruba ci-dessous : BROUILLONS (verified: false), à faire relire, tons et accents compris.
 * Fon et dendi : volontairement vides tant qu'aucun locuteur n'a fourni de contenu.
 */
export const PHRASES: Phrase[] = [
  { id: "morning", cat: "salutations", fr: "Bonjour (le matin)", en: "Good morning", pt: "Bom dia",
    context: {
      fr: "En yoruba, les salutations changent selon le moment de la journée et l'activité de la personne.",
      en: "In Yoruba, greetings change with the time of day and what the person is doing.",
      pt: "Em ioruba, as saudações mudam consoante a hora do dia e a atividade da pessoa.",
    },
    forms: { yo: { text: "Ẹ káàárọ̀", verified: false } } },
  { id: "welcome", cat: "salutations", fr: "Bienvenue", en: "Welcome", pt: "Bem-vindo", forms: { yo: { text: "Ẹ káàbọ̀", verified: false } } },
  { id: "howareyou", cat: "salutations", fr: "Comment allez-vous ?", en: "How are you?", pt: "Como está?", forms: { yo: { text: "Báwo ni?", verified: false } } },
  { id: "goodbye", cat: "salutations", fr: "Au revoir", en: "Goodbye", pt: "Adeus", forms: { yo: { text: "Ó dàbọ̀", verified: false } } },
  { id: "thanks", cat: "remerciements", fr: "Merci", en: "Thank you", pt: "Obrigado", forms: { yo: { text: "Ẹ ṣé", verified: false } } },
  { id: "thanksalot", cat: "remerciements", fr: "Merci beaucoup", en: "Thank you very much", pt: "Muito obrigado", forms: { yo: { text: "Ẹ ṣé púpọ̀", verified: false } } },
  { id: "market_where", cat: "directions", fr: "Où est le marché ?", en: "Where is the market?", pt: "Onde fica o mercado?", forms: { yo: { text: "Ibo ni ọjà wà?", verified: false } } },
  { id: "right_left", cat: "directions", fr: "À droite / à gauche", en: "Right / left", pt: "À direita / à esquerda", forms: { yo: { text: "Ọ̀tún / Òsì", verified: false } } },
  { id: "howmuch", cat: "marche", fr: "Combien ça coûte ?", en: "How much is it?", pt: "Quanto custa?", forms: { yo: { text: "Èló ni?", verified: false } } },
  { id: "toomuch", cat: "marche", fr: "C'est trop cher", en: "That is too expensive", pt: "É demasiado caro", forms: { yo: { text: "Ó wọ́n jù", verified: false } } },
  { id: "water", cat: "restaurant", fr: "De l'eau, s'il vous plaît", en: "Water, please", pt: "Água, por favor", forms: { yo: { text: "Omi, jọ̀wọ́", verified: false } } },
  { id: "hungry", cat: "restaurant", fr: "J'ai faim", en: "I am hungry", pt: "Tenho fome", forms: { yo: { text: "Ebi ń pa mí", verified: false } } },
  { id: "please", cat: "politesse", fr: "S'il vous plaît", en: "Please", pt: "Por favor", forms: { yo: { text: "Jọ̀wọ́", verified: false } } },
  { id: "sorry", cat: "politesse", fr: "Excusez-moi / pardon", en: "Excuse me / sorry", pt: "Desculpe", forms: { yo: { text: "Ẹ má bínú", verified: false } } },
  { id: "work", cat: "culture", fr: "Courage pour votre travail", en: "Well done for your work", pt: "Força no seu trabalho",
    context: {
      fr: "On adresse cette formule à quelqu'un qui est en train de travailler : c'est une façon de reconnaître son effort.",
      en: "This phrase is addressed to someone who is at work: a way of acknowledging their effort.",
      pt: "Esta fórmula dirige-se a quem está a trabalhar: é uma forma de reconhecer o seu esforço.",
    },
    forms: { yo: { text: "Ẹ kú iṣẹ́", verified: false } } },
];
