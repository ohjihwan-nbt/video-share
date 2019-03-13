const axios = require('axios')

module.exports = {
  async getShareInformation (id) {
    // id를 사용하여 서버에 데이터를 요청한다.
    let result

    try {
      result = await axios.get('http://api.fureweb.com/exchangeRate/USD').then(r => r.data)
    } catch (e) {}

    return result
  }
}
