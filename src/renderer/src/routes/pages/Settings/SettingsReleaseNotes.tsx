import { useTranslation } from 'react-i18next'
import { MdLaunch } from 'react-icons/md'
import Markdown from 'react-markdown'
import releaseNotes from '@renderer/assets/release-notes.json'
import { Link } from '@renderer/components/Link'
import { Separator } from '@renderer/components/Separator'
import rehypeRaw from 'rehype-raw'

import 'github-markdown-css/github-markdown.css'

export const SettingsReleaseNotesPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'settings.settingsReleaseNotes' })

  return (
    <div className="w-full">
      <div className="p-4">
        <h1 className="text-white pb-4 text-sm">{t('title')}</h1>
        <Separator className="mb-4" />
        <div className="overflow-y-scroll h-[70vh]">
          {releaseNotes.map(item => {
            return (
              <div key={item.tag_name} className="pb-10">
                <div className="text-gray-300 text-xs">{item.published_at}</div>
                <div className="text-white text-lg my-3">{item.tag_name}</div>
                <div
                  className="markdown-body"
                  color={'white'}
                  style={{ backgroundColor: 'transparent', fontSize: '12px', paddingBottom: '15px' }}
                >
                  <Markdown rehypePlugins={[rehypeRaw]}>{item.body}</Markdown>
                </div>
                {item.html_url && (
                  <div className="w-40 mt-3">
                    <Link
                      target="_blank"
                      to={item.html_url}
                      label={t('button.learnMore')}
                      rightIcon={<MdLaunch />}
                      variant="outlined"
                      clickableProps={{ className: 'h-10' }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
