import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { QUESTION_TYPES } from '@/components/question/Question';

interface Answers {
  type: keyof typeof QUESTION_TYPES;
  sum: number;
  selectedIds?: { id: string; value: number }[];
}

interface RequestAnswer {
  titleId: string;
  type: keyof typeof QUESTION_TYPES;
  value: number;
}

interface RequestChoiceAnswer {
  titleId: string;
  type: keyof typeof QUESTION_TYPES;
  selectedId: { id: string; value: number };
}

interface State {
  answers: Record<string, Answers>;
}

interface Actions {
  setAnswer: (answer: RequestAnswer) => void;
  setChoiceAnswer: (answer: RequestChoiceAnswer) => void;
}

export const useAnswersStore = create<State & Actions>()(
  immer((set) => ({
    answers: {
      titleId: {
        type: 'MULTIPLE_CHOICE',
        sum: 0,
        selectedIds: [],
      },
      titleId2: {
        type: 'SHORT_ANSWER',
        sum: 0,
      },
      titleId3: {
        type: 'MULTIPLE_CHOICES',
        sum: 0,
        selectedIds: [],
      },
    },
    setAnswer: (answer: RequestAnswer) =>
      set((state) => {
        const { titleId, ...rest } = answer;
        state.answers[titleId] = {
          type: rest.type,
          sum: rest.value,
        };
      }),
    setChoiceAnswer: (answer: RequestChoiceAnswer) =>
      set((state) => {
        const { titleId, selectedId, ...rest } = answer;
        if (!state.answers[titleId]) {
          state.answers[titleId] = {
            type: rest.type,
            sum: selectedId.value,
            selectedIds: [selectedId],
          };
        } else {
          const isExist = state.answers[titleId].selectedIds?.find(({ id }) => id === selectedId.id);
          if (isExist) {
            state.answers[titleId].sum -= selectedId.value;
            state.answers[titleId].selectedIds = state.answers[titleId].selectedIds?.filter(({ id }) => id !== selectedId.id);
          } else {
            state.answers[titleId].sum += selectedId.value;
            state.answers[titleId].selectedIds?.push(selectedId);
          }
        }
      }),
  })),
);
