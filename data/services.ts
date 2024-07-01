'use client';

import type { QuestionProps } from '@/components/question/Question';

export const postSurvey = (userTeam: string, answersArray: { titleId: string; sum: number }[]) => {
  setTeams(userTeam);
  setSurveyData(userTeam, [...getSurveyData(userTeam), ...answersArray]);
};

export const getTeams = (): { name: string; count: number }[] => {
  const teams = localStorage.getItem('teams');
  return teams ? JSON.parse(teams) : [];
};

export const getTeamNames = () => {
  return getTeams().map((team) => team.name);
};

const setTeams = (userTeam: string) => {
  const teams = getTeams();
  const selectedTeam = teams.find((team) => team.name === userTeam);
  if (!selectedTeam) {
    localStorage.setItem('teams', JSON.stringify([...teams, { name: userTeam, count: 1 }]));
  } else {
    localStorage.setItem('teams', JSON.stringify([...teams.filter((team) => team.name !== userTeam), { name: userTeam, count: selectedTeam.count + 1 }]));
  }
};

const getSurveyData = (team: string): { titleId: string; sum: number }[] => {
  const data = localStorage.getItem(team);
  return data ? JSON.parse(data) : [];
};

const setSurveyData = (team: string, data: { titleId: string; sum: number }[]) => {
  localStorage.setItem(team, JSON.stringify(data));
};

export const getSumResult = (): { xLabel: string; [key: string]: number }[] => {
  const teamNames = getTeamNames();
  const titleIds = getTitleIds();

  const sumsByTitleId = titleIds.reduce((acc, titleId) => {
    acc[titleId] = { xLabel: titleId };
    teamNames.forEach((team) => (acc[titleId][team] = 0));
    return acc;
  }, {});

  teamNames.forEach((team) => {
    const sumByTeam = getSumByTeam(team);
    sumByTeam.forEach(({ titleId, sum }) => {
      if (sumsByTitleId[titleId]) {
        sumsByTitleId[titleId][team] += sum;
      }
    });
  });

  return Object.values(sumsByTitleId);
};

const getSumByTeam = (team: string): { titleId: string; sum: number }[] => {
  const data = getSurveyData(team);

  const sumsByTitleId = data.reduce((acc: { [key: string]: number }, curr: { titleId: string; sum: number }) => {
    acc[curr.titleId] = (acc[curr.titleId] || 0) + curr.sum;
    return acc;
  }, {});

  // Convert sumsByTitleId to the desired array format
  const result = Object.entries(sumsByTitleId).map(([titleId, sum]) => ({ titleId, sum }));

  // Calculate total sum
  const totalSum = result.reduce((acc, curr) => acc + curr.sum, 0);

  // Add total sum to the result array
  result.push({ titleId: 'total', sum: totalSum });

  return result;
};

export const getSumAvgResult = (): { xLabel: string; [key: string]: number }[] => {
  const teamNames = getTeamNames();
  const titleIds = getTitleIds();
  const teams = getTeams();

  const sumsByTitleId = titleIds.reduce((acc, titleId) => {
    acc[titleId] = { xLabel: titleId };
    teamNames.forEach((team) => (acc[titleId][team] = 0));
    return acc;
  }, {});

  teamNames.forEach((team) => {
    const sumByTeam = getSumByTeam(team);
    sumByTeam.forEach(({ titleId, sum }) => {
      if (sumsByTitleId[titleId]) {
        sumsByTitleId[titleId][team] += sum;
      }
    });
  });

  const avgByTitleId = Object.entries(sumsByTitleId).reduce((acc, [titleId, teamSums]) => {
    acc[titleId] = { xLabel: titleId };
    teams.forEach((team) => {
      const teamName = team.name;
      const teamCount = team.count;
      if (teamCount > 0) {
        acc[titleId][teamName] = parseFloat((teamSums[teamName] / teamCount).toFixed(2));
      } else {
        acc[titleId][teamName] = 0;
      }
    });
    return acc;
  }, {});

  return Object.values(avgByTitleId);
};

