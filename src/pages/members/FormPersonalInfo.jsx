import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  Radio,
  Row,
  Space,
  Upload,
} from "antd";
import { CheckOutlined, UndoOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useFormMember } from "./useFormMember";
import { calAge } from "../../utils/formUtils";

const FormPersonalInfo = ({ initialValue, onNext }) => {
  const [picSrc, setPicSrc] = useState(initialValue?.pic || "");
  const [age, setAge] = useState("");
  const { getPreparedValues, isLoading } = useFormMember(initialValue);
  const [memberForm] = useForm();
  // ref를 사용하여 초기값 설정이 단 한 번만 이루어지도록 함
  const isInitialized = useRef(false);
  const scriptUrl =
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);

  useEffect(() => {
    // 마운트 시 단 한 번만 초기값 설정
    if (!isInitialized.current && initialValue) {
      memberForm.setFieldsValue({ ...initialValue });
      isInitialized.current = true;
    }
  }, []); // 빈 배열 의존성: 최초 마운트 시에만 실행

  const handleAddressComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    memberForm.setFieldValue("zoneCode", data.zonecode);
    memberForm.setFieldValue("mainAddress", fullAddress);
  };

  const handleZoneCodeSearch = () => {
    open({ onComplete: handleAddressComplete });
  };

  const handleImageUpload = (info) => {
    if (
      !info.file.originFileObj ||
      !(info.file.originFileObj instanceof Blob)
    ) {
      console.error("Invalid file object. Expected a Blob or File.");
      alert("올바른 이미지 파일을 업로드해주세요.");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPicSrc(fileReader.result);
      memberForm.setFieldValue("pic", fileReader.result);
    };
    fileReader.readAsDataURL(info.file.originFileObj);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      alert("이미지 파일만 업로드 가능합니다.");
    }
    return isImage;
  };

  const handleFormSubmit = async (values) => {
    try {
      const preparedValues = await getPreparedValues({
        ...initialValue,
        ...values,
      });
      console.log("Prepared Values:", preparedValues);
      // onSubmit 대신 onNext를 호출하여 다음 스텝으로 이동
      onNext(preparedValues);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const handleAge = () => {
    const birthYear = memberForm.getFieldValue("birthYear") || "";
    const birthMonth = memberForm.getFieldValue("birthMonth") || "";
    const birthDay = memberForm.getFieldValue("birthDay") || "";

    if (birthYear && birthMonth && birthDay) {
      const userAge = calAge(birthYear, birthMonth, birthDay);
      setAge(userAge);
    } else {
      setAge("");
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: "rgba(77, 77, 77, 0.8)",
            marginBottom: 1,
          },
        },
      }}
    >
      <Form
        name="member"
        form={memberForm}
        labelCol={{ span: 5 }}
        autoComplete="off"
        onFinish={handleFormSubmit}
      >
        <Row>
          <Col span={6}>
            <div className="flex justify-center items-center h-full">
              <Form.Item name="pic">
                <Upload
                  listType="picture-circle"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleImageUpload}
                  maxCount={1}
                  accept="image/*"
                >
                  {picSrc ? (
                    <img
                      src={picSrc}
                      alt="회원 사진"
                      className="rounded-full"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <div>+ 사진 업로드</div>
                  )}
                </Upload>
              </Form.Item>
            </div>
          </Col>
          <Col span={18}>
            <Form.Item
              label="이름"
              name="name"
              rules={[{ required: true, message: "이름을 입력해주세요!" }]}
            >
              <Input maxLength={30} />
            </Form.Item>
            <Form.Item
              label="연락처"
              name="phone"
              rules={[{ required: true, message: "연락처를 입력해주세요!" }]}
            >
              <Input maxLength={30} placeholder="###-####-####" />
            </Form.Item>
            <Form.Item
              label="생년월일"
              rules={[{ required: true, message: "생년월일을 입력해주세요!" }]}
            >
              <Space>
                <Form.Item name="birthYear" noStyle>
                  <Input
                    maxLength={4}
                    style={{ width: 80 }}
                    placeholder="년도"
                    suffix="년"
                  />
                </Form.Item>
                <Form.Item name="birthMonth" noStyle>
                  <Input
                    maxLength={2}
                    style={{ width: 80 }}
                    placeholder="월"
                    suffix="월"
                  />
                </Form.Item>
                <Form.Item name="birthDay" noStyle>
                  <Input
                    maxLength={2}
                    style={{ width: 80 }}
                    placeholder="일"
                    suffix="일"
                    onBlur={handleAge}
                  />
                </Form.Item>
                <Form.Item noStyle>
                  {age !== "" && (
                    <div className="flex items-center">
                      <p className="mr-4">만 {age}세</p>
                      <Button onClick={handleAge}>나이계산</Button>
                    </div>
                  )}
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item label="성별" name="gender">
              <Radio.Group>
                <Radio value="남성">남성</Radio>
                <Radio value="여성">여성</Radio>
                <Radio value="해당없음">해당없음</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="신장/몸무게">
              <Space>
                <Form.Item noStyle name="height">
                  <Input suffix="cm" style={{ width: 150 }} />
                </Form.Item>
                <Form.Item noStyle name="weight">
                  <Input suffix="kg" style={{ width: 150 }} />
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item label="주소" style={{ marginBottom: 5 }}>
              <Space.Compact>
                <Form.Item noStyle name="zoneCode">
                  <Input disabled />
                </Form.Item>
                <Button onClick={handleZoneCodeSearch}>검색</Button>
              </Space.Compact>
            </Form.Item>
            <Form.Item
              label=" "
              name="mainAddress"
              colon={false}
              style={{ marginBottom: 5 }}
            >
              <Input />
            </Form.Item>
            <Form.Item label=" " name="extraAddress" colon={false}>
              <Input />
            </Form.Item>
            <Form.Item label="메모" name="memo">
              <Input.TextArea autoSize={{ minRows: 1, maxRows: 4 }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="flex w-full justify-between items-center gap-x-2">
              {/* 초기화 버튼은 사용자가 직접 누를 경우에만 리셋 */}
              <Button
                size="large"
                icon={<UndoOutlined />}
                onClick={() => {
                  memberForm.resetFields();
                  setPicSrc(initialValue?.pic);
                }}
                loading={isLoading}
                disabled={isLoading}
              >
                <p className="text-base font-bold px-1">초기화</p>
              </Button>
              <Button
                htmlType="submit"
                size="large"
                type="primary"
                icon={<CheckOutlined />}
                loading={isLoading}
                disabled={isLoading}
              >
                <p className="text-base font-bold px-3">다음</p>
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </ConfigProvider>
  );
};

export default FormPersonalInfo;
