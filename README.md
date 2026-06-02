echo "# frontend" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/idbswnd1000/frontend.git
git push -u origin main


git add .
git commit -m ""
git push -u


node_moduels 다시 설치 : npm install
server 띄우기 : npm run dev
router : npm install react-router-dom
CSS(style) : npm install styled-components
아이콘: npm install react-icons
npm install react-redux @reduxjs/toolkit

json-server(restfulApi): npm install -g json-server
cd server
json-server --watch db.json --port 3001

api 라이브러리: npm install axios

=============================================================
reducer
dispatch: 함수를 실행하는 함수
action: 전체 object 인수
action.type: 함수의 타입
action.payload: state 변화시킬 수 있는 인수





useState => useReducer => useContext => redux(slice, query)


context: statem 내부함수(reducers)
redux: state, 내부함수(reducers), 외부함수(extraReducers: api)

Restful API
get 방식(all): url => return: table(json)
get 방식(one of data): url/id => return:object(row)
post 방식: url, object => return: object(response)
put 방식: url/id, object => return: object(response)
delete 방식: url/id => return: id(response)