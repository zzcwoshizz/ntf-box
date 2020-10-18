import DiscordSvg from '@icons/dapp_discord.svg'
import IntroSvg from '@icons/dapp_intro.svg'
import TelegramSvg from '@icons/dapp_telegram.svg'
import TwitterSvg from '@icons/dapp_twitter.svg'
import WebsiteSvg from '@icons/dapp_website.svg'
import { Popover, Typography } from 'antd'
import React from 'react'

import { IProject } from '@/api/types'
import useTheme from '@/shared/hooks/useTheme'
import { useLanguage } from '@/shared/providers/LanguageProvider'

const { Text } = Typography

const ProjectInfo: React.FunctionComponent<{ project: IProject }> = ({ project }) => {
  const theme = useTheme()
  const { t } = useLanguage()

  return (
    <>
      <div className="container">
        {project.website && (
          <div className="item" onClick={() => window.open(project.website)}>
            <WebsiteSvg />
            {t('project.projectInfo.website')}
          </div>
        )}
        {project.alias && (
          <Popover
            overlayClassName="project-info-popover"
            trigger="hover"
            content={<Text type="secondary">{project.alias}</Text>}
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

        :global(.project-info-popover) {
          max-width: 300px;
        }
      `}</style>
    </>
  )
}

export default ProjectInfo
