import {useEffect, useState} from 'react'
import {Accordion, Card} from 'react-bootstrap'
import {Trans, useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Layout from '../shared/components/layout'
import {CustomToggle} from '../shared/components/toggle'

import {useHash} from '../shared/useHash'

export default function Contribute() {
  const [activeHash, setActiveHash] = useState()
  const [hash] = useHash()

  const {t} = useTranslation('contribute')

  useEffect(() => {
    setActiveHash(hash)
  }, [hash])

  return (
    <Layout
      title={t(`How to contribute to Idena`, {ns: 'contribute'})}
      description={t(
        `Idena is an open source project and the Idena community is its key driving force.`,
        {ns: 'contribute'}
      )}
    >
      <section
        className="section section_content menu_section_content menu_contribute"
        id="contribute"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <div className="section_header">
                <h3 className="h1">
                  {t('How to contribute', {ns: 'contribute'})}
                </h3>
                <p className="hint text-center">
                  {t(
                    'Idena is an open source project and the Idena community is its key driving force. Every community member should have an opportunity to contribute and get a reward.',
                    {ns: 'contribute'}
                  )}
                </p>
              </div>

              <h2>{t('1. Distribute invitations', {ns: 'contribute'})}</h2>

              <p>
                {t(
                  `Idena's ambition is to be truly global and diverse. We would like people from various countries and of all languages to join Idena. If you speak a language other than English that is a valuable asset. Start and grow a new community in your own language, take your time to educate them about Idena and help them join the network.`,
                  {ns: 'contribute'}
                )}
              </p>

              <h4>
                {t('Non-official Idena community channels', {ns: 'contribute'})}
              </h4>
              <ul>
                <li>
                  <a href="https://discuss.idena.site/">
                    {t('Idena Forum', {ns: 'contribute'})}
                  </a>{' '}
                  {t('Posts allowed for Idena validated participants', {
                    ns: 'contribute',
                  })}
                </li>
                <li>
                  <a href="https://discord.gg/8BusRj7">Discord</a>{' '}
                  {t(
                    'English-speaking with Serbian/Croatian/French/Polish language local room (Sign-in with Idena enabled)',
                    {ns: 'contribute'}
                  )}
                </li>
                <li>
                  <a href="https://discord.gg/AaW3kSH">Discord</a>{' '}
                  {t('French-speaking local room', {ns: 'contribute'})}
                </li>
                <li>
                  <a href="https://t.me/Idena_FR">Telegram</a>{' '}
                  {t('French-speaking telegram group', {ns: 'contribute'})}
                </li>
                <li>
                  <a href="https://t.me/Idena_RU">Telegram</a>{' '}
                  {t('Russian-speaking group', {ns: 'contribute'})}
                </li>
                <li>
                  <a href="https://t.me/idena_indonesia">Telegram</a>{' '}
                  {t('Indonesian-speaking group', {ns: 'contribute'})}
                </li>
                <li>
                  <a href="https://t.me/idena_india">Telegram</a>{' '}
                  {t('Indian telegram group', {ns: 'contribute'})}
                </li>
                <li>
                  <a href="https://bitcointalk.org/index.php?topic=5194871.new#new">
                    Bitcointalk
                  </a>{' '}
                  {t('non-official forum', {ns: 'contribute'})}
                </li>
                <li>
                  <a href="https://www.altcoinstalks.com/index.php?topic=185607.0">
                    Altcoinstalks
                  </a>{' '}
                  {t('non-official forum', {ns: 'contribute'})}
                </li>
              </ul>

              <Accordion
                activeKey={activeHash}
                onSelect={e => setActiveHash(e)}
              >
                <Card id="contribute-1-1">
                  <Card.Header>
                    <CustomToggle eventKey="#contribute-1-1">
                      {t('How to proceed', {ns: 'contribute'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#contribute-1-1">
                    <div className="card-body">
                      <p>
                        {t(
                          '1. Start a community on any platform that is popular in your country or which you are familiar with best.',
                          {ns: 'contribute'}
                        )}
                      </p>
                      <p>
                        {t(
                          '2. Use your network and other resources to attract people.',
                          {ns: 'contribute'}
                        )}{' '}
                      </p>
                      <p>
                        {t(
                          '3. Educate the community about Idena. Feel free to reach out to the Idena community members or the Idena team if you need more data or explanations that you cannot find on the Idena website or in the Idena blog.',
                          {ns: 'contribute'}
                        )}{' '}
                      </p>
                      <p>
                        <Trans
                          i18nKey="applyForRefferalLink"
                          t={t}
                          ns="contribute"
                        >
                          4.{' '}
                          <a href="https://docs.idena.io/docs/community/affiliate">
                            Apply for a referral link
                          </a>
                          , share it with your community, and get rewards for
                          successful invitations.
                        </Trans>
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <h2>{t('2. Spread the word', {ns: 'contribute'})}</h2>

              <p>
                {t(
                  'We invite all the Idena community members to participate in Idena marketing activities: Pick what you would like to do (pitch a blogger or a journalist or participate in events by giving talks) from the list of marketing activities, implement it and apply for a reward at info@idena.io.',
                  {ns: 'contribute', nsSeparator: '!'}
                )}
              </p>
              <p>
                {t(
                  'If you need help or advice (like additional information about Idena or a comment from a team member) please do not hesitate to ping Idena community admins or @AndrewIdena telegram account.',
                  {ns: 'contribute'}
                )}
              </p>

              <Accordion
                activeKey={activeHash}
                onSelect={e => setActiveHash(e)}
              >
                <Card id="contribute-2-1">
                  <Card.Header>
                    <CustomToggle eventKey="#contribute-2-1">
                      {t('Media relations (pitch a journalist)', {
                        ns: 'contribute',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#contribute-2-1">
                    <div className="card-body">
                      <p>
                        {t(
                          'There are a lot of international and national mass media that might be interested in covering Idena. If we join forces we can get their attention. Reputable tech, crypto, finance and business media are of primary interest. Spotting and pitching journalists that could potentially be interested in learning about Idena is what we need.',
                          {ns: 'contribute'}
                        )}
                      </p>

                      <div className="tab-content block">
                        <div className="tab-pane show active" role="tabpanel">
                          <div className="table-responsive">
                            <table className="table">
                              <tr>
                                <th>{t('Activity', {ns: 'contribute'})}</th>
                                <th>{t('Audience', {ns: 'contribute'})}</th>
                                <th>
                                  <Trans
                                    i18nKey="rewardInIdna"
                                    t={t}
                                    ns="contribute"
                                  >
                                    Reward (*)
                                    <br />
                                    paid in iDNA
                                  </Trans>
                                </th>
                              </tr>

                              <tr>
                                <td>
                                  {t(
                                    'Tier 1 media piece (article, podcast episode...)',
                                    {ns: 'contribute'}
                                  )}
                                  <p className="participation-hint">
                                    {t(
                                      'Reputable international tech, crypto, finance or business media: Business Insider, Techcrunch, Coindesk...',
                                      {ns: 'contribute', nsSeparator: '!'}
                                    )}
                                  </p>
                                </td>
                                <td>10M+</td>
                                <td>$5,000</td>
                              </tr>
                              <tr>
                                <td>
                                  {t('Tier 1 quality media mention', {
                                    ns: 'contribute',
                                  })}
                                </td>
                                <td>10M+</td>
                                <td>$2,500</td>
                              </tr>

                              <tr>
                                <td>
                                  {t(
                                    'Tier 2 media piece (article, podcast episode...)',
                                    {ns: 'contribute'}
                                  )}
                                  <p className="participation-hint">
                                    {t(
                                      'Reputable international tech, crypto, finance or business media: Wired UK, Cointelegraph...',
                                      {ns: 'contribute', nsSeparator: '!'}
                                    )}
                                  </p>
                                </td>
                                <td>1M+</td>
                                <td>$2,500</td>
                              </tr>
                              <tr>
                                <td>Tier 2 quality mention</td>
                                <td>1M+</td>
                                <td>$1,000</td>
                              </tr>

                              <tr>
                                <td>
                                  {t(
                                    'Tier 2 media piece (article, podcast episode...)',
                                    {ns: 'contribute'}
                                  )}
                                  <p className="participation-hint">
                                    {t(
                                      'Tech, crypto, finance or business media',
                                      {ns: 'contribute'}
                                    )}
                                  </p>
                                </td>
                                <td>300K+</td>
                                <td>$600</td>
                              </tr>
                              <tr>
                                <td>
                                  {t('Tier 3 quality media mention', {
                                    ns: 'contribute',
                                  })}
                                </td>
                                <td>300K+</td>
                                <td>$300</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>

                      <h4>{t('How to proceed', {ns: 'contribute'})}</h4>
                      <p>
                        {t(
                          '1. Spot a reputable journalist that might be interested in learning and telling their audience about Idena.',
                          {ns: 'contribute'}
                        )}{' '}
                      </p>
                      <p>
                        {t(
                          '2. Contact them and educate them about Idena: why you consider the project unique and valuable, what makes you support it. Learn more about the journalist you are going to pitch and be creative: They receive hundreds of messages every day, your pitch should stand out. Be polite and respectful. Please note: We will not pay journalists for publications. They should get interested in covering Idena because they see value for their audience in it.',
                          {ns: 'contribute', nsSeparator: '!'}
                        )}{' '}
                      </p>
                      <p>
                        {t(
                          '3. When you receive a reply, provide additional information. Feel free to reach out to the Idena community or the Idena team if you need more data or explanations that you cannot find on the Idena website or in the Idena blog.',
                          {ns: 'contribute'}
                        )}{' '}
                      </p>
                      <p>
                        {t(
                          `4. This may be the right time to email proof of your communications at info@idena.io. Please don't do it until you get a positive reply.`,
                          {ns: 'contribute'}
                        )}{' '}
                      </p>
                      <p>
                        {t(
                          `5. When a publication is out (the result may be a full media piece about Idena or a quality mention - not just the name of the project, but also the project's description), email the link to it and your Idena wallet address at info@idena.io and get a reward.`,
                          {ns: 'contribute'}
                        )}{' '}
                      </p>
                      <p>
                        {t(
                          `6. A publication may often be a result of a joint effort. If more than one community member claims that their independent communication with a journalist resulted in a publication, the reward is paid to three community members with the most substantial and quality communication with the publication's author out of those who emailed us their proof before the publication is out.`,
                          {ns: 'contribute'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="contribute-2-2">
                  <Card.Header>
                    <CustomToggle eventKey="#contribute-2-2">
                      {t('Blogger relatons (pitch a blogger)', {
                        ns: 'contribute',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#contribute-2-2">
                    <div className="card-body">
                      <p>
                        {t(
                          'Bloggers today are sometimes more powerful than media. They are modern mass media with huge audiences and dedicated subscribers. We need your help with finding bloggers and influencers with high quality content in the areas of crypto, tech, finance, human rights on YouTube, Twitter, Medium or any other platform. Pitch Idena to them and get them interested in covering Idena.',
                          {ns: 'contribute'}
                        )}{' '}
                      </p>

                      <div className="tab-content block">
                        <div className="tab-pane show active" role="tabpanel">
                          <div className="table-responsive">
                            <table className="table">
                              <tr>
                                <th>{t('Activity', {ns: 'contribute'})}</th>
                                <th>{t('Audience', {ns: 'contribute'})}</th>
                                <th>
                                  <Trans
                                    i18nKey="rewardInIdna"
                                    t={t}
                                    ns="contribute"
                                  >
                                    Reward (*)
                                    <br />
                                    paid in iDNA
                                  </Trans>
                                </th>
                              </tr>

                              <tr>
                                <td>
                                  {t(
                                    'Tier 1 blog piece (article, podcast episode...)',
                                    {ns: 'contribute'}
                                  )}
                                </td>
                                <td>200K+</td>
                                <td>$2,000</td>
                              </tr>
                              <tr>
                                <td>
                                  {t('Tier 1 quality mention', {
                                    ns: 'contribute',
                                  })}
                                </td>
                                <td>200K+</td>
                                <td>$1,000</td>
                              </tr>

                              <tr>
                                <td>
                                  {t(
                                    'Tier 2 blog piece (article, podcast episode...)',
                                    {ns: 'contribute'}
                                  )}
                                </td>
                                <td>70K+</td>
                                <td>$900</td>
                              </tr>
                              <tr>
                                <td>
                                  {t('Tier 2 quality mention', {
                                    ns: 'contribute',
                                  })}
                                </td>
                                <td>70K+</td>
                                <td>$450</td>
                              </tr>

                              <tr>
                                <td>
                                  {t(
                                    'Tier 3 blog piece (article, podcast episode...)',
                                    {ns: 'contribute'}
                                  )}
                                </td>
                                <td>30K+</td>
                                <td>$300</td>
                              </tr>
                              <tr>
                                <td>
                                  {t('Tier 3 quality mention', {
                                    ns: 'contribute',
                                  })}
                                </td>
                                <td>30K+</td>
                                <td>$150</td>
                              </tr>

                              <tr>
                                <td>
                                  {t(
                                    'Tier 4 blog piece (article, podcast episode...)',
                                    {ns: 'contribute'}
                                  )}
                                </td>
                                <td>5K+</td>
                                <td>$100</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>

                      <h4>{t('How to proceed', {ns: 'contribute'})}</h4>
                      <p>
                        {t(
                          '1. Spot a reputable blogger (crypto, tech, finance, human rights) that might be interested in learning and telling their audience about Idena.',
                          {ns: 'contribute'}
                        )}{' '}
                      </p>
                      <p>
                        {t(
                          '2. Contact them and educate them about Idena: why you consider the project unique and valuable, what makes you support it. Learn more about the blogger you are going to pitch and be creative: They receive hundreds of messages every day, your pitch should stand out. Be polite and respectful. Please note: We will not pay bloggers for publications. They should get interested in covering Idena because they see value for their audience in it.',
                          {ns: 'contribute', nsSeparator: '!'}
                        )}{' '}
                      </p>
                      <p>
                        {t(
                          '3. When you receive a reply, provide additional information. Feel free to reach out to the Idena community or the Idena team if you need more data or explanations that you cannot find on the Idena website or in the Idena blog.',
                          {ns: 'contribute'}
                        )}{' '}
                      </p>
                      <p>
                        {t(
                          `4. This may be the right time to email proof of your communications at info@idena.io. Please don't do it until you get a positive reply.`,
                          {ns: 'contribute'}
                        )}{' '}
                      </p>
                      <p>
                        {t(
                          `5. When a publication is out (the result may be a full media piece about Idena or a quality mention - not just the name of the project, but also the project's description), email the link to it and your Idena wallet address at info@idena.io and get a reward.`,
                          {ns: 'contribute'}
                        )}{' '}
                      </p>
                      <p>
                        {t(
                          `6. A publication may often be a result of a joint effort. If more than one community member claims that their independent communication with a blogger resulted in a publication, the reward is paid to three community members with the most substantial and quality communication with the publication's author out of those who emailed us their proof before the publication is out.`,
                          {ns: 'contribute'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="contribute-2-3">
                  <Card.Header>
                    <CustomToggle eventKey="#contribute-2-3">
                      {t('Events (giving talks about Idena)', {
                        ns: 'contribute',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#contribute-2-3">
                    <div className="card-body">
                      <p>
                        {t(
                          `The Idena community is very diverse and distributed all over the world. It's very likely that there is a knowledgeable and passionate Idena community member in locations where major international and national tech, crypto, finance and business conferences take place. There is also a lot happening online these days. Apply for the event participation and give a talk.`,
                          {ns: 'contribute'}
                        )}{' '}
                      </p>

                      <div className="tab-content block">
                        <div className="tab-pane show active" role="tabpanel">
                          <div className="table-responsive">
                            <table className="table">
                              <tr>
                                <th>{t('Activity', {ns: 'contribute'})}</th>
                                <th>{t('Audience', {ns: 'contribute'})}</th>
                                <th>
                                  <Trans
                                    i18nKey="rewardInIdna"
                                    t={t}
                                    ns="contribute"
                                  >
                                    Reward (*)
                                    <br />
                                    paid in iDNA
                                  </Trans>
                                </th>
                              </tr>

                              <tr>
                                <td>
                                  {t('Tier 1 event participation', {
                                    ns: 'contribute',
                                  })}
                                  <p className="participation-hint">
                                    {t(
                                      'International tech, crypto, finance or business event',
                                      {ns: 'contribute'}
                                    )}
                                  </p>
                                </td>
                                <td>7K+</td>
                                <td>$3,000</td>
                              </tr>

                              <tr>
                                <td>
                                  {t('Tier 2 event participation', {
                                    ns: 'contribute',
                                  })}
                                  <p className="participation-hint">
                                    {t(
                                      'International or national tech, crypto, finance or business event',
                                      {ns: 'contribute'}
                                    )}
                                  </p>
                                </td>
                                <td>3.5K+</td>
                                <td>$1,000</td>
                              </tr>

                              <tr>
                                <td>
                                  {t('Tier 3 event participation', {
                                    ns: 'contribute',
                                  })}
                                  <p className="participation-hint">
                                    {t(
                                      'International or national tech, crypto, finance or business event',
                                      {ns: 'contribute'}
                                    )}
                                  </p>
                                </td>
                                <td>250+</td>
                                <td>$150</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>

                      <h4>How to proceed</h4>
                      <p>
                        {t(
                          '1. Spot an event that might be suitable for telling about Idena.',
                          {ns: 'contribute'}
                        )}{' '}
                      </p>
                      <p>
                        {t(
                          '2. Contact the organizers and suggest a topic that could be of interest to their audience and allow telling about Idena. Be polite and respectful.',
                          {ns: 'contribute'}
                        )}{' '}
                      </p>
                      <p>
                        {t(
                          '3. Prepare a presentation. Feel free to reach out to the Idena community or the Idena team if you need more data or explanations that you cannot find on the Idena website or in the Idena blog.',
                          {ns: 'contribute'}
                        )}{' '}
                      </p>
                      <p>
                        {t(
                          '4. Give a presentation and get a video or photo proof of your participation and the audience size.',
                          {ns: 'contribute'}
                        )}
                      </p>
                      <p>
                        {t(
                          `5. Email a link to the event's webpage, a video or a photo proof and your Idena wallet address at info@idena.io and get a reward.`,
                          {ns: 'contribute'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <h2>{t('3. Build on top', {ns: 'contribute'})}</h2>

              <p>
                {t(
                  'Follow development challenges run by Idena or take the initiative to realize an idea of your own.',
                  {ns: 'contribute'}
                )}
              </p>

              <h2>{t('4. Bug bounty program', {ns: 'contribute'})}</h2>

              <p>
                {t(
                  'Idena invites software security researchers to participate in the bug bounty program to hunt down its vulnerabilities.',
                  {ns: 'contribute'}
                )}
              </p>

              <Accordion
                activeKey={activeHash}
                onSelect={e => setActiveHash(e)}
              >
                <Card id="contribute-3-1">
                  <Card.Header>
                    <CustomToggle eventKey="#contribute-3-1">
                      {t('How to proceed', {ns: 'contribute'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#contribute-3-1">
                    <div className="card-body">
                      <p>
                        {t(
                          'If you believe that you have found a security vulnerability in the Idena node or Idena app, we encourage you to report it to the Idena team.',
                          {ns: 'contribute'}
                        )}
                      </p>
                      <p>
                        {t(
                          `The Idena team will reward security researchers who help us keep the Idena blockchain and Idena users' accounts safe. Bounties for such reports are entirely at Idena's discretion, based on risk, impact and other factors.`,
                          {ns: 'contribute'}
                        )}
                      </p>
                      <p>
                        {t(
                          '1. Identify a vulnerability which creates a security risk and describe the problem.',
                          {ns: 'contribute'}
                        )}
                      </p>
                      <p>
                        {t('2. Submit your report via email: info@idena.io', {
                          ns: 'contribute',
                          nsSeparator: '!',
                        })}
                      </p>
                      <p>
                        {t(
                          '3. Give the Idena team time to investigate the issue before making any information in or about the report public.',
                          {ns: 'contribute'}
                        )}
                      </p>
                      <p>
                        {t(
                          '4. The Idena team determines bounty amounts based on a variety of factors, including impact, possible risks and quality of the report.',
                          {ns: 'contribute'}
                        )}
                      </p>
                      <p>
                        {t(
                          '5. In the event of duplicate reports, a bounty will be awarded to the first person to submit an issue.',
                          {ns: 'contribute'}
                        )}
                      </p>
                      <p>
                        {t(
                          '6. The Idena team may publish submitted reports or information about them.',
                          {ns: 'contribute'}
                        )}
                      </p>

                      <h4>{t('Minimum payout', {ns: 'contribute'})}</h4>
                      <p>{t('No predetermined amount', {ns: 'contribute'})}</p>

                      <h4>
                        {t('Bug bounty program scope examples', {
                          ns: 'contribute',
                        })}
                      </h4>

                      <p>
                        {t(
                          'To qualify for a bounty, report a security bug that potentially could lead to:',
                          {ns: 'contribute', nsSeparator: '!'}
                        )}
                      </p>
                      <p>
                        {t('- Attacking consensus mechanism', {
                          ns: 'contribute',
                        })}
                      </p>
                      <p>{t('- Stealing coins', {ns: 'contribute'})}</p>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <br />
              <br />

              <p className="disclaimer-hint">
                <Trans i18nKey="contributeDisclamer" t={t} ns="contribute">
                  * DISCLAIMER: The iDNA price for rewards is defined by the
                  Idena team and may differ from the market price.
                  <br />
                  The Idena team reserves the right to:
                  <br />
                  - Reject a reward application in case of attempts to fake a
                  proof or manipulate data
                  <br />- Change the list of activities and rewards
                </Trans>
              </p>

              <br />
              <br />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps = async ({locale}) => ({
  props: {
    ...(await serverSideTranslations(locale, ['contribute', 'common'])),
  },
})
