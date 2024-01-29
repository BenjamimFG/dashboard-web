
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
    const res = await this.apiFetch('/states');

    return res.json();
  }

  async getRegions() {
    const res = await this.apiFetch('/regions');

    return res.json();
  }

  async getIndexes() {
    const res = await this.apiFetch('/indexes');

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

    const res = await this.apiFetch(`/indexes/${indexId}?` + new URLSearchParams(searchParams));

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

  async getIndexesStats() {
    const res = await this.apiFetch('/indexes/statistics');

    return res.json();
  }
}


const apiService = new ApiService(process.env.REACT_APP_API_URL || 'http://localhost:5000');

export default apiService;
