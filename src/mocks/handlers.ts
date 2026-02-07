import { http, HttpResponse, delay, RequestHandler } from 'msw';
import {
  ORIGINAL_LOREBOOKS,
  ORIGINAL_IP_EXPANSION_PROPOSALS,
  ORIGINAL_WORK_ID,
  ORIGINAL_WORK_TITLE,
  ORIGINAL_TITLES,
  ORIGINAL_GENRES,
  ORIGINAL_NAMES,
} from './original_data';

// Define the base URL from environment variables
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

// ----------------------------------------------------------------------
// Helpers & Mock Data Generators
// ----------------------------------------------------------------------

const generateList = <T>(count: number, generator: (index: number) => T): T[] =>
  Array.from({ length: count }, (_, i) => generator(i + 1));

const getRandomItem = <T>(items: T[]): T =>
  items[Math.floor(Math.random() * items.length)];

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// ----------------------------------------------------------------------
// Creative Data (Original & Witty)
// ----------------------------------------------------------------------

const CREATIVE_WORKS = [
  {
    title: '내 여자친구는 AI라니',
    genre: '로맨스',
    desc: '완벽한 그녀의 유일한 단점은 충전이 필요하다는 것.',
  },
  {
    title: '코딩하다 과로사했더니 이세계 마왕',
    genre: '판타지',
    desc: '버그 없는 세상을 만들기 위한 마왕의 고군분투기.',
  },
  {
    title: '회귀한 재벌 3세의 천재적 투자법',
    genre: '현대판타지',
    desc: '비트코인, 테슬라... 이번 생은 내가 접수한다.',
  },
  {
    title: '무림맹주가 아이돌로 데뷔하다',
    genre: '무협',
    desc: '천마신교 교주가 센터라고? 프로듀스 무림 101!',
  },
  {
    title: '우주 함대의 취사병 전설',
    genre: 'SF',
    desc: '맛없는 전투식량은 가라. 우주 최강 셰프의 탄생.',
  },
  {
    title: '공작 영애는 사실 폭탄마입니다',
    genre: '로판',
    desc: '사교계의 꽃? 아니, 사교계의 불꽃.',
  },
  {
    title: 'S급 헌터는 야근이 싫습니다',
    genre: '현대판타지',
    desc: '던전 공략보다 칼퇴가 더 중요한 헌터의 일상.',
  },
  {
    title: '좀비 세상에서 나 혼자 힐링 캠프',
    genre: '스릴러',
    desc: '남들은 생존 경쟁, 나는 불멍 타임.',
  },
  {
    title: '천재 해커의 이중생활',
    genre: '드라마',
    desc: '낮에는 편의점 알바, 밤에는 국가정보원 비밀 요원.',
  },
  {
    title: '마법학교의 낙제생은 네크로맨서',
    genre: '판타지',
    desc: '친구를 사귀랬더니 시체를 일으켜 세웠다.',
  },
];

const NOTICES = [
  {
    title: '서버실이 너무 더워서 옷을 좀 벗겼습니다...',
    content: '쿨링 팬 커버 말이에요. 오해하지 마세요. (긴급 점검 안내)',
  },
  {
    title: '[이벤트] 밸런타인데이 기념 "초콜릿보다 달콤한 연참" 챌린지',
    content: '작가님들의 당 충전을 위해 마음만 보냅니다.',
  },
  {
    title: '[업데이트] 작가님들의 멘탈 케어를 위한 "AI 칭찬봇" 도입',
    content: '이제 악플 보고 상처받지 마세요. AI가 우쭈쭈 해드립니다.',
  },
  {
    title: '새벽 3시에 알림 보내서 죄송합니다.',
    content: '개발자가 야근하다가 실수로 버튼을 눌렀어요... 살려주세요.',
  },
  {
    title: '매니저 대시보드 리뉴얼 안내',
    content: '이제 더 직관적이고 섹시한 디자인으로 여러분을 맞이합니다.',
  },
];

// ----------------------------------------------------------------------
// Stateful Mock Data
// ----------------------------------------------------------------------

