import CacheCore from '@/cache/core.cache';

export default new (class AuthTokenCache extends CacheCore {
  constructor() {
    super('auth');
  }
})();
