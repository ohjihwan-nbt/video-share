const axios = require('axios')

module.exports = {
  async getShareInformation (id) {
    // id를 사용하여 서버에 데이터를 요청한다.
    const result = {}

    try {
      const response = await axios.get('http://api.smallbites.kr/c/v1/brands/1')

      result.status = response.status
      result.data = response.data
    } catch (e) {
      sails.log.error(e)

      result.error = true
    }

    return result
  }
}
