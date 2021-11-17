// Notes:
// - This is the main data schema, but does not capture analytics/user
//   data/social features/etc.
// - This schema is just for explaining the data structure. I don't think this
//   is necessarily the best way to store things in Firebase, for searchability
//   reasons.

// e.g. Unit 1: scrambled eggs
type Unit = {
  name: string;
  order: number;
  lessons: (KnowledgeLesson | RecognitionLesson) [];
}

type Lesson = {
  name: string;
  description: string;
  icon: Icon;
}

// A lesson composed of multiple choice questions.
type KnowledgeLesson = Lesson & {
  questions: MultipleChoiceQuestion[];
  // A summary of the lesson that will be shown at the end
  summary: string;
}

// Most questions and answers will either be a text or some media.
type Prompt = string | Media;

// Standard multiple choice question.
// Usually it will be a picture Q with text answers, or text Q with picture answers.
type MultipleChoiceQuestion = {
  prompt: Prompt;
  choices: MultipleChoiceAnswer[];
  // A default flavor text if a wrong answer is chosen
  defaultFlavor: string;
}

type MultipleChoiceAnswer = {
  // Answer can either be text or a picture
  answer: Prompt;
  // This shows up as after selecting this choice
  flavor: string;
}

// A lesson with randomly generated questions.
type RecognitionLesson = Lesson & {
  // Would be great if we could select these with autocomplete in the CMS.
  items: LibraryItem[];
}

// An item you would find in the kitchen, be it a tool, vegetable, or spice.
type LibraryItem = {
  name: string; // 'nutmeg'
  tags: string[]; // 'spice' or ['leafy', 'vegetable'] or 'tool'
  // 1 or more pictures of this item
  photos: Media[];
  // Some interesting facts about this item that we can use in the app
  flavorText: string[];
}

/**
 * Supporting types
 */
type Media = {
  name: string; // something to find this with, for searching
  kind: 'image' | 'gif' | 'video';
  // ...appropriate fields to refer to these kinds of media. Video will come later.
  // CMS will be great if we can re-use these with autocomplete to find them.
}

type Icon = {
  type: 'ic' | 'ic48' | 'badge';
  name: string;
}