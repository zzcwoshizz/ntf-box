import DiscordSvg from '@icons/dapp_discord.svg'
import IntroSvg from '@icons/dapp_intro.svg'
import TelegramSvg from '@icons/dapp_telegram.svg'
import TwitterSvg from '@icons/dapp_twitter.svg'
import WebsiteSvg from '@icons/dapp_website.svg'
import { Popover, Tag, Typography } from 'antd'
import React from 'react'

import { AssetType, IProject } from '@/api/types'
import useTheme from '@/shared/hooks/useTheme'
import { useConstants } from '@/shared/providers/ConstantsProvider'
import { useLanguage } from '@/shared/providers/LanguageProvider'
import { hex2rgba } from '@/utils/color'

const { Text } = Typography

const ProjectInfo: React.FunctionComponent<{ project: IProject }> = ({ project }) => {
  const theme = useTheme()
  const { t } = useLanguage()
  const { ASSET_TYPES } = useConstants()

  return (
    <>
      <div className="container">
        {project.website && (
          <div className="item" onClick={() => window.open(project.website)}>
            <WebsiteSvg />
            {t('project.projectInfo.website')}
          </div>
        )}
        {project.des && (
          <Popover
            overlayClassName="project-info-popover"
            trigger="hover"
            content={
              <div>
                <div className="popover-content">
                  <Text type="secondary">{project.des}</Text>
                </div>
                <div className="popover-footer">
                  <Tag
                    style={{ color: theme['@primary-color'] }}
                    color={hex2rgba(theme['@primary-color'], 0.06)}>
                    {t('project.projectInfo.ranking')}: {project.ranking}
                  </Tag>
                  {project.type.split(',').map((type, index) => {
                    const typeText = ASSET_TYPES[type as AssetType]
                    return typeText ? (
                      <Tag
                        style={{ color: theme['@primary-color'] }}
                        color={hex2rgba(theme['@primary-color'], 0.06)}
                        key={index}>
                        {typeText}
                      </Tag>
                    ) : null
                  })}
                </div>
              </div>
            }
            placement="bottomLeft">
            <div className="item">
              <IntroSvg />
              {t('project.projectInfo.intro')}
            </div>
          </Popover>
        )}
        {project.discord && (
          <div className="item" onClick={() => window.open(project.discord, '_blank')}>
            <DiscordSvg />
            Discord
          </div>
        )}
        {project.telegram && (
          <div className="item" onClick={() => window.open(project.telegram, '_blank')}>
            <TelegramSvg />
            Telegram
          </div>
        )}
        {project.twitter && (
          <div className="item" onClick={() => window.open(project.twitter, '_blank')}>
            <TwitterSvg />
            Twitter
          </div>
        )}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
        }

        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 55px;
          padding: 0 10px;
          border-left: 1px solid ${theme['@border-color-base']};

          cursor: pointer;
        }
        .item:hover {
          background-color: ${theme['@primary-color']};
          color: #fff;
        }
        .item:hover > :global(svg path) {
          fill: #fff;
          opacity: 1;
        }

        .popover-content {
          padding: 10px 16px;
        }

        .popover-footer {
          border-top: 1px solid ${theme['@border-color-base']};
          padding: 16px;
        }

        :global(.project-info-popover) {
          max-width: 300px;
        }
        :global(.ant-popover-inner-content) {
          padding: 0;
        }
      `}</style>
    </>
  )
}

export default ProjectInfo
