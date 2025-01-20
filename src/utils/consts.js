import { v4 as uuidv4 } from "uuid";
export const HEALTH_CLUB_PRODUCTS = {
  개인트레이닝: [
    {
      id: uuidv4(),
      title: "1:1 개인 트레이닝",
      description: "고객의 목표와 체형에 맞춘 맞춤형 지도.",
    },
    {
      id: uuidv4(),
      title: "듀얼 트레이닝 (2:1)",
      description: "친구나 가족과 함께하는 트레이닝.",
    },
    {
      id: uuidv4(),
      title: "소그룹 트레이닝 (3~5명)",
      description: "소규모 그룹으로 진행하는 트레이닝.",
    },
  ],
  그룹클래스: [
    {
      id: uuidv4(),
      title: "요가/필라테스",
      description: "유연성, 정신적 안정 및 체형 개선에 초점.",
    },
    {
      id: uuidv4(),
      title: "크로스핏/서킷 트레이닝",
      description: "고강도 운동 프로그램.",
    },
    {
      id: uuidv4(),
      title: "댄스 클래스",
      description: "줌바, K-POP 댄스, 힙합 등 다양한 스타일의 댄스 수업.",
    },
    {
      id: uuidv4(),
      title: "스피닝 클래스",
      description: "자전거 기반 유산소 운동.",
    },
  ],
  체형교정프로그램: [
    {
      id: uuidv4(),
      title: "재활 트레이닝",
      description: "부상 회복 및 체형 교정을 위한 전문 트레이닝.",
    },
    {
      id: uuidv4(),
      title: "자세 교정",
      description: "일자목, 거북목, 골반 불균형 등을 개선하는 프로그램.",
    },
    {
      id: uuidv4(),
      title: "기능성 트레이닝",
      description: "신체의 기능적 움직임을 개선하는 훈련.",
    },
  ],
  기간이용권: [
    {
      id: uuidv4(),
      title: "헬스장 멤버십",
      description: "일반적인 기구 이용권.",
    },
    {
      id: uuidv4(),
      title: "VIP 멤버십",
      description: "고급 시설(개인 라커룸, 스파 등)과 트레이너 우선 배정.",
    },
    {
      id: uuidv4(),
      title: "단기 이용권",
      description: "일일, 주간, 월간 등 단기 이용 고객을 위한 옵션.",
    },
  ],
  스페셜: [
    {
      id: uuidv4(),
      title: "다이어트 캠프",
      description: "체중 감량을 목표로 하는 집중 프로그램.",
    },
    {
      id: uuidv4(),
      title: "근육 강화 프로그램",
      description: "웨이트 중심의 전문 프로그램.",
    },
    {
      id: uuidv4(),
      title: "바디 프로필 준비 프로그램",
      description: "사진 촬영을 위한 체형 관리 프로그램.",
    },
  ],
  식단및컨설팅: [
    {
      id: uuidv4(),
      title: "식단 상담",
      description: "목표에 맞는 영양 상담 및 식단 제공.",
    },
    {
      id: uuidv4(),
      title: "보충제 추천",
      description: "단백질, 비타민 등 보충제 이용 가이드.",
    },
    {
      id: uuidv4(),
      title: "체성분 분석",
      description: "체지방률, 근육량 등 상세 분석.",
    },
  ],
  부가서비스: [
    {
      id: uuidv4(),
      title: "마사지 및 스트레칭 서비스",
      description: "운동 후 근육 회복 지원.",
    },
    {
      id: uuidv4(),
      title: "스파/사우나 시설",
      description: "운동 후 휴식을 위한 서비스.",
    },
    {
      id: uuidv4(),
      title: "운동복/운동화 대여",
      description: "고객 편의를 위한 서비스.",
    },
    {
      id: uuidv4(),
      title: "인바디 측정",
      description: "주기적으로 체성분 분석 제공.",
    },
  ],
  특화프로그램: [
    {
      id: uuidv4(),
      title: "노인 건강 프로그램",
      description: "관절 강화, 유산소 운동.",
    },
    {
      id: uuidv4(),
      title: "산후 회복 프로그램",
      description: "산모의 건강 회복 및 체형 관리.",
    },
    {
      id: uuidv4(),
      title: "청소년 피트니스 프로그램",
      description: "성장기 학생을 위한 안전한 트레이닝.",
    },
  ],
  온라인상품: [
    { id: uuidv4(), title: "온라인 PT", description: "비대면 1:1 트레이닝." },
    {
      id: uuidv4(),
      title: "홈트 클래스",
      description: "가정에서 운동할 수 있도록 돕는 프로그램.",
    },
    {
      id: uuidv4(),
      title: "운동 영상/앱 서비스",
      description: "운동 루틴을 제공하는 구독형 서비스.",
    },
  ],
};
