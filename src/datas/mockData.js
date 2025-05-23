// 회원 데이터
export const members = [
  {
    id: 1,
    name: "김민수",
    gender: "남성",
    age: 28,
    phone: "010-1234-5678",
    email: "minsu@example.com",
    membershipType: "1년 정기권",
    startDate: "2023-01-15",
    endDate: "2024-01-14",
    status: "active",
    bodyInfo: {
      height: 178,
      weight: 75,
      bmi: 23.7,
      bodyFat: 18,
      history: [
        { date: "2023-01-15", weight: 78, bodyFat: 20 },
        { date: "2023-03-15", weight: 76, bodyFat: 19 },
        { date: "2023-06-15", weight: 75, bodyFat: 18 },
      ],
    },
    consultations: [
      { date: "2023-01-15", note: "초기 상담: 체중 감량 목표" },
      { date: "2023-03-15", note: "진행 상황 양호, 식단 조정 필요" },
      { date: "2023-06-15", note: "목표 체중에 근접, 유지 프로그램 논의" },
    ],
  },
  {
    id: 2,
    name: "이지연",
    gender: "여성",
    age: 32,
    phone: "010-2345-6789",
    email: "jiyeon@example.com",
    membershipType: "6개월 정기권",
    startDate: "2023-03-10",
    endDate: "2023-09-09",
    status: "active",
    bodyInfo: {
      height: 165,
      weight: 55,
      bmi: 20.2,
      bodyFat: 22,
      history: [
        { date: "2023-03-10", weight: 58, bodyFat: 24 },
        { date: "2023-05-10", weight: 56, bodyFat: 23 },
        { date: "2023-07-10", weight: 55, bodyFat: 22 },
      ],
    },
    consultations: [
      { date: "2023-03-10", note: "초기 상담: 근력 향상 목표" },
      { date: "2023-05-10", note: "상체 근력 향상 중, 하체 운동 추가 필요" },
      { date: "2023-07-10", note: "전반적인 근력 향상, 유산소 운동 추가 권장" },
    ],
  },
  {
    id: 3,
    name: "박준호",
    gender: "남성",
    age: 45,
    phone: "010-3456-7890",
    email: "junho@example.com",
    membershipType: "3개월 정기권",
    startDate: "2023-05-20",
    endDate: "2023-08-19",
    status: "expired",
    bodyInfo: {
      height: 175,
      weight: 82,
      bmi: 26.8,
      bodyFat: 25,
      history: [
        { date: "2023-05-20", weight: 85, bodyFat: 27 },
        { date: "2023-06-20", weight: 83, bodyFat: 26 },
        { date: "2023-07-20", weight: 82, bodyFat: 25 },
      ],
    },
    consultations: [
      { date: "2023-05-20", note: "초기 상담: 건강 관리 및 체중 감량 목표" },
      { date: "2023-06-20", note: "혈압 개선 중, 유산소 운동 강화 필요" },
      { date: "2023-07-20", note: "전반적인 건강 지표 개선, 회원권 연장 논의" },
    ],
  },
  {
    id: 4,
    name: "최수진",
    gender: "여성",
    age: 27,
    phone: "010-4567-8901",
    email: "sujin@example.com",
    membershipType: "1개월 정기권",
    startDate: "2023-07-05",
    endDate: "2023-08-04",
    status: "active",
    bodyInfo: {
      height: 162,
      weight: 50,
      bmi: 19.1,
      bodyFat: 20,
      history: [{ date: "2023-07-05", weight: 50, bodyFat: 20 }],
    },
    consultations: [
      { date: "2023-07-05", note: "초기 상담: 체력 향상 및 근력 강화 목표" },
    ],
  },
  {
    id: 5,
    name: "정민우",
    gender: "남성",
    age: 35,
    phone: "010-5678-9012",
    email: "minwoo@example.com",
    membershipType: "1년 정기권",
    startDate: "2022-12-01",
    endDate: "2023-11-30",
    status: "active",
    bodyInfo: {
      height: 180,
      weight: 78,
      bmi: 24.1,
      bodyFat: 19,
      history: [
        { date: "2022-12-01", weight: 83, bodyFat: 23 },
        { date: "2023-02-01", weight: 80, bodyFat: 21 },
        { date: "2023-04-01", weight: 78, bodyFat: 19 },
      ],
    },
    consultations: [
      { date: "2022-12-01", note: "초기 상담: 체형 개선 목표" },
      { date: "2023-02-01", note: "상체 근육량 증가, 하체 운동 강화 필요" },
      {
        date: "2023-04-01",
        note: "균형 잡힌 체형으로 개선 중, 식단 조정 필요",
      },
    ],
  },
];

