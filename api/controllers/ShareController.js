const { shareservice: ShareService } = global.sails.services
const hosts = sails.config.hosts
const hostUrl = hosts[sails.config.environment]

const useragent = require('useragent')

const checkMobile = (req) => {
  const ua = useragent.is(req.headers['user-agent'])
  return ua.android || ua.mobile_safari ? true : false
}

const getViewPath = (req) => `pages/share/${checkMobile(req) ? 'mobile' : 'pc'}`

const redirect = (res) => res.redirect('https://thequiz.live')

module.exports = {
  async show (req, res) {
    const { id } = req.params // id -> Number를 32진수로 변환한 값

    if (!id) return redirect()

    const viewPath = getViewPath(req)

    // id를 통해 API 서버에 해당 데이터와 관련된 정보를 얻어온다. (메타 제목, 메타 내용, 썸네일이미지, 동영상 경로)
    const shareInformation = await ShareService.getShareInformation(Number(id).toString(10))

    if (shareInformation.error) {
      return redirect()
    }

    const { data: content } = shareInformation

    const responseModel = {
      id,
      title: content.title,
      description: `${content.creator.name}님이 출제해주신 문제입니다.`,
      imageUrl: content.video_thumbnail_url,
      videoUrl: content.share_video_url,
      nickname: content.creator.name,
      referrer: content.creator.referrer,
      fullpath: `${hostUrl}/${id}`
    }

    return res.view(viewPath, { ...responseModel })
  }
}
