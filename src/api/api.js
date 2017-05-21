import wepy from 'wepy';

const host = 'http://v3.wufazhuce.com:8000/api/';
const wxRequest = async (params = {}, url) => {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    console.log(url);
    let res = await wepy.request({
        url: url,
        method: params.method || 'GET',
        data: params.data || {},
        header: {'Content-Type': 'application/json'},
    });
    wx.hideToast();
    return res;
};


const getCity = (params) => wxRequest(params, 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json'); // *

// Index
const getVolIdList = (params) => wxRequest(params, host + 'onelist/idlist'); // *
const getVolById = (params) => wxRequest(params, host + 'onelist/' + params.query.id + '/' + params.query.city); // *

const getVolsByMonth = (params) => wxRequest(params, host + 'hp/bymonth/' + params.query.month);
const getVolDetailById = (params) => wxRequest(params, host + 'hp/detail/' + params.query.id);

// Reading
const getReadingList = (params) => wxRequest(params, host + 'channel/reading/more/' + params.query.id); // *

const getCarousel = (params) => wxRequest(params, host + 'reading/carousel');
const getLastArticles = (params) => wxRequest(params, host + 'reading/index');
const getEssayById = (params) => wxRequest(params, host + 'essay/' + params.query.id);
const getSerialById = (params) => wxRequest(params, host + 'serialcontent/' + params.query.id);
const getQuestionById = (params) => wxRequest(params, host + '/question/' + params.query.id);
const getArticlesByMonth = (params) => {
  wxRequest(params, host + params.query.type + '/bymonth/' + params.query.month)
};

// Music
const getMusicList = (params) => wxRequest(params, host + 'channel/music/more/' + params.query.id); // *

const getMusicIdList = (params) => wxRequest(params, host + 'music/idlist/0');
const getMusicsByMonth = (params) => wxRequest(params, host + 'music/bymonth/' + params.query.month);
const getMusicDetailById = (params) => wxRequest(params, host + 'music/detail/' + params.query.id);

// Movie
const getMovieList = (params) => wxRequest(params, host + 'channel/movie/more/' + params.query.id); // *

const getMovieListById = (params) => wxRequest(params, host + 'channel/movie/more/' + params.query.id);
const getMovieDetailById = (params) => wxRequest(params, host + 'movie/detail/' + params.query.id);
const getMovieStoryById = (params) => wxRequest(params, host + 'movie/' + params.query.id + '/story/1/0');

module.exports = {
    getCity,
    getVolById,
    getVolIdList,
    getVolsByMonth,
    getVolDetailById,
    getReadingList,
    getCarousel,
    getLastArticles,
    getEssayById,
    getSerialById,
    getQuestionById,
    getArticlesByMonth,
    getMusicsByMonth,
    getMusicDetailById,
    getMovieListById,
    getMovieDetailById,
    getMovieStoryById,
    getMusicList,
    getMovieList
};
