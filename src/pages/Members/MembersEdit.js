"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import PageTitle from "../../components/Shared/PageTitle";
import MembersForm from "../../components/Members/MembersForm";
import { useFirestore } from "../../hooks/useFirestore";
import { useToast } from "../../hooks/use-toast";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";

const MembersEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [successMessage, setSuccessMessage] = useState(null);

  const { getDocument, updateDocument, error } = useFirestore("members");

  // 회원 정보 로드
  const loadMember = useCallback(async () => {
    try {
      const data = await getDocument(id);
      if (data) {
        setMember(data);
      } else {
        toast({
          title: "회원 정보 없음",
          description: "요청한 회원 정보를 찾을 수 없습니다.",
          variant: "error",
        });
        navigate("/members");
      }
    } catch (err) {
      toast({
        title: "회원 정보 로드 실패",
        description: err.message,
        variant: "error",
      });
      navigate("/members");
    } finally {
      setLoading(false);
    }
  }, [id, getDocument, navigate, toast]);

  useEffect(() => {
    loadMember();
  }, [loadMember]);

  // 회원 정보 업데이트
  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("제출된 데이터:", data);

      // 회원 기본 정보
      const memberData = {
        name: data.name,
        gender: data.gender,
        birthdate: data.birthdate || "",
        phone: data.phone,
        email: data.email,
        membershipType: data.membershipType,
        startDate: data.startDate,
        endDate: data.endDate,
        status: data.status,
        updatedAt: serverTimestamp(),
      };

      // 신체정보가 있으면 bodyInfo 필드에 추가
      if (data.height || data.weight || data.bodyFat || data.bmi) {
        memberData.bodyInfo = {
          height: data.height ? Number(data.height) : null,
          weight: data.weight ? Number(data.weight) : null,
          bodyFat: data.bodyFat ? Number(data.bodyFat) : null,
          bmi: data.bmi ? Number(data.bmi) : null,
        };
      }

      // 회원 정보 업데이트
      const success = await updateDocument(id, memberData);

      if (success) {
        // 신체 정보가 있으면 bodyInfo 서브컬렉션에 직접 저장
        if (id && (data.height || data.weight || data.bodyFat)) {
          try {
            // bodyInfo 데이터 추출
            const bodyInfoData = {
              height: data.height ? Number(data.height) : null,
              weight: data.weight ? Number(data.weight) : null,
              bodyFat: data.bodyFat ? Number(data.bodyFat) : null,
              bmi: data.bmi ? Number(data.bmi) : null,
              date: data.date || new Date().toISOString().split("T")[0], // 측정일
              writtenAt:
                data.writtenAt || new Date().toISOString().split("T")[0],
              writtenBy: data.writtenBy || "시스템", // 작성자 정보가 없으면 기본값
              notes: data.notes || "",
              createdAt: serverTimestamp(),
            };

            console.log("저장할 bodyInfo 데이터:", bodyInfoData);
            console.log("저장 경로:", `members/${id}/bodyInfo`);

            // Firebase SDK를 직접 사용하여 서브컬렉션에 문서 추가
            const docRef = await addDoc(
              collection(db, `members/${id}/bodyInfo`),
              bodyInfoData
            );
            console.log(
              "신체 정보가 서브컬렉션에 저장되었습니다. 문서 ID:",
              docRef.id
            );
          } catch (err) {
            console.error("신체 정보 저장 실패:", err);
            // 신체정보 저장 실패해도 회원 수정은 완료된 것으로 처리
            toast({
              title: "신체 정보 저장 실패",
              description:
                "회원 정보는 수정되었지만 신체 정보 저장에 실패했습니다.",
              variant: "warning",
            });
          }
        } else {
          console.log("저장할 신체 정보가 없거나 회원 ID가 없습니다.");
        }

        setSuccessMessage(`${data.name} 회원 정보가 수정되었습니다.`);
        toast({
          title: "회원 정보 수정 완료",
          description: `${data.name} 회원 정보가 수정되었습니다.`,
          variant: "success",
        });
        navigate(`/members/detail/${id}`);
        return { ...data, id };
      } else {
        throw new Error("회원 정보 수정에 실패했습니다.");
      }
    } catch (err) {
      console.error("회원 정보 수정 중 오류 발생:", err);
      toast({
        title: "회원 정보 수정 실패",
        description: error || err.message,
        variant: "error",
      });
      setIsSubmitting(false);
      throw err;
    }
  };

  if (loading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  return (
    <div>
      <PageTitle
        title="회원 정보 수정"
        subtitle="회원 정보를 수정합니다."
        icon={FaUsers}
      />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
        <MembersForm
          member={member}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isEditing={true}
        />
      </div>
    </div>
  );
};

export default MembersEdit;
