import { utils } from 'ethers';
import React from 'react';

import { IProject } from '@/api/types';
import useTheme from '@/shared/hooks/useTheme';
import { useLanguage } from '@/shared/providers/LanguageProvider';

const ProjectData: React.FunctionComponent<{ project?: IProject }> = ({ project }) => {
  const theme = useTheme();
  const { t } = useLanguage();

  if (!project) {
    return null;
  }

  return (
    <>
      <div className="content">
        <div className="item">
          {t('project.projectData.holder')}
          <span>{project.owners}</span>
        </div>
        <div className="item">
          {t('project.projectData.avgPrice')}
          <span>{utils.formatEther(project.avgPrice ?? '0')}ETH</span>
        </div>
        <div className="item">
          {t('project.projectData.turnover')}
          <span>{utils.formatEther(project.total ?? '0')}ETH</span>
        </div>
      </div>
      <style jsx>{`
        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 48px;
          border-bottom: 1px solid ${theme['@border-color-base']};
        }
        .item > span {
          color: ${theme['@text-color-tertiary']};
        }
      `}</style>
    </>
  );
};

export default ProjectData;
