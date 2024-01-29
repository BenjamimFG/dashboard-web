
class ApiService {
  /**
   *
   * @param {string} baseUrl
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   *
   * @param {string} url
   * @param {RequestInfo | undefined} init
   */
  async apiFetch(url, init) {
    return fetch(`${this.baseUrl}${url}`, init);
  }

  async getStates() {
    const res = await fetch(`${this.baseUrl}/states`);

    return res.json();
  }

  async getRegions() {
    const res = await fetch(`${this.baseUrl}/regions`);

    return res.json();
  }

  async getIndexes() {
    const res = await fetch(`${this.baseUrl}/indexes`);

    return res.json();
  }

  /**
   *
   * @param {number} indexId
   * @param {number[]} regionsIds
   * @returns
   */
  async getIndexById(indexId, regionsIds) {
    const searchParams = regionsIds.map(rId => ['region', rId.toString()]);

    const res = await fetch(`${this.baseUrl}/indexes/${indexId}?` + new URLSearchParams(searchParams));

    return res.json();
  }

  async getIndexesByState(stateId) {
    const res = await this.apiFetch(`/states/${stateId}`);

    return res.json();
  }

  async getIndexesByRegion(regionId) {
    const res = await this.apiFetch(`/regions/${regionId}`);

    return res.json();
  }
}


const apiService = new ApiService(process.env.REACT_APP_API_URL || 'http://localhost:5000');

export default apiService;
