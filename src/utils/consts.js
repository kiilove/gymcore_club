import { v4 as uuidv4 } from "uuid";

export const HEALTH_CLUB_PRODUCTS = {
  개인트레이닝: [
    {
      id: uuidv4(),
      title: "1:1 개인 트레이닝",
      description: "고객의 목표와 체형에 맞춘 맞춤형 지도.",
      isActive: true,
      classes: [
        {
          id: uuidv4(),
          title: "1회 이용권",
          description: "1:1 개인 트레이닝 1회 이용권",
          chargeType: "횟수차감",
          totalSessions: 1,
          duration: null,
          price: 50000, // 예: 50,000원
        },
        {
          id: uuidv4(),
          title: "5회 이용권",
          description: "1:1 개인 트레이닝 5회 이용권",
          chargeType: "횟수차감",
          totalSessions: 5,
          duration: null,
          price: 200000, // 예: 200,000원
        },
        {
          id: uuidv4(),
          title: "10회 이용권",
          description: "1:1 개인 트레이닝 10회 이용권",
          chargeType: "횟수차감",
          totalSessions: 10,
          duration: null,
          price: 380000, // 예: 380,000원
        },
      ],
    },
    {
      id: uuidv4(),
      title: "듀얼 트레이닝 (2:1)",
      description: "친구나 가족과 함께하는 트레이닝.",
      isActive: true,
      classes: [
        {
          id: uuidv4(),
          title: "1회 이용권",
          description: "듀얼 트레이닝 1회 이용권",
          chargeType: "횟수차감",
          totalSessions: 1,
          duration: null,
          price: 70000, // 예: 70,000원
        },
        {
          id: uuidv4(),
          title: "5회 이용권",
          description: "듀얼 트레이닝 5회 이용권",
          chargeType: "횟수차감",
          totalSessions: 5,
          duration: null,
          price: 300000, // 예: 300,000원
        },
      ],
    },
  ],
  그룹클래스: [
    {
      id: uuidv4(),
      title: "요가/필라테스",
      description: "유연성, 정신적 안정 및 체형 개선에 초점.",
      isActive: true,
      classes: [
        {
          id: uuidv4(),
          title: "1회 이용권",
          description: "요가/필라테스 1회 이용권",
          chargeType: "횟수차감",
          totalSessions: 1,
          duration: null,
          price: 15000, // 예: 15,000원
        },
        {
          id: uuidv4(),
          title: "1개월 이용권",
          description: "요가/필라테스 1개월 이용권",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 30,
          price: 90000, // 예: 90,000원
        },
        {
          id: uuidv4(),
          title: "6개월 이용권",
          description: "요가/필라테스 6개월 이용권",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 180,
          price: 500000, // 예: 500,000원
        },
        {
          id: uuidv4(),
          title: "12개월 이용권",
          description: "요가/필라테스 12개월 이용권",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 365,
          price: 900000, // 예: 900,000원
        },
      ],
    },
    {
      id: uuidv4(),
      title: "크로스핏/서킷 트레이닝",
      description: "고강도 운동 프로그램.",
      isActive: true,
      classes: [
        {
          id: uuidv4(),
          title: "1회 체험권",
          description: "크로스핏/서킷 트레이닝 1회 체험권",
          chargeType: "횟수차감",
          totalSessions: 1,
          duration: null,
          price: 20000, // 예: 20,000원
        },
        {
          id: uuidv4(),
          title: "1개월 이용권",
          description: "크로스핏/서킷 트레이닝 1개월 이용권",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 30,
          price: 100000, // 예: 100,000원
        },
        {
          id: uuidv4(),
          title: "6개월 이용권",
          description: "크로스핏/서킷 트레이닝 6개월 이용권",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 180,
          price: 550000, // 예: 550,000원
        },
        {
          id: uuidv4(),
          title: "12개월 이용권",
          description: "크로스핏/서킷 트레이닝 12개월 이용권",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 365,
          price: 1000000, // 예: 1,000,000원
        },
      ],
    },
  ],
  체형교정프로그램: [
    {
      id: uuidv4(),
      title: "재활 트레이닝",
      description: "부상 회복 및 체형 교정을 위한 전문 트레이닝.",
      isActive: true,
      classes: [
        {
          id: uuidv4(),
          title: "1회 이용권",
          description: "재활 트레이닝 1회 이용권",
          chargeType: "횟수차감",
          totalSessions: 1,
          duration: null,
          price: 40000, // 예: 40,000원
        },
        {
          id: uuidv4(),
          title: "5회 이용권",
          description: "재활 트레이닝 5회 이용권",
          chargeType: "횟수차감",
          totalSessions: 5,
          duration: null,
          price: 180000, // 예: 180,000원
        },
      ],
    },
    {
      id: uuidv4(),
      title: "자세 교정",
      description: "일자목, 거북목, 골반 불균형 등을 개선하는 프로그램.",
      isActive: true,
      classes: [
        {
          id: uuidv4(),
          title: "1회 이용권",
          description: "자세 교정 1회 이용권",
          chargeType: "횟수차감",
          totalSessions: 1,
          duration: null,
          price: 35000, // 예: 35,000원
        },
        {
          id: uuidv4(),
          title: "10회 이용권",
          description: "자세 교정 10회 이용권",
          chargeType: "횟수차감",
          totalSessions: 10,
          duration: null,
          price: 320000, // 예: 320,000원
        },
      ],
    },
  ],
  기간이용권: [
    {
      id: uuidv4(),
      title: "헬스장 멤버십",
      description: "일반적인 기구 이용 및 자유로운 운동 공간 제공.",
      isActive: true,
      classes: [
        {
          id: uuidv4(),
          title: "1일 이용권",
          description: "헬스장 1일 이용권 (1회)",
          chargeType: "횟수차감",
          totalSessions: 1,
          duration: null,
          price: 15000, // 예: 15,000원
        },
        {
          id: uuidv4(),
          title: "1개월 이용권",
          description: "헬스장 1개월 이용권",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 30,
          price: 100000, // 예: 100,000원
        },
        {
          id: uuidv4(),
          title: "6개월 이용권",
          description: "헬스장 6개월 이용권",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 180,
          price: 550000, // 예: 550,000원
        },
        {
          id: uuidv4(),
          title: "12개월 이용권",
          description: "헬스장 12개월 이용권",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 365,
          price: 1000000, // 예: 1,000,000원
        },
      ],
    },
    {
      id: uuidv4(),
      title: "VIP 멤버십",
      description: "고급 시설(개인 라커룸, 스파 등)과 트레이너 우선 배정.",
      isActive: true,
      classes: [
        {
          id: uuidv4(),
          title: "1개월 VIP 이용권",
          description: "VIP 멤버십 1개월 이용권",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 30,
          price: 150000, // 예: 150,000원
        },
        {
          id: uuidv4(),
          title: "6개월 VIP 이용권",
          description: "VIP 멤버십 6개월 이용권",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 180,
          price: 800000, // 예: 800,000원
        },
        {
          id: uuidv4(),
          title: "12개월 VIP 이용권",
          description: "VIP 멤버십 12개월 이용권",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 365,
          price: 1500000, // 예: 1,500,000원
        },
      ],
    },
  ],
  스페셜: [
    {
      id: uuidv4(),
      title: "다이어트 캠프",
      description: "체중 감량을 목표로 하는 집중 프로그램.",
      isActive: true,
      classes: [
        {
          id: uuidv4(),
          title: "1일 체험 캠프",
          description: "다이어트 캠프 1일 체험 프로그램",
          chargeType: "횟수차감",
          totalSessions: 1,
          duration: null,
          price: 30000, // 예: 30,000원
        },
        {
          id: uuidv4(),
          title: "2주 집중 캠프",
          description: "다이어트 캠프 2주 집중 프로그램",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 14,
          price: 250000, // 예: 250,000원
        },
      ],
    },
    {
      id: uuidv4(),
      title: "근육 강화 프로그램",
      description: "웨이트 중심의 전문 프로그램.",
      isActive: true,
      classes: [
        {
          id: uuidv4(),
          title: "1회 체험 프로그램",
          description: "근육 강화 프로그램 1회 체험",
          chargeType: "횟수차감",
          totalSessions: 1,
          duration: null,
          price: 30000, // 예: 30,000원
        },
        {
          id: uuidv4(),
          title: "6주 프로그램",
          description: "근육 강화 프로그램 6주 집중 코스",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 42,
          price: 350000, // 예: 350,000원
        },
        {
          id: uuidv4(),
          title: "12주 프로그램",
          description: "근육 강화 프로그램 12주 집중 코스",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 84,
          price: 600000, // 예: 600,000원
        },
      ],
    },
  ],
  식단및컨설팅: [
    {
      id: uuidv4(),
      title: "식단 상담",
      description: "목표에 맞는 영양 상담 및 식단 제공.",
      isActive: true,
      classes: [
        {
          id: uuidv4(),
          title: "1회 식단 상담",
          description: "개별 식단 상담 1회 이용권",
          chargeType: "횟수차감",
          totalSessions: 1,
          duration: null,
          price: 40000, // 예: 40,000원
        },
        {
          id: uuidv4(),
          title: "3회 패키지 상담",
          description: "식단 상담 3회 패키지",
          chargeType: "횟수차감",
          totalSessions: 3,
          duration: null,
          price: 110000, // 예: 110,000원
        },
        {
          id: uuidv4(),
          title: "6회 패키지 상담",
          description: "식단 상담 6회 패키지",
          chargeType: "횟수차감",
          totalSessions: 6,
          duration: null,
          price: 200000, // 예: 200,000원
        },
      ],
    },
    {
      id: uuidv4(),
      title: "체성분 분석",
      description: "체지방률, 근육량 등 상세 분석.",
      isActive: true,
      classes: [
        {
          id: uuidv4(),
          title: "1회 분석",
          description: "체성분 분석 1회 이용권",
          chargeType: "횟수차감",
          totalSessions: 1,
          duration: null,
          price: 50000, // 예: 50,000원
        },
      ],
    },
  ],
  부가서비스: [
    {
      id: uuidv4(),
      title: "마사지 및 스트레칭 서비스",
      description: "운동 후 근육 회복 지원.",
      isActive: true,
      classes: [
        {
          id: uuidv4(),
          title: "1회 마사지 서비스",
          description: "30분 마사지 및 스트레칭 서비스 1회 이용권",
          chargeType: "횟수차감",
          totalSessions: 1,
          duration: null,
          price: 35000, // 예: 35,000원
        },
        {
          id: uuidv4(),
          title: "5회 마사지 패키지",
          description: "30분 마사지 및 스트레칭 서비스 5회 패키지",
          chargeType: "횟수차감",
          totalSessions: 5,
          duration: null,
          price: 150000, // 예: 150,000원
        },
      ],
    },
    {
      id: uuidv4(),
      title: "운동복/운동화 대여",
      description: "고객 편의를 위한 서비스.",
      isActive: true,
      classes: [
        {
          id: uuidv4(),
          title: "1일 대여",
          description: "운동복/운동화 1일 대여",
          chargeType: "횟수차감",
          totalSessions: 1,
          duration: null,
          price: 10000, // 예: 10,000원
        },
        {
          id: uuidv4(),
          title: "1주일 대여",
          description: "운동복/운동화 1주일 대여",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 7,
          price: 50000, // 예: 50,000원
        },
      ],
    },
  ],
  특화프로그램: [
    {
      id: uuidv4(),
      title: "노인 건강 프로그램",
      description: "관절 강화 및 유산소 운동을 통한 노년 건강 관리.",
      isActive: true,
      classes: [
        {
          id: uuidv4(),
          title: "1회 체험 프로그램",
          description: "노인 건강 프로그램 1회 체험",
          chargeType: "횟수차감",
          totalSessions: 1,
          duration: null,
          price: 20000, // 예: 20,000원
        },
        {
          id: uuidv4(),
          title: "1개월 프로그램",
          description: "노인 건강 프로그램 1개월 이용권",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 30,
          price: 80000, // 예: 80,000원
        },
      ],
    },
    {
      id: uuidv4(),
      title: "청소년 피트니스 프로그램",
      description: "성장기 학생을 위한 안전하고 체계적인 트레이닝.",
      isActive: true,
      classes: [
        {
          id: uuidv4(),
          title: "1회 체험 프로그램",
          description: "청소년 피트니스 프로그램 1회 체험",
          chargeType: "횟수차감",
          totalSessions: 1,
          duration: null,
          price: 25000, // 예: 25,000원
        },
        {
          id: uuidv4(),
          title: "1개월 프로그램",
          description: "청소년 피트니스 프로그램 1개월 이용권",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 30,
          price: 90000, // 예: 90,000원
        },
      ],
    },
  ],
  온라인상품: [
    {
      id: uuidv4(),
      title: "온라인 PT",
      description: "비대면 1:1 트레이닝으로 집에서도 전문 코칭 제공.",
      isActive: true,
      classes: [
        {
          id: uuidv4(),
          title: "1회 온라인 PT",
          description: "온라인 PT 1회 이용권",
          chargeType: "횟수차감",
          totalSessions: 1,
          duration: null,
          price: 40000, // 예: 40,000원
        },
        {
          id: uuidv4(),
          title: "5회 온라인 PT",
          description: "온라인 PT 5회 이용권",
          chargeType: "횟수차감",
          totalSessions: 5,
          duration: null,
          price: 180000, // 예: 180,000원
        },
        {
          id: uuidv4(),
          title: "10회 온라인 PT",
          description: "온라인 PT 10회 이용권",
          chargeType: "횟수차감",
          totalSessions: 10,
          duration: null,
          price: 320000, // 예: 320,000원
        },
      ],
    },
    {
      id: uuidv4(),
      title: "홈트 클래스",
      description: "가정에서 참여할 수 있는 다양한 운동 클래스.",
      isActive: true,
      classes: [
        {
          id: uuidv4(),
          title: "1회 홈트 클래스",
          description: "홈트 클래스 1회 이용권",
          chargeType: "횟수차감",
          totalSessions: 1,
          duration: null,
          price: 25000, // 예: 25,000원
        },
        {
          id: uuidv4(),
          title: "1개월 홈트 클래스",
          description: "홈트 클래스 1개월 이용권",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 30,
          price: 80000, // 예: 80,000원
        },
        {
          id: uuidv4(),
          title: "6개월 홈트 클래스",
          description: "홈트 클래스 6개월 이용권",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 180,
          price: 400000, // 예: 400,000원
        },
      ],
    },
  ],
};
