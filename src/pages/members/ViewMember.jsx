import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaUser, FaVenusMars, FaPhone, FaCalendarAlt } from "react-icons/fa";
import dayjs from "dayjs";

const ViewMember = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  const formattedDate = dayjs(location?.state?.createdAt).format("YYYY-MM-DD");

  return (
    <div
      className="p-6 bg-gray-50 rounded-lg shadow-md w-full flex-col"
      style={{ maxWidth: "1200px" }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        회원 정보
      </h2>
      <Row className="border-2 p-10 rounded-lg border-gray-200 bg-white shadow-sm">
        {/* 이미지 섹션 */}
        <Col span={8}>
          <div className="flex w-full h-auto justify-center items-center">
            <div
              className="flex rounded-full justify-center items-center p-1 border-dashed border-2 shadow-md bg-gray-100 hover:scale-105 transition-transform duration-300"
              style={{ width: "200px", height: "200px" }}
            >
              <img
                src={location?.state?.pic}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                className="rounded-full"
              />
            </div>
          </div>
        </Col>

        {/* 회원 정보 섹션 */}
        <Col span={16}>
          <Row gutter={16} className="mb-4">
            <Col span={24} className="text-lg font-semibold">
              <div className="flex items-center text-gray-700">
                <FaUser className="mr-3 text-gray-400 text-xl" />
                <span>이름:</span>
                <span className="ml-2 text-gray-900">
                  {location?.state?.name}
                </span>
              </div>
            </Col>
          </Row>
          <Row gutter={16} className="mb-4">
            <Col span={24} className="text-lg font-semibold">
              <div className="flex items-center text-gray-700">
                <FaVenusMars className="mr-3 text-gray-400 text-xl" />
                <span>성별:</span>
                <span className="ml-2 text-gray-900">
                  {location?.state?.gender}
                </span>
              </div>
            </Col>
          </Row>
          <Row gutter={16} className="mb-4">
            <Col span={24} className="text-lg font-semibold">
              <div className="flex items-center text-gray-700">
                <FaPhone className="mr-3 text-gray-400 text-xl" />
                <span>연락처:</span>
                <span className="ml-2 text-gray-900">
                  {location?.state?.phone}
                </span>
              </div>
            </Col>
          </Row>
          <Row gutter={16} className="mb-4">
            <Col span={24} className="text-lg font-semibold">
              <div className="flex items-center text-gray-700">
                <FaCalendarAlt className="mr-3 text-gray-400 text-xl" />
                <span>최초등록일:</span>
                <span className="ml-2 text-gray-900">{formattedDate}</span>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ViewMember;
