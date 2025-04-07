import {
  FaChartBar,
  FaUsers,
  FaUserTie,
  FaBoxOpen,
  FaCreditCard,
  FaMusic,
  FaCog,
} from "react-icons/fa";
import { Loader } from "lucide-react";

// 대시보드
import Dashboard from "../pages/Dashboard/Dashboard";

// 회원 관리
import Members from "../pages/Members/Members";
import MembersAdd from "../pages/Members/MembersAdd";
import MembersEdit from "../pages/Members/MembersEdit";
import MembersDetail from "../pages/Members/MembersDetail";

// 코치 관리
import Coaches from "../pages/Coaches/Coaches";
import CoachesAdd from "../pages/Coaches/CoachesAdd";
import CoachesEdit from "../pages/Coaches/CoachesEdit";
import CoachesDetail from "../pages/Coaches/CoachesDetail";

// 상품 관리
import Products from "../pages/Products/Products";
import ProductsAdd from "../pages/Products/ProductsAdd";
import ProductsEdit from "../pages/Products/ProductsEdit";
import ProductsDetail from "../pages/Products/ProductsDetail";

// 결제 관리
import Payments from "../pages/Payments/Payments";
import PaymentAdd from "../pages/Payments/PaymentAdd";
import PaymentEdit from "../pages/Payments/PaymentEdit";
import PaymentDetail from "../pages/Payments/PaymentDetail";

// 음악 관리
import Music from "../pages/Music/Music";

// 설정
import Settings from "../pages/Settings/Settings";

// 로딩 데모
import LoadingDemo from "../pages/LoadingDemo";

// 로딩 예제
import LoadingExamples from "../pages/LoadingExamples";

// 라우트 설정
const routes = [
  {
    path: "/dashboard",
    name: "대시보드",
    icon: FaChartBar,
    component: Dashboard,
    showInSidebar: true,
  },
  {
    path: "/members",
    name: "회원 관리",
    icon: FaUsers,
    component: Members,
    showInSidebar: true,
  },
  {
    path: "/members/add",
    name: "회원 등록",
    component: MembersAdd,
    showInSidebar: false,
  },
  {
    path: "/members/edit/:id",
    name: "회원 수정",
    component: MembersEdit,
    showInSidebar: false,
  },
  {
    path: "/members/detail/:id",
    name: "회원 상세",
    component: MembersDetail,
    showInSidebar: false,
  },
  {
    path: "/coaches",
    name: "코치 관리",
    icon: FaUserTie,
    component: Coaches,
    showInSidebar: true,
  },
  {
    path: "/coaches/add",
    name: "코치 등록",
    component: CoachesAdd,
    showInSidebar: false,
  },
  {
    path: "/coaches/edit/:id",
    name: "코치 수정",
    component: CoachesEdit,
    showInSidebar: false,
  },
  {
    path: "/coaches/detail/:id",
    name: "코치 상세",
    component: CoachesDetail,
    showInSidebar: false,
  },
  {
    path: "/products",
    name: "상품 관리",
    icon: FaBoxOpen,
    component: Products,
    showInSidebar: true,
  },
  {
    path: "/products/add",
    name: "상품 등록",
    component: ProductsAdd,
    showInSidebar: false,
  },
  {
    path: "/products/edit/:id",
    name: "상품 수정",
    component: ProductsEdit,
    showInSidebar: false,
  },
  {
    path: "/products/detail/:id",
    name: "상품 상세",
    component: ProductsDetail,
    showInSidebar: false,
  },
  {
    path: "/payments",
    name: "결제 관리",
    icon: FaCreditCard,
    component: Payments,
    showInSidebar: true,
  },
  {
    path: "/payments/add",
    name: "결제 추가",
    component: PaymentAdd,
    showInSidebar: false,
  },
  {
    path: "/payments/edit/:id",
    name: "결제 수정",
    component: PaymentEdit,
    showInSidebar: false,
  },
  {
    path: "/payments/detail/:id",
    name: "결제 상세",
    component: PaymentDetail,
    showInSidebar: false,
  },
  {
    path: "/music",
    name: "음악 관리",
    icon: FaMusic,
    component: Music,
    showInSidebar: true,
  },
  {
    path: "/settings",
    name: "설정",
    icon: FaCog,
    component: Settings,
    showInSidebar: true,
  },
  {
    path: "/loading-demo",
    name: "로딩 애니메이션",
    icon: Loader,
    component: LoadingDemo,
    showInSidebar: true,
  },
  {
    path: "/loading-examples",
    name: "로딩 예제",
    icon: Loader,
    component: LoadingExamples,
    showInSidebar: true,
  },
];

export default routes;