// Works
const MOCK_WORKS = CREATIVE_WORKS.map((work, i) => ({
  id: i + 1,
  title: work.title,
  description: work.desc,
  status: getRandomItem(['ONGOING', 'COMPLETED', 'HIATUS', 'NEW']),
  synopsis: work.desc + ' 주인공의 파란만장한 모험이 시작됩니다.',
  genre: work.genre,
  coverImageUrl: `https://via.placeholder.com/300?text=${encodeURIComponent(work.title.substring(0, 5))}`,
  createdAt: new Date(
    Date.now() - getRandomInt(1, 100) * 86400000,
  ).toISOString(),
  updatedAt: new Date().toISOString(),
  writer: `작가${i + 1}`,
  statusDescription: '연재 중',
}));

// Add Original Work
MOCK_WORKS.push({
  id: ORIGINAL_WORK_ID,
  title: ORIGINAL_WORK_TITLE,
  description: '연금술과 증기기관이 공존하는 스팀펑크 판타지',
  status: 'ONGOING',
  synopsis:
    '몰락한 연금술 명가의 후계자 엘라라가 시간을 되돌리는 아티팩트 "크로노스 코어"를 두고 벌이는 복수와 모험의 대서사시.',
  genre: '판타지',
  coverImageUrl: 'https://via.placeholder.com/300?text=Clockwork+Alchemist',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  writer: '김에이블',
  statusDescription: '절찬 연재중',
});

