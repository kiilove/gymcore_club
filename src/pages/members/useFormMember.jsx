import { useState } from "react";
import { useStorageUpload } from "../../hooks/useStorage/index";
import { cleanedFormValues } from "../../utils/formUtils";
import { encryptData } from "../../services/encryptionUtils";
import dayjs from "dayjs";

export const useFormMember = (formValue) => {
  const [propValue, setPropValue] = useState({ ...formValue });
  const { uploadFile } = useStorageUpload();
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

  // Base64 데이터를 Blob으로 변환
  const base64ToBlob = (base64) => {
    const [metadata, encoded] = base64.split(",");
    const byteString = atob(encoded);
    const mimeString = metadata.match(/:(.*?);/)[1];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  // 이미지 데이터를 처리하여 URL로 변환
  const processImage = async (imageData) => {
    if (imageData.startsWith("https://")) {
      return imageData;
    } else if (imageData.startsWith("data:image/")) {
      setIsLoading(true); // 업로드 시작 시 로딩 상태 활성화
      try {
        const blob = base64ToBlob(imageData);
        const fileName = `profile-${Date.now()}.jpg`;
        const path = `profile/${fileName}`;
        const { url } = await uploadFile(path, blob);
        return url;
      } finally {
        setIsLoading(false); // 업로드 완료 후 로딩 상태 비활성화
      }
    }

    throw new Error("Unsupported image format");
  };

  // 폼 데이터를 준비
  const getPreparedValues = async (updatedValues) => {
    const processedPicSrc = updatedValues.pic
      ? await processImage(updatedValues.pic)
      : "";

    const cleanedValues = cleanedFormValues(updatedValues);
    const encryptedName = encryptData(updatedValues.name);
    const encryptedPhone = encryptData(updatedValues.phone);
    const encryptedMainAddress = encryptData(updatedValues.mainAddress);
    const encryptedExtraAddress = encryptData(updatedValues.extraAddress);
    const encryptedZoneCode = encryptData(updatedValues.zoneCode);
    const createdAt = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

    return {
      ...cleanedValues,
      name: encryptedName,
      phone: encryptedPhone,
      mainAddress: encryptedMainAddress,
      extraAddress: encryptedExtraAddress,
      zoneCode: encryptedZoneCode,
      createdAt: createdAt,
      pic: processedPicSrc,
    };
  };

  return { getPreparedValues, isLoading }; // 로딩 상태 반환
};
