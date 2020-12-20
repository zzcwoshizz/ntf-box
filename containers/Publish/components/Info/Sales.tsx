import { Form, Input, Space } from 'antd';
import React from 'react';

import Tip_WETH from '@/components/Tip/Tip_WETH';
import { useLanguage } from '@/shared/providers/LanguageProvider';

import { useData } from '../../context';
import Content from './Content';
import Select from './Select';

const Sales: React.FunctionComponent = () => {
  const { t } = useLanguage();
  const { value, setValue } = useData();

  return (
    <Content title={t('publish.saleMethod')}>
      <Select
        onChange={(value: '1' | '2') => {
          setValue(value);
        }}
        options={[
          { value: '1', title: t('publish.fixPrice') },
          { value: '2', title: t('publish.offer') }
        ]}
        value={value}
      ></Select>
      <Form.Item
        label={t('publish.priceLabel')}
        name="price"
        rules={[{ required: true }]}
        style={{ width: '48%', marginTop: 16 }}
      >
        <Input
          addonAfter={
            value === '1' ? (
              'ETH'
            ) : (
              <Space>
                WETH
                <Tip_WETH />
              </Space>
            )
          }
          placeholder={t('publish.inputPrice')}
        />
      </Form.Item>
    </Content>
  );
};

export default Sales;
