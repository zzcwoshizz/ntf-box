import { DatePicker, Form } from 'antd';
import React from 'react';

import { useLanguage } from '@/shared/providers/LanguageProvider';

import Content from './Content';
import Select from './Select';

const Setting: React.FunctionComponent = () => {
  const { t } = useLanguage();

  return (
    <Content title={t('publish.saleMethod')}>
      <Select options={[{ value: '1', title: t('publish.otherSetting') }]} value="1"></Select>
      <Form.Item
        label={t('publish.timeLabel')}
        name="expiredTime"
        style={{ width: '48%', marginTop: 16 }}
      >
        <DatePicker
          disabledDate={(date) => date.valueOf() < Date.now()}
          placeholder={t('publish.inputTime')}
          style={{ width: '100%' }}
        />
      </Form.Item>
    </Content>
  );
};

export default Setting;
