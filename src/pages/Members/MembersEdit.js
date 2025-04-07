"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageTitle from "../../components/Shared/PageTitle";
import MembersForm from "../../components/Members/MembersForm";
import { members } from "../../datas/mockData";
import { useToast } from "../../hooks/use-toast";

const MembersEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // 실제 구현에서는 API 호출 등을 통해 데이터를 가져옴
    const foundMember = members.find((m) => m.id === Number.parseInt(id));

    if (foundMember) {
      setMember(foundMember);
    } else {
      // 회원을 찾을 수 없는 경우 목록 페이지로 리다이렉트
      navigate("/members");
    }

    setLoading(false);
  }, [id, navigate]);

  const handleSubmit = (formData) => {
    // 실제 구현에서는 API 호출 등을 통해 데이터를 업데이트
    console.log("회원 수정 데이터:", formData);

    // 성공 메시지 표시
    toast({
      title: "회원 수정 완료",
      description: `${formData.name} 회원 정보가 수정되었습니다.`,
      variant: "success",
    });

    // 수정 후 회원 목록 페이지로 이동
    navigate("/members");
  };

  if (loading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  return (
    <div>
      <PageTitle
        title="회원 수정"
        subtitle={`${member.name} 회원의 정보를 수정합니다.`}
      />

      <MembersForm member={member} onSubmit={handleSubmit} isEditing={true} />
    </div>
  );
};

export default MembersEdit;
