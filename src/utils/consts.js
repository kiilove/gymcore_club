import { v4 as uuidv4 } from "uuid";

export const HEALTH_CLUB_PRODUCTS = {
  // 개인트레이닝 카테고리: 기존 "1:1 개인 트레이닝"과 "듀얼 트레이닝 (2:1)"를 통합
  개인트레이닝: {
    id: uuidv4(),
    classes: [
      // 1:1 개인 트레이닝
      {
        id: uuidv4(),
        title: "1:1 개인 트레이닝 - 1회 이용권",
        description:
          "고객의 목표와 체형에 맞춘 맞춤형 지도. 1:1 개인 트레이닝 1회 이용권",
        chargeType: "횟수차감",
        totalSessions: 1,
        duration: null,
        isActive: true,
        price: 50000,
      },
      {
        id: uuidv4(),
        title: "1:1 개인 트레이닝 - 5회 이용권",
        description:
          "고객의 목표와 체형에 맞춘 맞춤형 지도. 1:1 개인 트레이닝 5회 이용권",
        chargeType: "횟수차감",
        totalSessions: 5,
        duration: null,
        isActive: true,
        price: 200000,
      },
      {
        id: uuidv4(),
        title: "1:1 개인 트레이닝 - 10회 이용권",
        description:
          "고객의 목표와 체형에 맞춘 맞춤형 지도. 1:1 개인 트레이닝 10회 이용권",
        chargeType: "횟수차감",
        totalSessions: 10,
        duration: null,
        isActive: true,
        price: 380000,
      },
      // 듀얼 트레이닝 (2:1)
      {
        id: uuidv4(),
        title: "듀얼 트레이닝 (2:1) - 1회 이용권",
        description:
          "친구나 가족과 함께하는 트레이닝. 듀얼 트레이닝 1회 이용권",
        chargeType: "횟수차감",
        totalSessions: 1,
        duration: null,
        isActive: true,
        price: 70000,
      },
      {
        id: uuidv4(),
        title: "듀얼 트레이닝 (2:1) - 5회 이용권",
        description:
          "친구나 가족과 함께하는 트레이닝. 듀얼 트레이닝 5회 이용권",
        chargeType: "횟수차감",
        totalSessions: 5,
        duration: null,
        isActive: true,
        price: 300000,
      },
    ],
  },

  // 그룹클래스 카테고리: "요가/필라테스"와 "크로스핏/서킷 트레이닝" 통합
  그룹클래스: {
    id: uuidv4(),
    classes: [
      // 요가/필라테스
      {
        id: uuidv4(),
        title: "요가/필라테스 - 1회 이용권",
        description:
          "유연성, 정신적 안정 및 체형 개선. 요가/필라테스 1회 이용권",
        chargeType: "횟수차감",
        totalSessions: 1,
        duration: null,
        isActive: true,
        price: 15000,
      },
      {
        id: uuidv4(),
        title: "요가/필라테스 - 1개월 이용권",
        description:
          "유연성, 정신적 안정 및 체형 개선. 요가/필라테스 1개월 이용권",
        chargeType: "기간차감",
        totalSessions: null,
        duration: 30,
        isActive: true,
        price: 90000,
      },
      {
        id: uuidv4(),
        title: "요가/필라테스 - 6개월 이용권",
        description:
          "유연성, 정신적 안정 및 체형 개선. 요가/필라테스 6개월 이용권",
        chargeType: "기간차감",
        totalSessions: null,
        duration: 180,
        isActive: true,
        price: 500000,
      },
      {
        id: uuidv4(),
        title: "요가/필라테스 - 12개월 이용권",
        description:
          "유연성, 정신적 안정 및 체형 개선. 요가/필라테스 12개월 이용권",
        chargeType: "기간차감",
        totalSessions: null,
        duration: 365,
        isActive: true,
        price: 900000,
      },
      // 크로스핏/서킷 트레이닝
      {
        id: uuidv4(),
        title: "크로스핏/서킷 트레이닝 - 1회 체험권",
        description: "고강도 운동 프로그램. 크로스핏/서킷 트레이닝 1회 체험권",
        chargeType: "횟수차감",
        totalSessions: 1,
        duration: null,
        isActive: true,
        price: 20000,
      },
      {
        id: uuidv4(),
        title: "크로스핏/서킷 트레이닝 - 1개월 이용권",
        description:
          "고강도 운동 프로그램. 크로스핏/서킷 트레이닝 1개월 이용권",
        chargeType: "기간차감",
        totalSessions: null,
        duration: 30,
        isActive: true,
        price: 100000,
      },
      {
        id: uuidv4(),
        title: "크로스핏/서킷 트레이닝 - 6개월 이용권",
        description:
          "고강도 운동 프로그램. 크로스핏/서킷 트레이닝 6개월 이용권",
        chargeType: "기간차감",
        totalSessions: null,
        duration: 180,
        isActive: true,
        price: 550000,
      },
      {
        id: uuidv4(),
        title: "크로스핏/서킷 트레이닝 - 12개월 이용권",
        description:
          "고강도 운동 프로그램. 크로스핏/서킷 트레이닝 12개월 이용권",
        chargeType: "기간차감",
        totalSessions: null,
        duration: 365,
        isActive: true,
        price: 1000000,
      },
    ],
  },

  // 체형교정프로그램: "재활 트레이닝"과 "자세 교정" 통합
  체형교정프로그램: {
    id: uuidv4(),
    classes: [
      // 재활 트레이닝
      {
        id: uuidv4(),
        title: "재활 트레이닝 - 1회 이용권",
        description:
          "부상 회복 및 체형 교정을 위한 전문 트레이닝. 재활 트레이닝 1회 이용권",
        chargeType: "횟수차감",
        totalSessions: 1,
        duration: null,
        isActive: true,
        price: 40000,
      },
      {
        id: uuidv4(),
        title: "재활 트레이닝 - 5회 이용권",
        description:
          "부상 회복 및 체형 교정을 위한 전문 트레이닝. 재활 트레이닝 5회 이용권",
        chargeType: "횟수차감",
        totalSessions: 5,
        duration: null,
        isActive: true,
        price: 180000,
      },
      // 자세 교정
      {
        id: uuidv4(),
        title: "자세 교정 - 1회 이용권",
        description: "일자목, 거북목, 골반 불균형 개선. 자세 교정 1회 이용권",
        chargeType: "횟수차감",
        totalSessions: 1,
        duration: null,
        isActive: true,
        price: 35000,
      },
      {
        id: uuidv4(),
        title: "자세 교정 - 10회 이용권",
        description: "일자목, 거북목, 골반 불균형 개선. 자세 교정 10회 이용권",
        chargeType: "횟수차감",
        totalSessions: 10,
        duration: null,
        isActive: true,
        price: 320000,
      },
    ],
  },

  // 기간이용권: "헬스장 멤버십"과 "VIP 멤버십" 통합
  기간이용권: {
    id: uuidv4(),
    classes: [
      // 헬스장 멤버십
      {
        id: uuidv4(),
        title: "헬스장 멤버십 - 1일 이용권",
        description:
          "일반적인 기구 이용 및 자유로운 운동 공간 제공. 헬스장 1일 이용권 (1회)",
        chargeType: "횟수차감",
        totalSessions: 1,
        duration: null,
        isActive: true,
        price: 15000,
      },
      {
        id: uuidv4(),
        title: "헬스장 멤버십 - 1개월 이용권",
        description:
          "일반적인 기구 이용 및 자유로운 운동 공간 제공. 헬스장 1개월 이용권",
        chargeType: "기간차감",
        totalSessions: null,
        duration: 30,
        isActive: true,
        price: 100000,
      },
      {
        id: uuidv4(),
        title: "헬스장 멤버십 - 6개월 이용권",
        description:
          "일반적인 기구 이용 및 자유로운 운동 공간 제공. 헬스장 6개월 이용권",
        chargeType: "기간차감",
        totalSessions: null,
        duration: 180,
        isActive: true,
        price: 550000,
      },
      {
        id: uuidv4(),
        title: "헬스장 멤버십 - 12개월 이용권",
        description:
          "일반적인 기구 이용 및 자유로운 운동 공간 제공. 헬스장 12개월 이용권",
        chargeType: "기간차감",
        totalSessions: null,
        duration: 365,
        isActive: true,
        price: 1000000,
      },
      // VIP 멤버십
      {
        id: uuidv4(),
        title: "VIP 멤버십 - 1개월 VIP 이용권",
        description:
          "고급 시설(개인 라커룸, 스파 등)과 트레이너 우선 배정. 1개월 VIP 이용권",
        chargeType: "기간차감",
        totalSessions: null,
        duration: 30,
        isActive: true,
        price: 150000,
      },
      {
        id: uuidv4(),
        title: "VIP 멤버십 - 6개월 VIP 이용권",
        description:
          "고급 시설(개인 라커룸, 스파 등)과 트레이너 우선 배정. 6개월 VIP 이용권",
        chargeType: "기간차감",
        totalSessions: null,
        duration: 180,
        isActive: true,
        price: 800000,
      },
      {
        id: uuidv4(),
        title: "VIP 멤버십 - 12개월 VIP 이용권",
        description:
          "고급 시설(개인 라커룸, 스파 등)과 트레이너 우선 배정. 12개월 VIP 이용권",
        chargeType: "기간차감",
        totalSessions: null,
        duration: 365,
        isActive: true,
        price: 1500000,
      },
    ],
  },

  // 스페셜: "다이어트 캠프"와 "근육 강화 프로그램" 통합
  스페셜: {
    id: uuidv4(),
    classes: [
      // 다이어트 캠프
      {
        id: uuidv4(),
        title: "다이어트 캠프 - 1일 체험 캠프",
        description:
          "체중 감량 목표 집중 프로그램. 다이어트 캠프 1일 체험 프로그램",
        chargeType: "횟수차감",
        totalSessions: 1,
        duration: null,
        isActive: true,
        price: 30000,
      },
      {
        id: uuidv4(),
        title: "다이어트 캠프 - 2주 집중 캠프",
        description:
          "체중 감량 목표 집중 프로그램. 다이어트 캠프 2주 집중 프로그램",
        chargeType: "기간차감",
        totalSessions: null,
        duration: 14,
        isActive: true,
        price: 250000,
      },
      // 근육 강화 프로그램
      {
        id: uuidv4(),
        title: "근육 강화 프로그램 - 1회 체험 프로그램",
        description: "웨이트 중심 전문 프로그램. 근육 강화 1회 체험 프로그램",
        chargeType: "횟수차감",
        totalSessions: 1,
        duration: null,
        isActive: true,
        price: 30000,
      },
      {
        id: uuidv4(),
        title: "근육 강화 프로그램 - 6주 프로그램",
        description: "웨이트 중심 전문 프로그램. 근육 강화 6주 집중 코스",
        chargeType: "기간차감",
        totalSessions: null,
        duration: 42,
        isActive: true,
        price: 350000,
      },
      {
        id: uuidv4(),
        title: "근육 강화 프로그램 - 12주 프로그램",
        description: "웨이트 중심 전문 프로그램. 근육 강화 12주 집중 코스",
        chargeType: "기간차감",
        totalSessions: null,
        duration: 84,
        isActive: true,
        price: 600000,
      },
    ],
  },

  // 식단및컨설팅: "식단 상담"과 "체성분 분석" 통합
  식단및컨설팅: {
    id: uuidv4(),
    classes: [
      // 식단 상담
      {
        id: uuidv4(),
        title: "식단 상담 - 1회 식단 상담",
        description: "목표에 맞는 영양 상담 및 식단 제공. 1회 식단 상담",
        chargeType: "횟수차감",
        totalSessions: 1,
        duration: null,
        isActive: true,
        price: 40000,
      },
      {
        id: uuidv4(),
        title: "식단 상담 - 3회 패키지 상담",
        description: "목표에 맞는 영양 상담 및 식단 제공. 식단 상담 3회 패키지",
        chargeType: "횟수차감",
        totalSessions: 3,
        duration: null,
        isActive: true,
        price: 110000,
      },
      {
        id: uuidv4(),
        title: "식단 상담 - 6회 패키지 상담",
        description: "목표에 맞는 영양 상담 및 식단 제공. 식단 상담 6회 패키지",
        chargeType: "횟수차감",
        totalSessions: 6,
        duration: null,
        isActive: true,
        price: 200000,
      },
      // 체성분 분석
      {
        id: uuidv4(),
        title: "체성분 분석 - 1회 분석",
        description: "체지방률, 근육량 등 상세 분석. 1회 체성분 분석",
        chargeType: "횟수차감",
        totalSessions: 1,
        duration: null,
        isActive: true,
        price: 50000,
      },
    ],
  },

  // 부가서비스: "마사지 및 스트레칭 서비스"와 "운동복/운동화 대여" 통합
  부가서비스: {
    id: uuidv4(),
    classes: [
      // 마사지 및 스트레칭 서비스
      {
        id: uuidv4(),
        title: "마사지 및 스트레칭 서비스 - 1회 마사지 서비스",
        description:
          "운동 후 근육 회복 지원. 30분 마사지 및 스트레칭 1회 이용권",
        chargeType: "횟수차감",
        totalSessions: 1,
        duration: null,
        isActive: true,
        price: 35000,
      },
      {
        id: uuidv4(),
        title: "마사지 및 스트레칭 서비스 - 5회 마사지 패키지",
        description:
          "운동 후 근육 회복 지원. 30분 마사지 및 스트레칭 5회 패키지",
        chargeType: "횟수차감",
        totalSessions: 5,
        duration: null,
        isActive: true,
        price: 150000,
      },
      // 운동복/운동화 대여
      {
        id: uuidv4(),
        title: "운동복/운동화 대여 - 1일 대여",
        description: "고객 편의를 위한 서비스. 운동복/운동화 1일 대여",
        chargeType: "횟수차감",
        totalSessions: 1,
        duration: null,
        isActive: true,
        price: 10000,
      },
      {
        id: uuidv4(),
        title: "운동복/운동화 대여 - 1주일 대여",
        description: "고객 편의를 위한 서비스. 운동복/운동화 1주일 대여",
        chargeType: "기간차감",
        totalSessions: null,
        duration: 7,
        isActive: true,
        price: 50000,
      },
    ],
  },

  // 특화프로그램: "노인 건강 프로그램"과 "청소년 피트니스 프로그램" 통합
  특화프로그램: {
    id: uuidv4(),
    classes: [
      // 노인 건강 프로그램
      {
        id: uuidv4(),
        title: "노인 건강 프로그램 - 1회 체험 프로그램",
        description:
          "관절 강화 및 유산소 운동을 통한 노년 건강 관리. 노인 건강 1회 체험 프로그램",
        chargeType: "횟수차감",
        totalSessions: 1,
        duration: null,
        isActive: true,
        price: 20000,
      },
      {
        id: uuidv4(),
        title: "노인 건강 프로그램 - 1개월 프로그램",
        description:
          "관절 강화 및 유산소 운동을 통한 노년 건강 관리. 노인 건강 1개월 이용권",
        chargeType: "기간차감",
        totalSessions: null,
        duration: 30,
        isActive: true,
        price: 80000,
      },
      // 청소년 피트니스 프로그램
      {
        id: uuidv4(),
        title: "청소년 피트니스 프로그램 - 1회 체험 프로그램",
        description:
          "성장기 학생을 위한 안전하고 체계적인 트레이닝. 청소년 피트니스 1회 체험 프로그램",
        chargeType: "횟수차감",
        totalSessions: 1,
        duration: null,
        isActive: true,
        price: 25000,
      },
      {
        id: uuidv4(),
        title: "청소년 피트니스 프로그램 - 1개월 프로그램",
        description:
          "성장기 학생을 위한 안전하고 체계적인 트레이닝. 청소년 피트니스 1개월 이용권",
        chargeType: "기간차감",
        totalSessions: null,
        duration: 30,
        isActive: true,
        price: 90000,
      },
    ],
  },

  // 온라인상품: "온라인 PT"와 "홈트 클래스" 통합
  온라인상품: {
    id: uuidv4(),
    classes: [
      // 온라인 PT
      {
        id: uuidv4(),
        title: "온라인 PT - 1회 온라인 PT",
        description:
          "비대면 1:1 트레이닝으로 집에서도 전문 코칭 제공. 온라인 PT 1회 이용권",
        chargeType: "횟수차감",
        totalSessions: 1,
        duration: null,
        isActive: true,
        price: 40000,
      },
      {
        id: uuidv4(),
        title: "온라인 PT - 5회 온라인 PT",
        description:
          "비대면 1:1 트레이닝으로 집에서도 전문 코칭 제공. 온라인 PT 5회 이용권",
        chargeType: "횟수차감",
        totalSessions: 5,
        duration: null,
        isActive: true,
        price: 180000,
      },
      {
        id: uuidv4(),
        title: "온라인 PT - 10회 온라인 PT",
        description:
          "비대면 1:1 트레이닝으로 집에서도 전문 코칭 제공. 온라인 PT 10회 이용권",
        chargeType: "횟수차감",
        totalSessions: 10,
        duration: null,
        isActive: true,
        price: 320000,
      },
      // 홈트 클래스
      {
        id: uuidv4(),
        title: "홈트 클래스 - 1회 홈트 클래스",
        description:
          "가정에서 참여할 수 있는 다양한 운동 클래스. 홈트 클래스 1회 이용권",
        chargeType: "횟수차감",
        totalSessions: 1,
        duration: null,
        isActive: true,
        price: 25000,
      },
      {
        id: uuidv4(),
        title: "홈트 클래스 - 1개월 홈트 클래스",
        description:
          "가정에서 참여할 수 있는 다양한 운동 클래스. 홈트 클래스 1개월 이용권",
        chargeType: "기간차감",
        totalSessions: null,
        duration: 30,
        isActive: true,
        price: 80000,
      },
      {
        id: uuidv4(),
        title: "홈트 클래스 - 6개월 홈트 클래스",
        description:
          "가정에서 참여할 수 있는 다양한 운동 클래스. 홈트 클래스 6개월 이용권",
        chargeType: "기간차감",
        totalSessions: null,
        duration: 180,
        isActive: true,
        price: 400000,
      },
    ],
  },
};
