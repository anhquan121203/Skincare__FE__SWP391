import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useCategory from "../../../../Hooks/useCategory";
import useSkinType from "../../../../Hooks/useSkinType";

const ModalAddProduct = ({ isModalOpen, handleCancel, handleAdd }) => {
  const [form] = Form.useForm();
  const { categories } = useCategory();
  const { skinTypes, loading } = useSkinType();

  useEffect(() => {
    if (isModalOpen) {
      form.resetFields(); // Always reset form when modal opens
    }
  }, [isModalOpen]);

  const handleSubmit = () => {
    form.validateFields()
      .then((values) => {
        handleAdd(values);
        toast.success("Thêm sản phẩm mới thành công!");
        form.resetFields();
      })
      .catch((info) => {
        console.error("Validation Failed:", info);
      });
  };

  return (
    <Modal
      title="Tạo sản phẩm mới"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Tạo sản phẩm
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Tên sản phẩm" name="productName" rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Mô tả" name="description" rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Giá tiền" name="price" rules={[{ required: true, message: "Vui lòng nhập giá!" }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Số lượng" name="quantity" rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Loại sản phẩm" name="CategoryId" rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm!" }]}>
          <Select loading={loading} placeholder="Chọn loại sản phẩm">
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.categoryName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Loại da" name="SkinTypeId" rules={[{ required: true, message: "Vui lòng chọn loại da!" }]}>
          <Select loading={loading} placeholder="Chọn loại da">
            {skinTypes.map((skinType) => (
              <Select.Option key={skinType.id} value={skinType.id}>
                {skinType.skinTypeName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Ảnh sản phẩm" name="image" rules={[{ required: true, message: "Vui lòng nhập URL ảnh!" }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddProduct;
