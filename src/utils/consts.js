import { v4 as uuidv4 } from "uuid";

export const HEALTH_CLUB_PRODUCTS = {
  개인트레이닝: [
    {
      id: uuidv4(),
      title: "1:1 개인 트레이닝",
      description: "고객의 목표와 체형에 맞춘 맞춤형 지도.",
      classes: [
        {
          id: uuidv4(),
          title: "5회권",
          description: "1:1 개인 트레이닝 5회권",
          chargeType: "횟수차감",
          totalSessions: 5,
          duration: null,
        },
        {
          id: uuidv4(),
          title: "10회권",
          description: "1:1 개인 트레이닝 10회권",
          chargeType: "횟수차감",
          totalSessions: 10,
          duration: null,
        },
      ],
    },
    {
      id: uuidv4(),
      title: "듀얼 트레이닝 (2:1)",
      description: "친구나 가족과 함께하는 트레이닝.",
      classes: [
        {
          id: uuidv4(),
          title: "5회권",
          description: "듀얼 트레이닝 5회권",
          chargeType: "횟수차감",
          totalSessions: 5,
          duration: null,
        },
      ],
    },
  ],
  그룹클래스: [
    {
      id: uuidv4(),
      title: "요가/필라테스",
      description: "유연성, 정신적 안정 및 체형 개선에 초점.",
      classes: [
        {
          id: uuidv4(),
          title: "1개월 이용권",
          description: "요가/필라테스 1개월 이용권",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 30,
        },
      ],
    },
    {
      id: uuidv4(),
      title: "크로스핏/서킷 트레이닝",
      description: "고강도 운동 프로그램.",
      classes: [],
    },
  ],
  체형교정프로그램: [
    {
      id: uuidv4(),
      title: "재활 트레이닝",
      description: "부상 회복 및 체형 교정을 위한 전문 트레이닝.",
      classes: [],
    },
    {
      id: uuidv4(),
      title: "자세 교정",
      description: "일자목, 거북목, 골반 불균형 등을 개선하는 프로그램.",
      classes: [],
    },
  ],
  기간이용권: [
    {
      id: uuidv4(),
      title: "헬스장 멤버십",
      description: "일반적인 기구 이용권.",
      classes: [
        {
          id: uuidv4(),
          title: "1개월 멤버십",
          description: "헬스장 멤버십 1개월 이용권",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 30,
        },
        {
          id: uuidv4(),
          title: "3개월 멤버십",
          description: "헬스장 멤버십 3개월 이용권",
          chargeType: "기간차감",
          totalSessions: null,
          duration: 90,
        },
      ],
    },
    {
      id: uuidv4(),
      title: "VIP 멤버십",
      description: "고급 시설(개인 라커룸, 스파 등)과 트레이너 우선 배정.",
      classes: [],
    },
  ],
  스페셜: [
    {
      id: uuidv4(),
      title: "다이어트 캠프",
      description: "체중 감량을 목표로 하는 집중 프로그램.",
      classes: [],
    },
    {
      id: uuidv4(),
      title: "근육 강화 프로그램",
      description: "웨이트 중심의 전문 프로그램.",
      classes: [],
    },
  ],
  식단및컨설팅: [
    {
      id: uuidv4(),
      title: "식단 상담",
      description: "목표에 맞는 영양 상담 및 식단 제공.",
      classes: [],
    },
    {
      id: uuidv4(),
      title: "체성분 분석",
      description: "체지방률, 근육량 등 상세 분석.",
      classes: [],
    },
  ],
  부가서비스: [
    {
      id: uuidv4(),
      title: "마사지 및 스트레칭 서비스",
      description: "운동 후 근육 회복 지원.",
      classes: [],
    },
    {
      id: uuidv4(),
      title: "운동복/운동화 대여",
      description: "고객 편의를 위한 서비스.",
      classes: [],
    },
  ],
  특화프로그램: [
    {
      id: uuidv4(),
      title: "노인 건강 프로그램",
      description: "관절 강화, 유산소 운동.",
      classes: [],
    },
    {
      id: uuidv4(),
      title: "청소년 피트니스 프로그램",
      description: "성장기 학생을 위한 안전한 트레이닝.",
      classes: [],
    },
  ],
  온라인상품: [
    {
      id: uuidv4(),
      title: "온라인 PT",
      description: "비대면 1:1 트레이닝.",
      classes: [
        {
          id: uuidv4(),
          title: "온라인 5회권",
          description: "온라인 PT 5회권",
          chargeType: "횟수차감",
          totalSessions: 5,
          duration: null,
        },
      ],
    },
    {
      id: uuidv4(),
      title: "홈트 클래스",
      description: "가정에서 운동할 수 있도록 돕는 프로그램.",
      classes: [],
    },
  ],
};
