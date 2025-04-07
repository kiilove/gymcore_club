"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaImage, FaTag, FaInfoCircle } from "react-icons/fa";
import Button from "../Shared/Button";

const ProductsForm = ({ product, onSubmit, isEditing = false }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    category: "회원권",
    price: "",
    description: "",
    duration: "",
    features: [""],
    isPopular: false,
    status: "active",
    stockQuantity: "",
    discountRate: "",
    discountPrice: "",
    tags: [""],
    imageUrl: "",
    relatedProductIds: [],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "회원권",
        price: product.price || "",
        description: product.description || "",
        duration: product.duration || "",
        features: product.features || [""],
        isPopular: product.isPopular || false,
        status: product.status || "active",
        stockQuantity: product.stockQuantity || "",
        discountRate: product.discountRate || "",
        discountPrice: product.discountPrice || "",
        tags: product.tags || [""],
        imageUrl: product.imageUrl || "",
        relatedProductIds: product.relatedProductIds || [],
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // 할인율이 변경되면 할인가격 자동 계산
      if (name === "discountRate" && prev.price) {
        const rate = Number.parseFloat(value) || 0;
        const price = Number.parseFloat(prev.price) || 0;
        if (rate > 0 && price > 0) {
          newFormData.discountPrice = Math.round(price * (1 - rate / 100));
        } else {
          newFormData.discountPrice = "";
        }
      }

      // 에러 상태 초기화
      if (errors[name]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: null,
        }));
      }

      return newFormData;
    });
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prev) => ({
      ...prev,
      features: newFeatures,
    }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index) => {
    const newFeatures = [...formData.features];
    newFeatures.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      features: newFeatures.length ? newFeatures : [""],
    }));
  };

  const handleTagChange = (index, value) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData((prev) => ({
      ...prev,
      tags: newTags,
    }));
  };

  const addTag = () => {
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, ""],
    }));
  };

  const removeTag = (index) => {
    const newTags = [...formData.tags];
    newTags.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      tags: newTags.length ? newTags : [""],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // 필수 필드 검증
    if (!formData.name.trim()) {
      newErrors.name = "상품명을 입력해주세요.";
    }

    if (!formData.price || Number.parseFloat(formData.price) <= 0) {
      newErrors.price = "유효한 가격을 입력해주세요.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "상품 설명을 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // 빈 태그 제거
    const cleanedTags = formData.tags.filter((tag) => tag.trim() !== "");

    // 제출할 데이터 구성
    const submitData = {
      ...formData,
      price: Number.parseFloat(formData.price),
      duration: formData.duration ? Number.parseInt(formData.duration) : null,
      stockQuantity: formData.stockQuantity
        ? Number.parseInt(formData.stockQuantity)
        : null,
      discountRate: formData.discountRate
        ? Number.parseFloat(formData.discountRate)
        : null,
      discountPrice: formData.discountPrice
        ? Number.parseFloat(formData.discountPrice)
        : null,
      tags: cleanedTags.length > 0 ? cleanedTags : [],
    };

    onSubmit(submitData);
  };

  // 탭 네비게이션 렌더링
  const renderTabs = () => {
    return (
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-8 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("basic")}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${
              activeTab === "basic"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            <FaInfoCircle className="mr-2" />
            기본 정보
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("details")}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${
              activeTab === "details"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            <FaTag className="mr-2" />
            상세 정보
          </button>
        </nav>
      </div>
    );
  };

  // 기본 정보 탭 렌더링
  const renderBasicInfoTab = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            상품명 *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border ${
              errors.name
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            카테고리 *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="회원권">회원권</option>
            <option value="PT">PT</option>
            <option value="수업">수업</option>
            <option value="기타">기타</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            가격 (원) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            className={`w-full px-3 py-2 border ${
              errors.price
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white`}
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-500">{errors.price}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            기간 (일)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="0"
            placeholder="회원권인 경우 입력"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            설명 *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            className={`w-full px-3 py-2 border ${
              errors.description
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white`}
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            상태
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="active">판매중</option>
            <option value="inactive">판매중지</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPopular"
            name="isPopular"
            checked={formData.isPopular}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="isPopular"
            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
          >
            인기 상품으로 표시
          </label>
        </div>
      </div>
    );
  };

  // 상세 정보 탭 렌더링
  const renderDetailsTab = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="stockQuantity"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              재고 수량
            </label>
            <input
              type="number"
              id="stockQuantity"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              min="0"
              placeholder="물리적 상품인 경우 입력"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="discountRate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              할인율 (%)
            </label>
            <input
              type="number"
              id="discountRate"
              name="discountRate"
              value={formData.discountRate}
              onChange={handleChange}
              min="0"
              max="100"
              placeholder="할인율 입력"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="discountPrice"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              할인가 (원)
            </label>
            <input
              type="number"
              id="discountPrice"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              min="0"
              readOnly={formData.discountRate > 0}
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm ${
                formData.discountRate > 0 ? "bg-gray-100 dark:bg-gray-600" : ""
              } focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white`}
            />
            {formData.discountRate > 0 && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                할인율에 따라 자동 계산됩니다.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              상품 이미지 URL
            </label>
            <div className="flex">
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="이미지 URL 입력"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="button"
                className="px-3 py-2 bg-gray-200 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-r-md"
              >
                <FaImage className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            {formData.imageUrl && (
              <div className="mt-2">
                <img
                  src={formData.imageUrl || "/placeholder.svg"}
                  alt="상품 이미지 미리보기"
                  className="h-20 object-cover rounded-md"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg";
                    e.target.alt = "이미지를 불러올 수 없습니다";
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            상품 태그
          </label>
          <div className="space-y-2">
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                  placeholder="태그 입력 (예: 초보자용, 프로모션)"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  disabled={formData.tags.length === 1}
                  className="ml-2 p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addTag}
            className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <FaPlus className="mr-1" /> 태그 추가
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            상품 특징
          </label>
          <div className="space-y-2">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder="상품 특징을 입력하세요"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  disabled={formData.features.length === 1}
                  className="ml-2 p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addFeature}
            className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <FaPlus className="mr-1" /> 특징 추가
          </button>
        </div>
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      {renderTabs()}

      {activeTab === "basic" && renderBasicInfoTab()}
      {activeTab === "details" && renderDetailsTab()}

      <div className="mt-6 flex justify-end space-x-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate("/products")}
        >
          취소
        </Button>
        <Button type="submit" variant="primary">
          {isEditing ? "수정" : "등록"}
        </Button>
      </div>
    </form>
  );
};

export default ProductsForm;
