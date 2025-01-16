import React, { useEffect, useState } from "react";
import { useFirestoreQuery } from "../../hooks/useFirestore/index";
import { decryptData } from "../../services/encryptionUtils";
import { Table, Tag } from "antd";

const ListCoach = () => {
  const [coachList, setCoachList] = useState([]);
  const [loading, setLoading] = useState(false);
  const coachQuery = useFirestoreQuery();

  const decryptingData = (originalDataArray) => {
    return originalDataArray.map((originalData) => {
      const decryptedName = decryptData(originalData.name);
      const decryptedPhone = decryptData(originalData.phone);
      const decryptedMainAddress = decryptData(originalData.mainAddress);
      const decryptedExtraAddress = decryptData(originalData.extraAddress);

      return {
        ...originalData,
        name: decryptedName,
        phone: decryptedPhone,
        mainAddress: decryptedMainAddress,
        extraAddress: decryptedExtraAddress,
      };
    });
  };

  const fetchingCoach = async () => {
    setLoading(true);
    try {
      await coachQuery.getDocuments("coaches", (data) => {
        console.log(data);
        const newData = decryptingData(data);
        setCoachList(newData);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingCoach();
  }, []);

  // 테이블 컬럼 정의
  const columns = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "연락처",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "주소",
      dataIndex: "mainAddress",
      key: "mainAddress",
    },
    {
      title: "자격증/전문분야",
      dataIndex: "license",
      key: "license",
      render: (licenses) =>
        licenses && licenses.length > 0 ? (
          <div>
            {licenses.slice(0, 2).map((license, index) => (
              <Tag key={index} className="mb-1">
                {license}
              </Tag>
            ))}
            {licenses.length > 2 && (
              <span>... ({licenses.length - 2} more)</span>
            )}
          </div>
        ) : (
          "-"
        ),
    },
  ];
  return (
    <div
      className="p-6 bg-white rounded-lg shadow-lg w-full"
      style={{ maxWidth: "1200px" }}
    >
      <h2 className="text-xl font-semibold mb-6 text-center">코치 목록</h2>
      <Table
        columns={columns}
        size="small"
        dataSource={coachList.map((item, index) => ({
          key: index,
          ...item,
        }))}
        loading={loading}
        pagination={{
          pageSize: 10, // 한 페이지에 보여줄 항목 수
          showSizeChanger: true, // 페이지 크기 선택 가능
          pageSizeOptions: ["5", "10", "20", "50"], // 페이지 크기 옵션
        }}
        bordered
        className="shadow-md"
      />
    </div>
  );
};

export default ListCoach;