// 코치 데이터
export const coaches = [
  {
    id: 1,
    name: "강태준",
    gender: "남성",
    age: 32,
    phone: "010-9876-5432",
    email: "taejun@example.com",
    specialty: ["웨이트 트레이닝", "보디빌딩"],
    hireDate: "2022-03-15",
    status: "active",
    experience: [
      {
        period: "2018-2022",
        company: "피트니스 월드",
        position: "시니어 트레이너",
      },
      { period: "2015-2018", company: "헬스 허브", position: "트레이너" },
    ],
    certifications: [
      { name: "NSCA-CPT", issueDate: "2015-05-10", institution: "NSCA" },
      {
        name: "생활스포츠지도사 2급",
        issueDate: "2014-03-20",
        institution: "국민체육진흥공단",
      },
    ],
    bodyInfo: {
      height: 182,
      weight: 85,
      bodyFat: 12,
      musclePercentage: 45,
    },
    profileImage:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    workSchedule: {
      monday: { isWorking: true, startTime: "09:00", endTime: "18:00" },
      tuesday: { isWorking: true, startTime: "09:00", endTime: "18:00" },
      wednesday: { isWorking: true, startTime: "09:00", endTime: "18:00" },
      thursday: { isWorking: true, startTime: "09:00", endTime: "18:00" },
      friday: { isWorking: true, startTime: "09:00", endTime: "18:00" },
      saturday: { isWorking: false, startTime: "09:00", endTime: "13:00" },
      sunday: { isWorking: false, startTime: "", endTime: "" },
    },
  },
  {
    id: 2,
    name: "이미라",
    gender: "여성",
    age: 29,
    phone: "010-8765-4321",
    email: "mira@example.com",
    specialty: ["요가", "필라테스", "스트레칭"],
    hireDate: "2022-06-10",
    status: "active",
    experience: [
      { period: "2019-2022", company: "요가 스튜디오", position: "요가 강사" },
      {
        period: "2017-2019",
        company: "웰니스 센터",
        position: "필라테스 강사",
      },
    ],
    certifications: [
      {
        name: "요가 지도자 자격증",
        issueDate: "2017-02-15",
        institution: "대한요가협회",
      },
      {
        name: "필라테스 지도자 자격증",
        issueDate: "2018-07-22",
        institution: "국제필라테스협회",
      },
    ],
    bodyInfo: {
      height: 168,
      weight: 52,
      bodyFat: 18,
      musclePercentage: 32,
    },
    profileImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    workSchedule: {
      monday: { isWorking: true, startTime: "10:00", endTime: "19:00" },
      tuesday: { isWorking: true, startTime: "10:00", endTime: "19:00" },
      wednesday: { isWorking: true, startTime: "10:00", endTime: "19:00" },
      thursday: { isWorking: true, startTime: "10:00", endTime: "19:00" },
      friday: { isWorking: true, startTime: "10:00", endTime: "19:00" },
      saturday: { isWorking: true, startTime: "10:00", endTime: "15:00" },
      sunday: { isWorking: false, startTime: "", endTime: "" },
    },
  },
  {
    id: 3,
    name: "박성훈",
    gender: "남성",
    age: 35,
    phone: "010-7654-3210",
    email: "sunghoon@example.com",
    specialty: ["퍼스널 트레이닝", "기능성 트레이닝", "재활 운동"],
    hireDate: "2021-11-05",
    status: "active",
    experience: [
      {
        period: "2016-2021",
        company: "스포츠 메디컬 센터",
        position: "재활 트레이너",
      },
      { period: "2013-2016", company: "피트니스 클럽", position: "트레이너" },
    ],
    certifications: [
      { name: "ACSM-CPT", issueDate: "2013-09-30", institution: "ACSM" },
      {
        name: "운동처방사",
        issueDate: "2016-04-15",
        institution: "대한운동사협회",
      },
    ],
    bodyInfo: {
      height: 175,
      weight: 72,
      bodyFat: 15,
      musclePercentage: 40,
    },
    profileImage:
      "https://images.unsplash.com/photo-1567013127542-490d757e6349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    workSchedule: {
      monday: { isWorking: true, startTime: "08:00", endTime: "17:00" },
      tuesday: { isWorking: true, startTime: "08:00", endTime: "17:00" },
      wednesday: { isWorking: true, startTime: "08:00", endTime: "17:00" },
      thursday: { isWorking: true, startTime: "08:00", endTime: "17:00" },
      friday: { isWorking: true, startTime: "08:00", endTime: "17:00" },
      saturday: { isWorking: false, startTime: "", endTime: "" },
      sunday: { isWorking: false, startTime: "", endTime: "" },
    },
  },
];

