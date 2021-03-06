import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {Trans, useTranslation} from 'next-i18next'
import Layout from '../shared/components/layout'

export default function FlipChallenge() {
  const {t} = useTranslation('flip-challenge')

  return (
    <Layout
      title={t('Idena Flip Challenge: AI-resistant CAPTCHA.', {
        ns: 'flip-challenge', nsSeparator: '!'
      })}
      description={t(
        'Flip is AI-hard CAPTCHA created by a human. Common sense is required to identify a meaningful story told in pictures',
        {ns: 'flip-challenge'}
      )}
    >
      <section
        className="section section_content menu_section_content menu_flip-challenge"
        id="flips"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <div className="section_header">
                <h3 className="h1">
                  {t('What is a flip', {ns: 'flip-challenge'})}
                </h3>
              </div>
              <p>
                {t(
                  'A flip is a sort of a CAPTCHA that helps to determine whether a user is human. In contrast to a CAPTCHA, which stands for "Completely Automated Public Turing test to tell Computers and Humans Apart" and is usually generated by an automated service, a flip should be created by a human. And unlike a usual CAPTCHA, which is based on object recognition, solving a flip requires a semantic interpretation of the relationship between objects.',
                  {ns: 'flip-challenge'}
                )}
              </p>
              <p>
                {t(
                  'Each flip contains two stories in pictures. One of them (left or right) is a sequence of pictures that is created by a human as a meaningful story. The other is created by the same author as illogical. Stories are "read" from top to bottom. Solving a flip is choosing the story that seems logical. If both stories seem meaningful or meaningless, the task is still to choose the one which seems more logical than the other and thus would rather be chosen by other people.',
                  {ns: 'flip-challenge'}
                )}
              </p>
              <p>
                {t(
                  'A flip is not an IQ test but a test for common sense. There are no predefined correct answers: The correct answer will be the one chosen by a majority of people.',
                  {ns: 'flip-challenge', nsSeparator: '!'}
                )}
              </p>
              <div className="fig">
                <img src="/static/images/flip-sample.png?1" alt=""></img>
                <p>
                  {t(
                    'Example of a flip: a meaningful story (left) and a meaningless sequence of pictures (right)',
                    {ns: 'flip-challenge', nsSeparator: '!'}
                  )}
                </p>
              </div>
              <p>
                <Trans i18nKey="readMoreAboutCaptcha" t={t} ns="flip-challenge">
                  Read more about{' '}
                  <a
                    href="https://medium.com/idena/ai-resistant-captchas-are-they-really-possible-760ac5065bae"
                    rel="nofollow"
                  >
                    AI-resitant captchas
                  </a>{' '}
                  in Idena blog.
                </Trans>
              </p>

              <h3>
                {t('Why machines have no common sense', {ns: 'flip-challenge'})}
              </h3>

              <div className="iframevideo">
                <div className="dummy">
                  <iframe
                    title="dummy_video"
                    src="https://content.jwplatform.com/players/RdnxHErX-FvQKszTI.html"
                    frameBorder="0"
                    scrolling="auto"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section section_content menu_section_content menu_flip-challenge"
        id="flip-challenge"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <p>
                <Trans i18nKey="testYourselfFlipLink" t={t} ns="flip-challenge">
                  Try to{' '}
                  <a href="https://flips.idena.io?pass=idena.io" rel="nofollow">
                    test yourself
                  </a>{' '}
                  to check whether you are bot or not.
                </Trans>
              </p>

              <h3>{t('Flip challenge', {ns: 'flip-challenge'})}</h3>

              <p>
                <Trans
                  i18nKey="aiResearchRewardNotice"
                  t={t}
                  ns="flip-challenge"
                >
                  We consider AI as an important part of the Idena project to
                  improve the flip challenge and announce a contest for AI
                  researchers and practitioners with a <b>$55,000</b> reward
                  cascade to develop an open AI instrument.
                </Trans>
              </p>

              <p>
                {t(
                  'We welcome AI researchers and practitioners to develop an open source AI instrument for solving flips. Idena will award the following prizes (paid in iDNA, the Idena blockchain coin) to the first individual or a team to break respective accuracy in solving flips using with a verifiable proof:',
                  {ns: 'flip-challenge', nsSeparator: '!'}
                )}
              </p>

              <div className="tab-content block">
                <div className="tab-pane show active" role="tabpanel">
                  <div className="table-responsive">
                    <table className="table">
                      <tr>
                        <th>
                          <Trans
                            i18nKey="minimumAccuracy"
                            t={t}
                            ns="flip-challenge"
                          >
                            Minimum
                            <br />
                            accuracy
                          </Trans>
                        </th>
                        <th>Prize</th>
                        <th>
                          <Trans
                            i18nKey="cascadePrize"
                            t={t}
                            ns="flip-challenge"
                          >
                            Cascade
                            <br />
                            prize
                          </Trans>
                        </th>
                        <th style={{width: '100%'}}>Status</th>
                      </tr>
                      <tr>
                        <td>71%</td>
                        <td>$1,000</td>
                        <td>$1,000</td>
                        <td>{t('No winner', {ns: 'flip-challenge'})}</td>
                      </tr>

                      <tr>
                        <td>72%</td>
                        <td>$2,000</td>
                        <td>$3,000</td>
                        <td>{t('No winner', {ns: 'flip-challenge'})}</td>
                      </tr>
                      <tr>
                        <td>73%</td>
                        <td>$3,000</td>
                        <td>$6,000</td>
                        <td>{t('No winner', {ns: 'flip-challenge'})}</td>
                      </tr>
                      <tr>
                        <td>74%</td>
                        <td>$4,000</td>
                        <td>$10,000</td>
                        <td>{t('No winner', {ns: 'flip-challenge'})}</td>
                      </tr>
                      <tr>
                        <td>75%</td>
                        <td>$5,000</td>
                        <td>$15,000</td>
                        <td>{t('No winner', {ns: 'flip-challenge'})}</td>
                      </tr>
                      <tr>
                        <td>76%</td>
                        <td>$6,000</td>
                        <td>$21,000</td>
                        <td>{t('No winner', {ns: 'flip-challenge'})}</td>
                      </tr>
                      <tr>
                        <td>77%</td>
                        <td>$7,000</td>
                        <td>$28,000</td>
                        <td>{t('No winner', {ns: 'flip-challenge'})}</td>
                      </tr>
                      <tr>
                        <td>78%</td>
                        <td>$8,000</td>
                        <td>$36,000</td>
                        <td>{t('No winner', {ns: 'flip-challenge'})}</td>
                      </tr>
                      <tr>
                        <td>79%</td>
                        <td>$9,000</td>
                        <td>$45,000</td>
                        <td>{t('No winner', {ns: 'flip-challenge'})}</td>
                      </tr>
                      <tr>
                        <td>80%</td>
                        <td>$10,000</td>
                        <td>$55,000</td>
                        <td>{t('No winner', {ns: 'flip-challenge'})}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>

              <h3>{t('Flip Challenge Rules', {ns: 'flip-challenge'})}</h3>

              <p>
                {t(
                  'The applicant that will be able to show consistent accuracy (average for 3 epochs) will receive the corresponding prize cascade. For example, if the average accuracy reached is 72.5% the prize cascade of $1,000+$2,000 =$3,000 (equivalent amount in iDNA) will be paid.',
                  {ns: 'flip-challenge'}
                )}
              </p>

              <p>
                {t(
                  'In case if 2 or more algorithms apply at the same testing time the prize amount will be paid on first come first serve basis according to the accuracy reached. For example, if there is the first participant who reached 72,5% and the second one who reached 74% then the prize cascade of $3,000 will be paid to the first participant and $3,000+$4,000=$7,000 will be paid to the second participant.',
                  {ns: 'flip-challenge'}
                )}
              </p>

              <p>
                {t(
                  'Eligible AI algorithms should provide friendly API, be open source, cross-platform and must work without internet connection. AI instrument will be integrated into the Idena app for flip patterns detection.',
                  {ns: 'flip-challenge'}
                )}
              </p>

              <p>
                <Trans i18nKey="aiTrainingFlips" t={t} ns="flip-challenge">
                  AI should be trained on the dataset of flips that currently
                  available in the{' '}
                  <a href="https://scan.idena.io">blockchain explorer</a>. Idena
                  team will use the limited number of invites to collect out of
                  sample flips for contestants' AI testing.
                </Trans>
              </p>

              <b>
                {t('Flip challenge committee:', {
                  ns: 'flip-challenge',
                  nsSeparator: '!',
                })}
              </b>
              <p>
                {t(
                  'The contest is designed and administered by the Idena team.',
                  {ns: 'flip-challenge'}
                )}
              </p>

              <Trans i18nKey="protocolToBeSpecified" t={t} ns="flip-challenge">
                <b>Protocol: </b>
                <i>to be specified</i>
              </Trans>
              <br />

              <br />

              <p>
                {t(
                  'The Idena team reserves the right to cancel or amend the flip challenge and these rules and conditions.',
                  {ns: 'flip-challenge'}
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps = async ({locale}) => ({
  props: {
    ...(await serverSideTranslations(locale, ['flip-challenge', 'common'])),
  },
})