// Lorebooks
const MOCK_LOREBOOKS = new Map<number, any[]>();
MOCK_WORKS.forEach((work) => {
  const lorebooks = generateList(getRandomInt(5, 10), (i) => ({
    id: work.id * 100 + i,
    workId: work.id,
    name: `${work.genre} 설정 ${i}`,
    category: getRandomItem([
      'characters',
      'places',
      'items',
      'groups',
      'worldviews',
      'plots',
    ]),
    description: `${work.title}의 중요한 설정입니다.`,
    keyword: `키워드${i}`,
    setting: JSON.stringify({
      description: `이 설정은 작품의 전개에 매우 중요한 역할을 합니다.`,
      tags: ['중요', '비밀'],
    }),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
  MOCK_LOREBOOKS.set(work.id, lorebooks);
});
MOCK_LOREBOOKS.set(ORIGINAL_WORK_ID, [...ORIGINAL_LOREBOOKS]);

// Manuscripts
const MOCK_MANUSCRIPTS = new Map<number, any[]>();
MOCK_WORKS.forEach((work) => {
  const manuscripts = generateList(3, (i) => ({
    id: work.id * 1000 + i,
    workId: work.id,
    episode: i,
    title: `${work.title} 제${i}화`,
    content: `이것은 ${work.title}의 ${i}번째 에피소드 본문입니다. 흥미진진한 전개가 이어집니다...`,
    status: 'COMPLETED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
  MOCK_MANUSCRIPTS.set(work.id, manuscripts);
});

// Authors
const MOCK_AUTHORS = generateList(50, (i) => ({
  id: i + 1,
  name: `작가${i + 1}`,
  email: `author${i + 1}@example.com`,
  workCount: getRandomInt(1, 5),
  status: getRandomItem(['ACTIVE', 'INACTIVE', 'BANNED']),
  joinDate: new Date(
    Date.now() - getRandomInt(1, 365) * 86400000,
  ).toISOString(),
  lastActivityAt: new Date(
    Date.now() - getRandomInt(0, 48) * 3600000,
  ).toISOString(),
}));

// Shared Resolver for Author List
const authorListResolver = ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page') || 0);
  const size = Number(url.searchParams.get('size') || 10);

  const start = page * size;
  const end = start + size;
  const content = MOCK_AUTHORS.slice(start, end).map((author) => ({
    id: author.id,
    name: author.name,
    email: author.email,
    workCount: author.workCount,
    status: author.status,
    createdAt: author.joinDate, // DTO field name matching
  }));

  return HttpResponse.json({
    content,
    pageable: { pageNumber: page, pageSize: size },
    totalElements: MOCK_AUTHORS.length,
    totalPages: Math.ceil(MOCK_AUTHORS.length / size),
    number: page,
    size: size,
  });
};

// ----------------------------------------------------------------------
// Handlers Definition
// ----------------------------------------------------------------------

export const handlers: RequestHandler[] = [
  // ======================================================================
  // 1. Common / Test API
  // ======================================================================
  http.get(
    `${BACKEND_URL}/api/v1/hello`,
    () => new HttpResponse('helloUser AIVLE SCHOOL 8th'),
  ),
  http.get(
    `${BACKEND_URL}/api/v1/auth/naver/hello`,
    () => new HttpResponse('naverhelloUser AIVLE SCHOOL 8th'),
  ),

  // ======================================================================
  // 2. User API (Auth)
  // ======================================================================
  http.get(`${BACKEND_URL}/api/v1/auth/me`, () => {
    const storedRole = localStorage.getItem('msw-session-role');
    if (storedRole) {
      return HttpResponse.json({
        type: 'AUTH',
        role: storedRole,
        userId: 1,
        email: 'user@example.com',
        name: '김에이블',
        siteEmail: 'user@example.com',
        mobile: '010-1234-5678',
        birthYear: '1995',
        gender: 'M',
        createdAt: '2025-01-01T09:00:00',
      });
    }
    return new HttpResponse(null, { status: 401 });
  }),

  http.post(`${BACKEND_URL}/api/v1/auth/login`, async ({ request }) => {
    const info = (await request.json()) as any;
    let role = 'Author';
    if (info.siteEmail?.includes('admin')) role = 'Admin';
    else if (info.siteEmail?.includes('manager')) role = 'Manager';

    localStorage.setItem('msw-session-role', role);
    return HttpResponse.json({ success: true, role, type: 'AUTH' });
  }),

  http.post(`${BACKEND_URL}/api/v1/auth/logout`, () => {
    localStorage.removeItem('msw-session-role');
    return HttpResponse.json({ success: true });
  }),

  // ======================================================================
  // 3. Manager API
  // ======================================================================

  // Dashboard Page
  http.get(`${BACKEND_URL}/api/v1/manager/dashboard`, () => {
    return HttpResponse.json({
      summary: {
        pendingProposals: getRandomInt(5, 20),
        managedAuthors: MOCK_AUTHORS.length,
        activeAuthors: MOCK_AUTHORS.filter((a) => a.status === 'ACTIVE').length,
      },
      notices: NOTICES.map((n, i) => ({
        id: i + 1,
        title: n.title,
        content: n.content,
        createdAt: new Date().toISOString(),
        viewCount: getRandomInt(10, 500),
      })),
    });
  }),

  // Dashboard Summary (Standalone)
  http.get(`${BACKEND_URL}/api/v1/manager/dashboard/summary`, () => {
    return HttpResponse.json({
      pendingProposals: getRandomInt(5, 20),
      managedAuthors: MOCK_AUTHORS.length,
      activeAuthors: MOCK_AUTHORS.filter((a) => a.status === 'ACTIVE').length,
    });
  }),

  // Author Summary
  http.get(`${BACKEND_URL}/api/v1/manager/authors/summary`, () => {
    return HttpResponse.json({
      totalAuthors: MOCK_AUTHORS.length,
      newAuthors: getRandomInt(1, 10),
      activeAuthors: MOCK_AUTHORS.filter((a) => a.status === 'ACTIVE').length,
    });
  }),

  // Author List
  http.get(`${BACKEND_URL}/api/v1/manager/authors`, authorListResolver),
  http.get(`${BACKEND_URL}/api/v1/manager/authors/list`, authorListResolver),

  // Author Detail
  http.get(`${BACKEND_URL}/api/v1/manager/authors/:id`, ({ params }) => {
    const id = Number(params.id);
    const author = MOCK_AUTHORS.find((a) => a.id === id);
    if (!author) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json({
      ...author,
      phone: '010-1234-5678',
      works: MOCK_WORKS.slice(0, 3), // Return some works
    });
  }),

  // Invite Code Match
  http.post(`${BACKEND_URL}/api/v1/manager/authors/:pwd`, ({ params }) => {
    if (params.pwd === '123456') {
      return HttpResponse.json({ ok: true, matched: true, authorId: 1 });
    }
    return HttpResponse.json({
      ok: false,
      message: '유효하지 않은 코드입니다.',
    });
  }),

  // IP Trend
  http.get(`${BACKEND_URL}/api/v1/manager/iptrend`, () =>
    HttpResponse.json({
      latestReport: {
        id: 1,
        title: '2025년 2월 1주차 트렌드 리포트',
        date: new Date().toISOString(),
      },
      statistics: { topGenre: '로맨스판타지', emergingKeyword: '회귀, 복수' },
    }),
  ),

  http.get(`${BACKEND_URL}/api/v1/manager/iptrend/list`, () =>
    HttpResponse.json({
      content: generateList(10, (i) => ({
        id: i,
        title: `2025년 2월 ${i}주차 트렌드 리포트`,
        createdAt: new Date().toISOString(),
      })),
      totalPages: 1,
      totalElements: 10,
    }),
  ),

  // ======================================================================
  // 4. Author API
  // ======================================================================

  // Works
  http.get(`${BACKEND_URL}/api/v1/author/works`, ({ request }) => {
    const url = new URL(request.url);
    const authorId = url.searchParams.get('authorId');
    return HttpResponse.json(MOCK_WORKS);
  }),

  http.get(`${BACKEND_URL}/api/v1/author/works/:id`, ({ params }) => {
    const id = Number(params.id);
    const work = MOCK_WORKS.find((w) => w.id === id);
    if (!work) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(work);
  }),

  http.post(`${BACKEND_URL}/api/v1/author/works`, async ({ request }) => {
    const body = (await request.json()) as any;
    const newWork = {
      id: MOCK_WORKS.length + 100,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    MOCK_WORKS.push(newWork);
    return HttpResponse.json(newWork.id);
  }),

  // Manuscripts
  http.get(
    `${BACKEND_URL}/api/v1/author/:userId/:title/manuscript/list`,
    ({ params }) => {
      const title = decodeURIComponent(params.title as string);
      // Find work by title to get workId, or fallback
      const work = MOCK_WORKS.find((w) => w.title === title);
      const workId = work ? work.id : ORIGINAL_WORK_ID;

      const manuscripts = MOCK_MANUSCRIPTS.get(workId) || [];
      return HttpResponse.json({
        content: manuscripts,
        totalPages: 1,
        totalElements: manuscripts.length,
        size: 10,
        number: 0,
      });
    },
  ),

  http.get(
    `${BACKEND_URL}/api/v1/author/:userId/:title/manuscript/:id`,
    ({ params }) => {
      const id = Number(params.id);
      const allManuscripts = Array.from(MOCK_MANUSCRIPTS.values()).flat();
      const manuscript = allManuscripts.find((m) => m.id === id);
      if (!manuscript) return new HttpResponse(null, { status: 404 });
      return HttpResponse.json(manuscript);
    },
  ),

  // Lorebooks
  http.get(
    `${BACKEND_URL}/api/v1/author/:userId/:title/lorebook`,
    ({ request, params }) => {
      const url = new URL(request.url);
      let workId = Number(url.searchParams.get('workId'));

      if (!workId) {
        const title = decodeURIComponent(params.title as string);
        const work = MOCK_WORKS.find((w) => w.title === title);
        if (work) workId = work.id;
      }

      const lorebooks = MOCK_LOREBOOKS.get(workId) || [];
      return HttpResponse.json(lorebooks);
    },
  ),

  http.get(
    `${BACKEND_URL}/api/v1/author/:userId/:title/lorebook/:category`,
    ({ params, request }) => {
      const category = params.category as string;
      const url = new URL(request.url);
      const workId = Number(url.searchParams.get('workId'));

      const lorebooks = MOCK_LOREBOOKS.get(workId) || [];
      const filtered =
        category === '*' || category === 'all'
          ? lorebooks
          : lorebooks.filter((l) => l.category === category);

      return HttpResponse.json(filtered);
    },
  ),

  // Conflict Solve (Mock)
  http.post(
    `${BACKEND_URL}/api/v1/ai/author/:userId/:title/lorebook/conflict_solve`,
    async () => {
      await delay(500);
      return HttpResponse.json('충돌이 해결되었습니다.');
    },
  ),

  // Setting Save
  http.post(
    `${BACKEND_URL}/api/v1/ai/author/:userId/:title/lorebook/setting_save`,
    async ({ request }) => {
      const body = (await request.json()) as any;
      const targetWorkId = body.workId ? Number(body.workId) : ORIGINAL_WORK_ID;
      const currentLorebooks = MOCK_LOREBOOKS.get(targetWorkId) || [];

      const newLorebook = {
        id: Math.max(...currentLorebooks.map((l) => l.id), 0) + 1,
        workId: targetWorkId,
        ...body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      currentLorebooks.push(newLorebook);
      MOCK_LOREBOOKS.set(targetWorkId, currentLorebooks);

      return HttpResponse.json({
        ...newLorebook,
        similarSettings: [],
        checkResult: 'PASS',
      });
    },
  ),

  // Invite Code
  http.get(`${BACKEND_URL}/api/v1/author/invite-code`, () =>
    HttpResponse.json({
      ok: true,
      code: '123456',
      expiresAt: new Date(Date.now() + 5 * 60000).toISOString(),
    }),
  ),

  // ======================================================================
  // 5. Admin API
  // ======================================================================

  // Dashboard Page
  http.get(`${BACKEND_URL}/api/v1/admin/dashboard`, () => {
    return HttpResponse.json({
      summary: {
        totalUsers: 1234,
        activeUsers: 850,
        totalSales: 98765000,
        serverStatus: 'STABLE',
      },
      dauData: {
        dates: generateList(7, (i) => `2025-02-0${i}`),
        values: generateList(7, () => getRandomInt(100, 300)),
      },
      resourceUsage: {
        cpu: getRandomInt(20, 80),
        memory: getRandomInt(40, 90),
        disk: getRandomInt(30, 60),
      },
      recentLogs: generateList(5, (i) => ({
        id: i,
        timestamp: new Date().toISOString(),
        level: getRandomItem(['INFO', 'WARN', 'ERROR']),
        message: getRandomItem([
          '사용자가 비밀번호를 까먹었습니다.',
          '서버실 온도가 약간 높습니다 (25도).',
          '누군가 관리자 페이지에 접근을 시도했습니다.',
          '배포가 성공적으로 완료되었습니다.',
          '커피 머신 물 부족 알림.',
        ]),
        source: 'System',
      })),
    });
  }),

  // Summary
  http.get(`${BACKEND_URL}/api/v1/admin/dashboard/summary`, () => {
    return HttpResponse.json({
      totalUsers: 1234,
      activeUsers: 850,
      totalSales: 98765000,
      serverStatus: 'STABLE',
    });
  }),

  // DAU
  http.get(`${BACKEND_URL}/api/v1/admin/dashboard/dau`, () => {
    return HttpResponse.json({
      dates: generateList(7, (i) => `2025-02-0${i}`),
      values: generateList(7, () => getRandomInt(100, 300)),
    });
  }),

  // Resources
  http.get(`${BACKEND_URL}/api/v1/admin/dashboard/resources`, () => {
    return HttpResponse.json({
      cpu: getRandomInt(20, 80),
      memory: getRandomInt(40, 90),
      disk: getRandomInt(30, 60),
    });
  }),

  // Logs
  http.get(`${BACKEND_URL}/api/v1/admin/dashboard/logs`, () => {
    return HttpResponse.json({
      logs: generateList(20, (i) => ({
        id: i,
        timestamp: new Date(Date.now() - i * 60000).toISOString(),
        level: getRandomItem(['INFO', 'WARN', 'ERROR']),
        message: getRandomItem([
          '사용자가 비밀번호를 까먹었습니다.',
          '서버실 온도가 약간 높습니다 (25도).',
          '누군가 관리자 페이지에 접근을 시도했습니다.',
          '배포가 성공적으로 완료되었습니다.',
          '커피 머신 물 부족 알림.',
          'DB 커넥션 풀이 목마르다고 합니다.',
          '신규 가입자가 폭주하고 있습니다! (희망사항)',
        ]),
        source: 'System',
      })),
      totalCount: 100,
    });
  }),

  // Deployment
  http.get(`${BACKEND_URL}/api/v1/admin/dashboard/deployment`, () => {
    return HttpResponse.json({
      version: 'v1.2.3 (Hotfix)',
      lastDeployedAt: new Date().toISOString(),
      deployedBy: '김인턴',
      environment: 'PRODUCTION',
      status: 'HEALTHY',
    });
  }),
];