export const getQuestions = (): { data: QuestionProps[] } => {
  return {
    data: [
      {
        type: 'MULTIPLE_CHOICE',
        title: { id: '1', content: '회사 근처에 맛집이 많이 있나요?' },
        choices: [
          { id: '1', value: 1, content: '거의 없어요 - 회사 주변에 맛집을 찾기 어려워요.' },
          { id: '2', value: 2, content: '조금 부족해요 - 맛있는 곳은 있지만 다양성이 부족해요.' },
          { id: '3', value: 3, content: '적당해요 - 여러 선택지가 있지만 더 다양했으면 좋겠어요.' },
          { id: '4', value: 4, content: '조금 많아요 - 다양한 맛집이 있지만 더 추가되면 좋겠어요.' },
          { id: '5', value: 5, content: '매우 많아요 - 회사 주변에 다양한 맛집이 가득해요!' },
        ],
      },
      {
        type: 'SHORT_ANSWER',
        title: { id: '2', content: '회사 근처 맛집에 대한 전반적인 만족도를 1에서 10 사이로 평가해주세요.' },
      },
      {
        type: 'MULTIPLE_CHOICES',
        title: { id: '3', content: '맛집을 선택할 때 고려했던 기준들을 모두 알려주세요!' },
        choices: [
          { id: '1', value: 1, content: '청결도 - 맛집의 청결 상태가 중요해요.' },
          { id: '2', value: 2, content: '가성비 - 이 맛에 이 가격이?! 맛과 가격이 만족스러워야 해요.' },
          { id: '3', value: 3, content: '음식의 맛 - 음식 맛은 기본이죠~ 맛이 훌륭해요.' },
          { id: '4', value: 4, content: '분위기 - 맛집의 분위기와 인테리어가 중요해요.' },
          { id: '5', value: 5, content: '재방문 의사 - 이 맛집은 멀리서도 찾아올 정도로 오고 싶은 곳이에요' },
        ],
      },
      {
        type: 'RATING_SCALE',
        title: { id: '4', content: '본인이 미식가라고 생각하는 정도를 1에서 10 사이로 평가해주세요.' },
      },
    ],
  };
};

const getTitleIds = () => [...getQuestions().data.map((question) => question.title.id), 'total'];

export const getStandardDeviationResult = (): { group: string; n: number; value: number }[] => {
  const teams = getTeams(); // Get teams information

  // Step 1: Calculate the average (mean) values for each titleId (group)
  const avgByTitleId = getSumAvgResult();

  const stdDevByTitleId: { [key: string]: { group: string; n: number; value: number } } = {};
  // Step 2: Compute sum of squared differences and number of elements (n) for each titleId
  teams.forEach((team) => {
    const sumByTeam = getSumByTeam(team.name); // Get sum by team
    sumByTeam.forEach(({ titleId, sum }) => {
      if (!stdDevByTitleId[`${team.name}__${titleId}`]) {
        stdDevByTitleId[`${team.name}__${titleId}`] = { group: titleId, n: 0, value: 0 };
      }
      stdDevByTitleId[`${team.name}__${titleId}`].n += 1; // Increment number of elements (n)
      const mean = avgByTitleId.find((avg) => avg.xLabel === titleId)[team.name];
      stdDevByTitleId[`${team.name}__${titleId}`].value += (sum - mean) ** 2; // Sum of squared differences
    });
  });

  // Step 3: Calculate standard deviation and format the result
  const stdDeviationResult = Object.keys(stdDevByTitleId).map((titleId) => {
    const { group, n, value } = stdDevByTitleId[titleId];
    const stdDeviation = Math.sqrt(value / n); // Calculate standard deviation
    return { group, n, value: stdDeviation };
  });
  return stdDeviationResult;
};

export const getCorrelationResult = (): { id: string; data: { x: number; y: number }[] }[] => {
  const teams = getTeams();

  const correlationResult = teams.map((team) => {
    const sumByTeam = getSumByTeam(team.name); // Get sum by team
    const teamTotalAvg = sumByTeam.find((sum) => sum.titleId === 'total').sum / team.count;
    return { id: team.name, data: [{ x: teamTotalAvg, y: team.count }] };
  });

  return correlationResult;
};

export const getHeatMapResult = async (): Promise<{ results: { id: string; data: { x: string; y: number }[] }[]; maxValue: number }> => {
  let maxValue = 0;
  let results = getTitleIds()
    .filter((titleId) => titleId !== 'total') // Filter out 'total'
    .map((titleId) => ({
      id: titleId,
      data: [
        { x: '01', y: 0 },
        { x: '02', y: 0 },
        { x: '03', y: 0 },
        { x: '04', y: 0 },
        { x: '05', y: 0 },
      ],
    }));

  const teamNames = getTeamNames();
  await teamNames.forEach(async (team) => {
    const data = await getSurveyData(team);
    data.forEach(({ titleId, sum }) => {
      const result = results.find((r) => r.id === titleId);
      if (!result) return;

      let index;
      switch (titleId) {
        case '1':
          index = sum - 1;
          break;
        case '2':
        case '4':
          if (sum >= 1 && sum <= 2) index = 0;
          else if (sum >= 3 && sum <= 4) index = 1;
          else if (sum >= 5 && sum <= 6) index = 2;
          else if (sum >= 7 && sum <= 8) index = 3;
          else if (sum >= 9 && sum <= 10) index = 4;
          break;
        case '3':
          if (sum >= 1 && sum <= 3) index = 0;
          else if (sum >= 4 && sum <= 6) index = 1;
          else if (sum >= 7 && sum <= 9) index = 2;
          else if (sum >= 10 && sum <= 12) index = 3;
          else if (sum >= 13 && sum <= 15) index = 4;
          break;
        default:
          return;
      }

      if (index !== undefined) {
        result.data[index].y += 1;
        results = [...results.filter((r) => r.id !== titleId), result];
        if (result.data[index].y > maxValue) {
          maxValue = result.data[index].y;
        }
      }
    });
  });

  return { results, maxValue };
};
