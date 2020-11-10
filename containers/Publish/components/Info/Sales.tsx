import { Form, Input } from 'antd';
import React from 'react';

import { useLanguage } from '@/shared/providers/LanguageProvider';

import Content from './Content';
import Select from './Select';

const Sales: React.FunctionComponent = () => {
  const { t } = useLanguage();

  return (
    <Content title={t('publish.saleMethod')}>
      <Select options={[{ value: '1', title: t('publish.fixPrice') }]} value="1"></Select>
      <Form.Item
        label={t('publish.priceLabel')}
        name="price"
        rules={[{ required: true }]}
        style={{ width: '48%', marginTop: 16 }}
      >
        <Input addonAfter="ETH" placeholder={t('publish.inputPrice')} />
      </Form.Item>
    </Content>
  );
};

export default Sales;
