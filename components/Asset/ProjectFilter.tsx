import { Input, Space } from 'antd';
import Link from 'next/link';
import React from 'react';

import { IProject } from '@/api/types';
import { AssetItem } from '@/components/Asset';
import CloseSvg from '@/icons/close.svg';
import FhWhiteSvg from '@/icons/icon_fh_white.svg';
import SearchSvg from '@/icons/icon_search.svg';
import useTheme from '@/shared/hooks/useTheme';
import { useLanguage } from '@/shared/providers/LanguageProvider';

import Img from '../Img';

// <Menu mode="inline">
//   <SubMenu key="sub1" title="A selection-type">
//     <div className="menu-child">
//       <Checkbox.Group>
//         <Row>
//           <Checkbox value="A">A</Checkbox>
//         </Row>
//         <Row>
//           <Checkbox value="B">B</Checkbox>
//         </Row>
//         <Row>
//           <Checkbox value="C">C</Checkbox>
//         </Row>
//         <Row>
//           <Checkbox value="D">D</Checkbox>
//         </Row>
//         <Row>
//           <Checkbox value="E">E</Checkbox>
//         </Row>
//       </Checkbox.Group>
//     </div>
//   </SubMenu>
//   <SubMenu key="sub2" title="B rating-progress">
//     <div className="menu-child">
//       <Slider range step={1} defaultValue={[20, 50]} />
//       <div className="range">
//         <div>
//           <label>Minimum</label>
//           <br />
//           189,219,287
//         </div>
//         <span>-</span>
//         <div>
//           <label>Maximum</label>
//           <br />
//           189,219,287
//         </div>
//       </div>
//     </div>
//   </SubMenu>
// </Menu>

export interface Props {
  projects: IProject[];
  project?: IProject;
  showItemExtra?: boolean;
  showHead?: boolean;
  onSelectProject?(project?: IProject): void;
  renderDetail?(): React.ReactNode;
}

const ActivityFilter: React.FunctionComponent<Props> = ({
  projects,
  project,
  showItemExtra = true,
  showHead = true,
  onSelectProject,
  renderDetail
}) => {
  const theme = useTheme();
  const { t } = useLanguage();

  const [search, setSearch] = React.useState('');

  const filterdProjects = React.useMemo(
    () =>
      projects.filter((project) => project.name.toUpperCase().indexOf(search.toUpperCase()) > -1),
    [search, projects]
  );

  return (
    <>
      <div className="container">
        {showHead && (
          <div className="head">
            <Space>
              <FhWhiteSvg />
              {t('asset.filter.title')}
            </Space>
          </div>
        )}
        <div className="search">
          <Input
            onChange={(e) => {
              if (!project?.name) {
                setSearch(e.target.value);
              }
            }}
            placeholder="Search"
            prefix={project ? <Img src={project.logoUrl} width={16} /> : <SearchSvg />}
            suffix={
              project && (
                <CloseSvg onClick={() => onSelectProject?.()} style={{ cursor: 'pointer' }} />
              )
            }
            value={project?.name ?? search}
          />
        </div>
        <div className="list">
          {project
            ? renderDetail?.()
            : filterdProjects.map((project, index) => (
                <Link
                  as={{ pathname: '/market', query: { id: project.id, name: project.name } }}
                  href="/market"
                  key={index}
                >
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectProject?.(project);
                    }}
                  >
                    <AssetItem
                      extra={showItemExtra ? project.num : null}
                      icon={project.logoUrl}
                      title={project.name}
                    />
                  </a>
                </Link>
              ))}
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          border: 1px solid ${theme['@border-color-base']};

          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #f2f3f3;

          overflow: hidden;
        }

        .head {
          display: flex;
          align-items: center;
          height: 55px;
          padding: 0 15px;
          background-color: ${theme['@primary-color']};

          font-size: 16px;
          font-weight: bold;
          color: #fff;
        }

        .search {
          height: 50px;
          padding: 15px 15px 0 15px;
        }
        .search :global(.ant-input-affix-wrapper) {
          height: 35px;
          border-left: none;
          border-right: none;
          border-top: none;
          border-radius: 0;
          box-shadow: none;
        }

        .list {
          height: 100%;
          overflow: scroll;
        }

        .list :global(.ant-menu-submenu-title) {
          padding-left: 16px !important;
        }

        .menu-child {
          padding: 15px 20px;
          background-color: ${theme['@body-background']};
        }

        a {
          color: ${theme['@text-color']};
        }

        .range {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .range > span {
          margin: 0 5px;
        }
        .range > div {
          padding: 6px;
          border-radius: 4px;
          background-color: #fff;
          color: ${theme['@text-color-tertiary']};
          font-size: 12px;
          line-height: 12px;
        }
        .range > div label {
          color: ${theme['@disabled-color']};
        }
      `}</style>
    </>
  );
};

export default ActivityFilter;