// 상품 데이터
export const products = [
  {
    id: 1,
    name: "1개월 회원권",
    category: "회원권",
    price: 100000,
    description: "기본 시설 이용 가능한 1개월 회원권",
    duration: 30, // 일 단위
    features: ["헬스장 이용", "샤워 시설", "락커 이용"],
    isPopular: false,
    status: "active",
  },
  {
    id: 2,
    name: "3개월 회원권",
    category: "회원권",
    price: 270000,
    description: "기본 시설 이용 가능한 3개월 회원권 (10% 할인)",
    duration: 90, // 일 단위
    features: ["헬스장 이용", "샤워 시설", "락커 이용", "타월 서비스"],
    isPopular: true,
    status: "active",
  },
  {
    id: 3,
    name: "6개월 회원권",
    category: "회원권",
    price: 480000,
    description: "기본 시설 이용 가능한 6개월 회원권 (20% 할인)",
    duration: 180, // 일 단위
    features: [
      "헬스장 이용",
      "샤워 시설",
      "락커 이용",
      "타월 서비스",
      "체성분 분석 2회",
    ],
    isPopular: false,
    status: "active",
  },
  {
    id: 4,
    name: "1년 회원권",
    category: "회원권",
    price: 840000,
    description: "기본 시설 이용 가능한 1년 회원권 (30% 할인)",
    duration: 365, // 일 단위
    features: [
      "헬스장 이용",
      "샤워 시설",
      "락커 이용",
      "타월 서비스",
      "체성분 분석 4회",
      "운동 프로그램 1회",
    ],
    isPopular: false,
    status: "active",
  },
  {
    id: 5,
    name: "10회 PT 이용권",
    category: "PT",
    price: 400000,
    description: "전문 트레이너의 1:1 퍼스널 트레이닝 10회",
    duration: null,
    features: ["1:1 맞춤 트레이닝", "체성분 분석", "식단 상담"],
    isPopular: false,
    status: "active",
  },
  {
    id: 6,
    name: "20회 PT 이용권",
    category: "PT",
    price: 700000,
    description: "전문 트레이너의 1:1 퍼스널 트레이닝 20회 (12.5% 할인)",
    duration: null,
    features: [
      "1:1 맞춤 트레이닝",
      "체성분 분석",
      "식단 상담",
      "운동 프로그램 제공",
    ],
    isPopular: true,
    status: "active",
  },
  {
    id: 7,
    name: "30회 PT 이용권",
    category: "PT",
    price: 900000,
    description: "전문 트레이너의 1:1 퍼스널 트레이닝 30회 (25% 할인)",
    duration: null,
    features: [
      "1:1 맞춤 트레이닝",
      "체성분 분석",
      "식단 상담",
      "운동 프로그램 제공",
      "영양제 상담",
    ],
    isPopular: false,
    status: "active",
  },
];

