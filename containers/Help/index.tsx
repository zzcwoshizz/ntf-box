import { Card, Collapse, Input, Typography } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

import { getHelp } from '@/api';
import { IHelp } from '@/api/types';
import Header from '@/components/Header';
import Container from '@/components/Layout/Container';
import { useList } from '@/shared/hooks/useList';
import useTheme from '@/shared/hooks/useTheme';
import { useLanguage } from '@/shared/providers/LanguageProvider';
import { hex2rgba } from '@/utils/color';

const { Title } = Typography;
const { Panel } = Collapse;
const { Search } = Input;

const Help: React.FunctionComponent = () => {
  const theme = useTheme();
  const { query } = useRouter();
  const { t, lang } = useLanguage();

  const { state, action } = useList<IHelp, { keys?: string }>(
    React.useCallback(
      async (params) => {
        const { list, hasNextPage, total } = await getHelp({
          page: params.page,
          pageSize: params.pageSize,
          search: params.keys
        });

        return {
          list,
          hasMore: hasNextPage,
          total
        };
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [lang]
    ),
    { keys: query.keys as string },
    { page: 1, pageSize: 20 }
  );

  return (
    <>
      <Header />
      <Container style={{ margin: '25px auto' }}>
        <Title>{t('help.title')}</Title>
        <div className="content">
          <Card
            extra={
              <Search
                onSearch={(value) => action.setFilter({ keys: value })}
                placeholder={t('help.inputKeys')}
                style={{ width: 200 }}
              />
            }
            loading={state.fetching}
            title={
              <div className="title">{t('help.messages', { count: state.pagination.total })}</div>
            }
          >
            <Collapse>
              {state.list.map((help) => (
                <Panel header={help.title} key={help.id} showArrow={false}>
                  <p>{help.des}</p>
                </Panel>
              ))}
            </Collapse>
          </Card>
        </div>
      </Container>
      <style jsx>{`
        .title {
          display: inline-block;
          padding: 0 16px;
          border-radius: 16px;
          line-height: 32px;
          color: ${theme['@disabled-color']};
          background-color: ${hex2rgba(theme['@primary-color'], 0.06)};
        }
        .content {
          background-color: #fff;
        }

        p {
          margin: 0;
          padding: 16px;

          font-size: 14px;
          color: ${theme['@text-color-tertiary']};
          line-height: 22px;

          background-color: ${theme['@body-background']};
        }
      `}</style>
    </>
  );
};

export default Help;
