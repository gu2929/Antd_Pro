import { getshopListApi,addshopListApi } from '@/services/api';

export default {
  namespace: 'shop',

  state: {
    shopList: [],
    obj:{}
  },

  effects: {
    *getshopList(_, { call, put }) {
      let response = yield call(getshopListApi);
      response=response.data.list;
      yield put({
        type: 'getshopListReducers',
        payload: response
      });
    },
    *changeshopList({id}, { call, put,select }) {
        let arr=yield select(state=>state.shop.shopList);
        arr.forEach((v,i)=>{
          if( v.id===id){
           arr.splice(i,1)
          }
        });
        yield put({
          type: 'changeshopListReducers',
          payload: arr
        });
    },
    *getObj({id},{call,put,select}){
      let arr=yield select(state=>state.shop.shopList);
      let obj={};
      obj=arr.filter((v,i)=>{
        return v.id===id
      })[0];
      yield put({
        type: 'getObjReducers',
        payload: obj
      });
    },
    *changeObj({payload},{call,put,select}){
      let arr=yield select(state=>state.shop.shopList);
      let obj=delete payload.obj.prefix;
      let newArr=arr.map((v,i)=>{
        if(v.id===payload.id) {
          let newObj=Object.assign({},v,payload.obj)
          return newObj;
        }else{
          return v;
        }
      });
      yield put({
        type: 'changeObjReducers',
        payload: newArr
      });
    },
    *addshopList({obj},{call,put}){
      let response = yield call(addshopListApi,obj);
    }
  },

  reducers: {
    getshopListReducers(state, {payload}) {
      return {
        ...state,
        shopList:payload,
      };
    },
    changeshopListReducers(state, {payload}) {
      return {
        ...state,
        shopList:payload
      };
    },
    getObjReducers(state,{payload}){
      return {
        ...state,
        obj:payload
      };
    },
    changeObjReducers(state, {payload}) {
      return {
        ...state,
        shopList:payload
      };
    },
  },
};
