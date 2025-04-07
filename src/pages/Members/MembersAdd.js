"use client";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/Shared/PageTitle";
import MembersForm from "../../components/Members/MembersForm";
import { useToast } from "../../hooks/use-toast";

const MembersAdd = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (formData) => {
    // 실제 구현에서는 API 호출 등을 통해 데이터를 저장
    console.log("회원 등록 데이터:", formData);

    // 성공 메시지 표시
    toast({
      title: "회원 등록 완료",
      description: `${formData.name} 회원이 등록되었습니다.`,
      variant: "success",
    });

    // 등록 후 회원 목록 페이지로 이동
    navigate("/members");
  };

  return (
    <div>
      <PageTitle title="회원 등록" subtitle="새로운 회원 정보를 등록합니다." />

      <MembersForm onSubmit={handleSubmit} />
    </div>
  );
};

export default MembersAdd;