// 결제 데이터
export const payments = [
  {
    id: 1,
    memberId: 1,
    memberName: "김민수",
    productId: 4,
    productName: "1년 회원권",
    amount: 840000,
    paymentDate: "2023-01-15",
    paymentMethod: "신용카드",
    status: "completed",
  },
  {
    id: 2,
    memberId: 2,
    memberName: "이지연",
    productId: 3,
    productName: "6개월 회원권",
    amount: 480000,
    paymentDate: "2023-03-10",
    paymentMethod: "계좌이체",
    status: "completed",
  },
  {
    id: 3,
    memberId: 3,
    memberName: "박준호",
    productId: 2,
    productName: "3개월 회원권",
    amount: 270000,
    paymentDate: "2023-05-20",
    paymentMethod: "신용카드",
    status: "completed",
  },
  {
    id: 4,
    memberId: 4,
    memberName: "최수진",
    productId: 1,
    productName: "1개월 회원권",
    amount: 100000,
    paymentDate: "2023-07-05",
    paymentMethod: "현금",
    status: "completed",
  },
  {
    id: 5,
    memberId: 5,
    memberName: "정민우",
    productId: 4,
    productName: "1년 회원권",
    amount: 840000,
    paymentDate: "2022-12-01",
    paymentMethod: "신용카드",
    status: "completed",
  },
  {
    id: 6,
    memberId: 2,
    memberName: "이지연",
    productId: 6,
    productName: "20회 PT 이용권",
    amount: 700000,
    paymentDate: "2023-04-15",
    paymentMethod: "신용카드",
    status: "completed",
  },
  {
    id: 7,
    memberId: 1,
    memberName: "김민수",
    productId: 5,
    productName: "10회 PT 이용권",
    amount: 400000,
    paymentDate: "2023-02-10",
    paymentMethod: "계좌이체",
    status: "completed",
  },
];

