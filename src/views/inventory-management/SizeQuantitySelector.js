import React from "react";
import { Form, Select, Input, Space } from "antd";

const SizeQuantitySelector = ({ restField, name, fieldKey }) => {
  const sizes = [
    { label: "Small", value: "S" },
    { label: "Medium", value: "M" },
    { label: "Large", value: "L" },
    { label: "Extra Large", value: "XL" },
    { label: "XXL", value: "XXL" },
  ];

  return (
    <Form.List name={[name, "sizes"]} key={fieldKey}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
              <Form.Item
                {...restField}
                name={[name, "size"]}
                fieldKey={[fieldKey, "size"]}
                rules={[
                  {
                    required: true,
                    message: "Please select a size",
                  },
                ]}
              >
                <Select placeholder="Select Size" options={sizes} />
              </Form.Item>

              <Form.Item
                {...restField}
                name={[name, "quantity"]}
                fieldKey={[fieldKey, "quantity"]}
                rules={[
                  {
                    required: true,
                    message: "Please enter a quantity",
                  },
                ]}
              >
                <Input placeholder="Quantity" type="number" min={1} />
              </Form.Item>

              <a onClick={() => remove(name)}>Remove</a>
            </Space>
          ))}
          <Form.Item>
            <a onClick={() => add()}>Add Size</a>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default SizeQuantitySelector;