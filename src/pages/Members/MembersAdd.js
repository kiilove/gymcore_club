"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import PageTitle from "../../components/Shared/PageTitle";
import MembersStepperForm from "../../components/Members/MembersStepperForm";
import { useFirestore } from "../../hooks/useFirestore";
import { useToast } from "../../hooks/use-toast";

const MembersAdd = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addDocument, error } = useFirestore("members");
  const { toast } = useToast();

  const handleSubmit = async (data, step, memberId = null) => {
    setIsSubmitting(true);
    try {
      // 단계별 처리
      if (step === "profile") {
        // 1단계: 회원 기본 정보 저장
        console.log("프로필 데이터 저장:", data);

        const memberData = {
          ...data,
          createdAt: new Date(),
        };

        const newMember = await addDocument(memberData);

        if (!newMember) {
          throw new Error("회원 정보 저장에 실패했습니다.");
        }

        toast({
          title: "기본 정보 저장 완료",
          description: "신체 정보를 입력해주세요.",
          variant: "success",
        });

        setIsSubmitting(false);
        return newMember; // 다음 단계에서 사용할 회원 ID 포함
      } else if (step === "complete" && memberId) {
        // 완료 버튼 클릭 - 회원 상세 페이지로 이동
        toast({
          title: "회원 등록 완료",
          description: "회원 정보가 저장되었습니다.",
          variant: "success",
        });

        navigate(`/members/detail/${memberId}`);
      }

      setIsSubmitting(false);
    } catch (err) {
      console.error("회원 등록 중 오류 발생:", err);
      toast({
        title: "회원 등록 실패",
        description: error || err.message,
        variant: "error",
      });
      setIsSubmitting(false);
      throw err;
    }
  };

  return (
    <div>
      <PageTitle
        title="회원 등록"
        subtitle="새로운 회원 정보를 입력하여 등록합니다."
        icon={FaUsers}
      />
      <div className="mt-6">
        <MembersStepperForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default MembersAdd;