// 음악 데이터
export const music = [
  {
    id: 1,
    title: "일반부 트레이닝 음악",
    artist: "GymCore Music",
    duration: "45:30",
    category: "일반부",
    bpm: 128,
    coverImage:
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tracks: [
      {
        id: "track1",
        title: "Built Like a Dream (Cover)",
        duration: "5:20",
        url: "https://firebasestorage.googleapis.com/v0/b/bdbdgmain.appspot.com/o/mp3%2F%EC%9D%BC%EB%B0%98%EB%B6%80%2FBuilt%20Like%20a%20Dream%20(Cover).mp3?alt=media&token=51921ebe-7eb8-41ba-93ef-28b2babf2eca",
      },
      {
        id: "track2",
        title: "Iron Muscles",
        duration: "4:45",
        url: "https://firebasestorage.googleapis.com/v0/b/bdbdgmain.appspot.com/o/mp3%2F%EC%9D%BC%EB%B0%98%EB%B6%80%2FIron%20Muscles.mp3?alt=media&token=d4217a2b-0b53-4506-9d28-1b0c4d45d863",
      },
    ],
  },
  {
    id: 2,
    title: "학생부 트레이닝 음악",
    artist: "GymCore Music",
    duration: "60:00",
    category: "학생부",
    bpm: 70,
    coverImage:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tracks: [
      {
        id: "track3",
        title: "고등학교 보디빌더 이야기",
        duration: "10:30",
        url: "https://firebasestorage.googleapis.com/v0/b/bdbdgmain.appspot.com/o/mp3%2F%ED%95%99%EC%83%9D%EB%B6%80%2F%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90%20%EB%B3%B4%EB%94%94%EB%B9%8C%EB%8D%94%20%EC%9D%B4%EC%95%BC%EA%B8%B0.mp3?alt=media&token=95013eba-ce2e-43ed-8468-fb148fc0d635",
      },
      {
        id: "track4",
        title: "Iron School Chronicles",
        duration: "15:20",
        url: "https://firebasestorage.googleapis.com/v0/b/bdbdgmain.appspot.com/o/mp3%2F%ED%95%99%EC%83%9D%EB%B6%80%2FIron%20School%20Chronicles.mp3?alt=media&token=da098edc-d522-4a01-bc54-600841e30641",
      },
    ],
  },
  {
    id: 3,
    title: "비키니 트레이닝 음악",
    artist: "GymCore Music",
    duration: "30:00",
    category: "비키니",
    bpm: 140,
    coverImage:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tracks: [
      {
        id: "track5",
        title: "편견을 넘어 (Cover)",
        duration: "8:15",
        url: "https://firebasestorage.googleapis.com/v0/b/bdbdgmain.appspot.com/o/mp3%2F%EB%B9%84%ED%82%A4%EB%8B%88%2F%ED%8E%B8%EA%B2%AC%EC%9D%84%20%EB%84%98%EC%96%B4%20(Cover)%20(2).mp3?alt=media&token=f5498509-e3d1-4175-9b08-9e339bf77e18",
      },
      {
        id: "track6",
        title: "몸매의 여신",
        duration: "12:30",
        url: "https://firebasestorage.googleapis.com/v0/b/bdbdgmain.appspot.com/o/mp3%2F%EB%B9%84%ED%82%A4%EB%8B%88%2F%EB%AA%B8%EB%A7%A4%EC%9D%98%20%EC%97%AC%EC%8B%A0.mp3?alt=media&token=90d40c77-1a7d-4d9b-9762-9b165afa0816",
      },
      {
        id: "track7",
        title: "비키니 여왕",
        duration: "9:15",
        url: "https://firebasestorage.googleapis.com/v0/b/bdbdgmain.appspot.com/o/mp3%2F%EB%B9%84%ED%82%A4%EB%8B%88%2F%EB%B9%84%ED%82%A4%EB%8B%88%20%EC%97%AC%EC%99%95.mp3?alt=media&token=ed5951c9-aa1a-4be2-8cc7-3805e524ac97",
      },
    ],
  },
];

// 대시보드 통계 데이터
export const dashboardStats = {
  totalMembers: 120,
  activeMembers: 98,
  newMembersThisMonth: 12,
  totalCoaches: 8,
  totalRevenue: 24500000,
  revenueThisMonth: 3200000,
  popularProducts: [
    { id: 2, name: "3개월 회원권", sales: 28 },
    { id: 6, name: "20회 PT 이용권", sales: 15 },
    { id: 4, name: "1년 회원권", sales: 10 },
  ],
  membershipExpiringSoon: [
    { id: 3, name: "박준호", endDate: "2023-08-19" },
    { id: 4, name: "최수진", endDate: "2023-08-04" },
  ],
  recentPayments: [
    {
      id: 4,
      memberName: "최수진",
      productName: "1개월 회원권",
      amount: 100000,
      date: "2023-07-05",
    },
    {
      id: 6,
      memberName: "이지연",
      productName: "20회 PT 이용권",
      amount: 700000,
      date: "2023-04-15",
    },
  ],
  memberAttendance: {
    labels: ["월", "화", "수", "목", "금", "토", "일"],
    data: [45, 52, 49, 60, 55, 40, 30],
  },
  revenueByMonth: {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월"],
    data: [2100000, 1900000, 2300000, 2500000, 2700000, 3000000, 3200000],
  },
};
