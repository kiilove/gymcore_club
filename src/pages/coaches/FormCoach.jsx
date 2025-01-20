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
  Tag,
  Upload,
} from "antd";
import {
  CheckOutlined,
  PlusOutlined,
  UndoOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useRef, useState } from "react";
import { useFormCoach } from "./useFormCoach";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { calAge } from "../../utils/formUtils";

const FormCoach = ({ initialValue, onSubmit }) => {
  const [coachForm] = useForm();

  const [picSrc, setPicSrc] = useState(initialValue?.pic || "");
  const [inputVisible, setInputVisible] = useState(false);

  const [age, setAge] = useState("");
  const inputRef = useRef(null);
  const { getPreparedValues, isLoading } = useFormCoach(initialValue);
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
    coachForm.setFieldValue("zoneCode", data.zonecode);
    coachForm.setFieldValue("mainAddress", fullAddress);
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
      coachForm.setFieldValue("pic", fileReader.result); // 폼 필드 값 업데이트
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

  const handleAge = () => {
    const birthYear = coachForm.getFieldValue("birthYear") || "";
    const birthMonth = coachForm.getFieldValue("birthMonth") || "";
    const birthDay = coachForm.getFieldValue("birthDay") || "";

    if (birthYear !== "" && birthMonth !== "" && birthDay !== "") {
      const userAge = calAge(birthYear, birthMonth, birthDay);
      setAge(userAge);
    } else {
      setAge("");
    }
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

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
        name="coach"
        form={coachForm}
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
            <Form.Item
              label="생년월일"
              rules={[{ required: true, message: "생년월일를 입력해주세요!" }]}
            >
              <Space>
                <Form.Item name="birthYear" noStyle>
                  <Input
                    maxLength={4}
                    variant="filled"
                    style={{ width: 80 }}
                    placeholder="생년 4자리"
                    suffix="년"
                  />
                </Form.Item>
                <Form.Item name="birthMonth" noStyle>
                  <Input
                    maxLength={2}
                    variant="filled"
                    style={{ width: 80 }}
                    placeholder="2자리"
                    suffix="월"
                  />
                </Form.Item>
                <Form.Item name="birthDay" noStyle>
                  <Input
                    maxLength={2}
                    variant="filled"
                    style={{ width: 80 }}
                    placeholder="2자리"
                    suffix="일"
                    onBlur={() => {
                      handleAge();
                    }}
                  />
                </Form.Item>
                <Form.Item noStyle>
                  {age !== "" && (
                    <div className="flex w-full justify-center items-center">
                      <p className="mr-4">만 {age}세</p>
                      <Button onClick={() => handleAge()}>나이계산</Button>
                    </div>
                  )}
                </Form.Item>
              </Space>
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
            <Form.Item label="신장/몸무게">
              <Space>
                <Form.Item noStyle name="height">
                  <Input variant="filled" suffix="cm" style={{ width: 150 }} />
                </Form.Item>
                <Form.Item noStyle name="weight">
                  <Input variant="filled" suffix="kg" style={{ width: 150 }} />
                </Form.Item>
              </Space>
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
            {/* 수상경력 섹터 */}
            <Card title="수상경력" style={{ marginBottom: 16 }} size="small">
              <Form.List
                name="awards"
                initialValue={[
                  { order: 1, title: "", date: "", issuer: "", note: "" },
                ]} // 기본값 설정
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <Row key={key} gutter={8} align="middle">
                        <Col span={2}>
                          <Form.Item {...restField} name={[name, "order"]}>
                            <Input initialValue={index + 1} value={index + 1} />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item {...restField} name={[name, "title"]}>
                            <Input placeholder="명칭" />
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item {...restField} name={[name, "date"]}>
                            <Input placeholder="발행일자" />
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item {...restField} name={[name, "issuer"]}>
                            <Input placeholder="발행기관" />
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item
                            {...restField}
                            name={[name, "note"]}
                            initialValue=""
                          >
                            <Input placeholder="비고" />
                          </Form.Item>
                        </Col>
                        <Col span={1}>
                          <Form.Item>
                            <MinusCircleOutlined
                              onClick={() => remove(name)}
                              className="text-red-500"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() =>
                          add({
                            order: fields.length + 1,
                            title: "",
                            date: "",
                            issuer: "",
                            note: "",
                          })
                        }
                        block
                        icon={<PlusOutlined />}
                      >
                        수상경력 추가
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Card>

            {/* 자격증 섹터 */}
            <Card title="자격증" style={{ marginBottom: 16 }} size="small">
              <Form.List
                name="licenses"
                initialValue={[
                  { order: 1, title: "", date: "", issuer: "", note: "" },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <Row key={key} gutter={8} align="middle">
                        <Col span={2}>
                          <Form.Item {...restField} name={[name, "order"]}>
                            <Input value={index + 1} />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item {...restField} name={[name, "title"]}>
                            <Input placeholder="명칭" />
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item {...restField} name={[name, "date"]}>
                            <Input placeholder="발행일자" />
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item {...restField} name={[name, "issuer"]}>
                            <Input placeholder="발행기관" />
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item
                            {...restField}
                            name={[name, "note"]}
                            initialValue=""
                          >
                            <Input placeholder="비고" />
                          </Form.Item>
                        </Col>
                        <Col span={1}>
                          <Form.Item>
                            <MinusCircleOutlined
                              onClick={() => remove(name)}
                              className="text-red-500"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() =>
                          add({ title: "", date: "", issuer: "", note: "" })
                        }
                        block
                        icon={<PlusOutlined />}
                      >
                        자격증 추가
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Card>

            {/* 경력 섹터 */}
            <Card title="경력" style={{ marginBottom: 16 }} size="small">
              <Form.List
                name="experiences"
                initialValue={[
                  { order: 1, job: "", startDate: "", endDate: "", note: "" },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <Row key={key} gutter={8} align="middle">
                        <Col span={2}>
                          <Form.Item {...restField} name={[name, "order"]}>
                            <Input value={index + 1} />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item {...restField} name={[name, "job"]}>
                            <Input placeholder="경력" />
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item {...restField} name={[name, "startDate"]}>
                            <Input placeholder="시작일자" />
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item {...restField} name={[name, "endDate"]}>
                            <Input placeholder="종료일자" />
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item
                            {...restField}
                            name={[name, "note"]}
                            initialValue=""
                          >
                            <Input placeholder="비고" />
                          </Form.Item>
                        </Col>
                        <Form.Item>
                          <MinusCircleOutlined
                            onClick={() => remove(name)}
                            className="text-red-500"
                          />
                        </Form.Item>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() =>
                          add({ job: "", startDate: "", endDate: "", note: "" })
                        }
                        block
                        icon={<PlusOutlined />}
                      >
                        경력 추가
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Card>
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
                  coachForm.setFieldsValue({ ...initialValue });
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

export default FormCoach;
