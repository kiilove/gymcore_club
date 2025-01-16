import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
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

// FormMember 컴포넌트
const FormMember = ({ initialValue, onSubmit }) => {
  const [picSrc, setPicSrc] = useState(initialValue?.pic || "");
  const { getPreparedValues, isLoading } = useFormMember(initialValue);
  const [memberForm] = useForm();
  const scriptUrl =
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);

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
    // originFileObj가 유효한지 확인
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
      setPicSrc(fileReader.result); // 미리보기 이미지 업데이트
      memberForm.setFieldValue("pic", fileReader.result); // 폼 필드 값 업데이트
    };
    fileReader.readAsDataURL(info.file.originFileObj); // 파일 읽기
  };

  const beforeUpload = (file) => {
    // 파일이 이미지인지 확인
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      alert("이미지 파일만 업로드 가능합니다.");
    }
    return isImage; // true일 경우 업로드 허용
  };

  const handleFormSubmit = async (values) => {
    try {
      const preparedValues = await getPreparedValues({
        ...initialValue,
        ...values,
      });
      console.log("Prepared Values:", preparedValues);
      // preparedValues를 Firestore에 저장하거나 다른 작업을 수행
      onSubmit(preparedValues);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  useEffect(() => {
    if (initialValue) {
      memberForm.setFieldsValue({ ...initialValue });
    }
  }, [initialValue]);

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
                  maxCount={1} // 한 장만 업로드 가능
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
              <Input maxLength={30} variant="filled" />
            </Form.Item>
            <Form.Item
              label="연락처"
              name="phone"
              rules={[{ required: true, message: "연락처를 입력해주세요!" }]}
            >
              <Input
                maxLength={30}
                variant="filled"
                placeholder="###-####-####"
              />
            </Form.Item>
            <Form.Item label="성별" name="gender">
              <Radio.Group>
                <Radio value="남성"> 남성 </Radio>
                <Radio value="여성"> 여성 </Radio>
                <Radio value="해당없음"> 해당없음 </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item label="신장" name="height">
              <Input variant="filled" suffix="cm" style={{ width: 150 }} />
            </Form.Item>
            <Form.Item label="몸무게" name="weight">
              <Input variant="filled" suffix="kg" style={{ width: 150 }} />
            </Form.Item>

            <Form.Item label="주소" style={{ marginBottom: 5 }}>
              <Space.Compact>
                <Form.Item noStyle name="zoneCode">
                  <Input disabled />
                </Form.Item>
                <Button onClick={() => handleZoneCodeSearch()}>검색</Button>
              </Space.Compact>
            </Form.Item>
            <Form.Item
              label=" "
              name="mainAddress"
              colon={false}
              style={{ marginBottom: 5 }}
            >
              <Input variant="filled" />
            </Form.Item>
            <Form.Item label=" " name="extraAddress" colon={false}>
              <Input variant="filled" />
            </Form.Item>
            <Form.Item label="메모" name="memo">
              <Input.TextArea
                variant="filled"
                autoSize={{ minRows: 1, maxRows: 4 }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="flex w-full justify-end items-center gap-x-2">
              <Button
                htmlType="submit"
                size="large"
                type="primary"
                icon={<CheckOutlined />}
                loading={isLoading}
                disabled={isLoading}
              >
                <p className="text-base font-bold px-3">등록</p>
              </Button>
              <Button
                size="large"
                icon={<UndoOutlined />}
                onClick={() => {
                  memberForm.setFieldsValue({ ...initialValue });
                  setPicSrc(() => initialValue?.pic);
                }}
                loading={isLoading}
                disabled={isLoading}
              >
                <p className="text-base font-bold px-1">초기화</p>
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </ConfigProvider>
  );
};

export default FormMember;
