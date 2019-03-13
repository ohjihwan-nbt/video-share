const { shareservice: ShareService } = global.sails.services

const useragent = require('useragent')

const checkMobile = (req) => {
  const ua = useragent.is(req.headers['user-agent'])
  return ua.android || ua.mobile_safari ? true : false
}

const getViewPath = (req) => `pages/share/${checkMobile(req) ? 'mobile' : 'pc'}`

const redirect = (res) => res.redirect('https://thequiz.live')

module.exports = {
  async show (req, res) {
    const { id } = req.params

    if (!id) return redirect()

    const viewPath = getViewPath(req)

    // id를 통해 API 서버에 해당 데이터와 관련된 정보를 얻어온다. (메타 제목, 메타 내용, 썸네일이미지, 동영상 경로)
    const shareInformation = await ShareService.getShareInformation(id)
    // 서버 요청 결과가 정상이 아닌경우(400+), redirect() 호출

    const responseModel = {
      id,
      title: '제목',
      description: '설명',
      imageUrl: '공유이미지경로',
      videoUrl: '동영상경로',
      nickname: `닉네임${_.random(1, 10000)}`,
      referrer: `abcd${_.random(1, 10000)}`,
      winningCount: _.random(1, 10000),
      data: JSON.stringify(shareInformation || {})
    }

    return res.view(viewPath, { ...responseModel })
  }
}
