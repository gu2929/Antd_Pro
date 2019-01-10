import { stringify } from 'qs';
import {host} from './config'
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request(`${host}/user/login`, {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request(`${host}/user/register`, {
    method: 'POST',
    body: params,
  });
}

export async function getYanZhengApi(mobile) {
  return request(`${host}/user/find`,{
    method: 'POST',
    body: {phone:mobile},
  });
}

export async function getPhoneApi(mobile) {
  return request('http://123.206.55.50:11000/smsCode',{
    method: 'POST',
    body: {phone:mobile},
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getshopListApi () {
  return request('http://123.206.55.50:15000/shop/list');
}

export async function addshopListApi (obj) {
  return request('http://123.206.55.50:15000/shop/insert',{
    method:'POST',
    body:obj,
    headers:{
     'Content-Type':'application/json'
    }
  });
}
