import { getCookie, setCookie } from '@/store/Cookie';

export const postUserQuery = async ({ user, nextFunc }: { user: { name: string; team: string }; nextFunc: () => void }) => {
  try {
    if (!user.team || !user.name) {
      alert('팀과 이름을 모두 입력하세요.');
      return;
    }
    setCookie('user_team', user.team);
    setCookie('user_name', user.name);
    nextFunc();
  } catch (error) {
    console.error('User submission error:', error);
  }
};

export const getUserQuery = async () => {
  try {
    return { team: getCookie('user_team'), name: getCookie('user_name') };
  } catch (error) {
    return { team: '', name: '' };
  }
};
