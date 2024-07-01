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
  const teams = getTeamNames();
  const titleIds = getTitleIds();

  const sumsByTitleId = titleIds.reduce((acc, titleId) => {
    acc[titleId] = { xLabel: titleId };
    teams.forEach((team) => (acc[titleId][team] = 0));
    return acc;
  }, {});

  teams.forEach((team) => {
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
  //   const result = data.reduce((acc: { [key: string]: number }, curr: { titleId: string; sum: number }) => {
  //     acc[curr.titleId] = (acc[curr.titleId] || 0) + curr.sum;
  //     return acc;
  //   }, {});

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

const getTitleIds = () => ['1', '2', '3', 'total'];

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
        title: { id: '2', content: '맛집들에 대한 만족도를 숫자로 표현한다면?' },
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
    ],
  };
};

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

//   // 팀별 점수 분포 차트 데이터 준비
//   const distributionData = {
//     labels: Array.from({ length: 10 }, (_, i) => i + 1),
//     datasets: teams.map((team, index) => ({
//       label: team.name,
//       data: team.scores,
//       backgroundColor: `rgba(${index * 50}, ${100 + index * 50}, 192, 0.2)`,
//       borderColor: `rgba(${index * 50}, ${100 + index * 50}, 192, 1)`,
//       borderWidth: 1
//     }))
//   };

//   // 상관관계 차트 데이터 준비 (예시 데이터가 부족하여 간단히 표현)
//   const correlationData = {
//     labels: ['1번 문제', '2번 문제', '3번 문제'],
//     datasets: [{
//       label: '상관관계',
//       data: [1, 0.5, -0.2], // 상관관계 예시 값
//       backgroundColor: 'rgba(153, 102, 255, 0.2)',
//       borderColor: 'rgba(153, 102, 255, 1)',
//       borderWidth: 1
//     }]
//   };

//   // 팀별 퍼포먼스 트렌드 차트 데이터 준비 (예시 데이터가 부족하여 간단히 표현)
//   const trendData = {
//     labels: ['월', '화', '수', '목', '금'],
//     datasets: teams.map((team, index) => ({
//       label: team.name,
//       data: team.scores, // 예시 데이터
//       fill: false,
//       borderColor: `rgba(${index * 50}, ${100 + index * 50}, 192, 1)`,
//       tension: 0.1
//     }))
//   };
