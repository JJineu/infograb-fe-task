import { postSurvey } from '@/data/services';
import { getCookie } from '@/store/Cookie';

export const postSurveyQuery = async ({ answers, nextFunc }: { answers: { [key: string]: { sum: number } }; nextFunc: () => void }) => {
  try {
    alert('설문이 완료되었습니다. 감사합니다.');

    const answersArray = Object.keys(answers).map((key) => ({
      titleId: key,
      sum: answers[key].sum,
    }));
    const userTeam = getCookie('user_team') || '';
    await postSurvey(userTeam, answersArray);

    nextFunc();
  } catch (error) {
    console.error('Survey submission error:', error);
  }
};
