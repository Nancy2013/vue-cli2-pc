import qs from 'qs';
import global from './global';

const { toString } = Object.prototype;

// ip检测
export function ipRegExp(ip = '') {
  const pattIpAndPort = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
  const pattIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return pattIp.test(ip) || pattIpAndPort.test(ip);
}

export function paramsSerializer(params = {}) {
  return qs.stringify(params, {
    arrayFormat: 'brackets'
  });
}

export function isPlainObject(obj) {
  return toString.call(obj) === '[object Object]';
}

// 判断token过期时间
export function isTokenExpired() {
/* 从localStorage中取出token过期时间 */
const auth = JSON.parse(localStorage.getItem('authB') || '{}');
const { token, expired } = auth;
  const expiredTime = new Date(expired).getTime() / 1000;
  /* 获取本地时间 */
  let nowTime = new Date().getTime() / 1000;
  /* 获取校验时间差 5min */
  const diffTime = 300;
  /* 校验本地时间 */
  nowTime += diffTime;
/* 如果 大小1小时，则说明即将过期 */
  const isExpired = (nowTime - expiredTime) > 60 * 60 * global.EXPIRE_TIME;
  return isExpired;
}
