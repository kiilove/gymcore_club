import React, { useEffect, useState } from "react";
import { useFirestoreQuery } from "../../hooks/useFirestore/index";
import { decryptData } from "../../services/encryptionUtils";
import { Table, Tooltip } from "antd";

const ListMember = () => {
  const [memberList, setMemberList] = useState([]);
  const [loading, setLoading] = useState(false);
  const memberQuery = useFirestoreQuery();

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

  const fetchingMember = async () => {
    setLoading(true);
    try {
      await memberQuery.getDocuments("members", (data) => {
        const newData = decryptingData(data);
        setMemberList(newData);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingMember();
  }, []);

  // 테이블 컬럼 정의
  const columns = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <Tooltip
          color="cyan"
          title={
            <div className="flex flex-col">
              <p>연락처: {record.phone}</p>
              <p>주소: {record.mainAddress}</p>
              <p>성별: {record.gender}</p>
            </div>
          }
        >
          <span>{name}</span>
        </Tooltip>
      ),
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
      title: "가입일",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div
      className="p-6 bg-white rounded-lg shadow-lg w-full"
      style={{ maxWidth: "1200px" }}
    >
      <h2 className="text-xl font-semibold mb-6 text-center">회원 목록</h2>
      <Table
        columns={columns}
        dataSource={memberList.map((item, index) => ({
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

export default ListMember;
