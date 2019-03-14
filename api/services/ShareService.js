const axios = require('axios')
const serverHostUrl = sails.config.hosts.server[sails.config.environment]

module.exports = {
  async getShareInformation (id) {
    // id를 사용하여 서버에 데이터를 요청한다.
    const result = {}

    try {
      // qiz-­api.lockcast.co.kr/api/play_contents/${id}/share
      // const response = await axios.get(`http://qiz-­stg-api.lockcast.co.kr/api/play_contents/${id}/share`)

      // // 임시 사용 경로 (http 요청 테스트)
      // const response = await axios.get(`${serverHostUrl}/api/play_contents/${id}/share`).then(r => r.data)
      
      // // 응답 바인딩
      // result.status = response.status
      // result.data = response.data[0].contents
      
      // 임시 응답
      result.status = 200
      result.data = {
        /** http 응답의 data.content가 실제로는 data가 된다. */
        id: 1,
        title: '구제역은?',
        photo_url: 'https://cdn.smallbites.kr/znNu7qDdNgC5Ztk74K7J8qGqd08WcqbM',
        video_thumbnail_url: 'https://alock-image.cashslide.kr/qiz/video/thumb_video_1552377563ccc89cc460.png',
        share_video_url: 'https://alock-image.cashslide.kr/qiz/video/share_video_15523775653a02846805.mp4',
        creator: {
          id: 3,
          name: 'FUREWEB',
          referrer: 'mi19mj',
          winning_count: 10
        }
      }
    } catch (e) {
      sails.log.error(e)

      result.error = true
    }

    return result
  }
}
