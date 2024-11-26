export type PersonalityType = 
  | "ant" // コツコツ蟻さん
  | "grasshopper" // 一発逆転バッタ
  | "dolphin" // 逆算できるイルカ
  | "dog" // 素直なワンちゃん
  | "cat"; // 感情に忠実！猫ちゃん

export type ExamTiming = "next" | "future";
export type StudentStatus = "current" | "graduate";
export type ExamStatus = "practicalOnly" | "none";
export type Subject = "law" | "hygiene" | "health" | "chemistry" | "theory";

export interface DiagnosisState {
  personalityAnswers: {
    homework: string;
    studyStyle: string;
    readingAbility: string;
    focusTime: string;
  };
  detailAnswers: {
    examTiming: ExamTiming;
    status: StudentStatus;
    previousExam: ExamStatus;
    weakSubjects: Subject[];
  };
  personalityType: PersonalityType | null;
}