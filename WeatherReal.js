jQuery.getJSON(
    //引入百度天气接口的JSON文件
    //location:地址，output：数据输出格式，默认为xml格式，这里设置为json
    //ak:访问应用的密钥，mcode:天气预报功能代码
    'http://api.map.baidu.com/telematics/v3/weather?callback=?',
    {
        location:'郑州市',
        output:'json',
        ak:'iw5m2G7ayDow8ofDdDGVUMB3',
        mcode:'com.BaiduWeather'
    },
    function (data) {
        console.dir(data);
        
        //从results中获取数据
        var r = data.results[0];
        //获取地区
        var city = r.currentCity;
        //获取天气
        var datas = r.weather_data;
        //获取今天天气,获取数组中的第一个元素，数组是一个有序的存储集合，
        //顺序是从0开始的
        var today = datas[0];
        var tempers = today.temperature;
        // 获取到今天的天气的图片的地址，用字符串分割的方法，
        //以‘／’为分割标准，取最后一个图片名即可
        var pic = 
        today.dayPictureUrl.substring(today.dayPictureUrl.lastIndexOf('/'));
        //获取空气指数,打点调用标签内容，只能是上一级的调取下一级的内容
        var pm = r.pm25
        //获取date，然后进行字符串分割，取得实时温度
        var Temper = today.date;
        // 以冒号为分割条件进行分割
        //indexOf()可以返回某个指定字符串在这个字符串中首次出现的位置，这里是中文冒号
        var nowTemper = Temper.substring(today.date.indexOf('：'));
        // 字符串替换，用空白替换右括号
        nowTemper = nowTemper.replace(')','');

        //将图片信息插入，从本地获取图片
        $('main .icon').css('background-image','url(days' +pic +')');
        // 将城市信息插入到header中
        $('header').text(city);
        //将温度插入
        $('main .tempers span').text(tempers);
        $('main .weather').text(today.weather);
        //将风向插入
        $('main .wind').text(today.wind);
        var current = '实时温度'+nowTemper+', 空气指数'+pm+'  '+PanDuanWuRan(pm);
        $('main .current').text(current);
        //用days替代这个难写的内容
        var days = $('section');
        for(var i = 1;i < 4;i ++)
        {
            //因为for循环是按照i的值依次执行的,
            //因而我可以根据这个规则将不同的数据与i关联上,
            //在这里我想将第明天数据，插入在第一个section中，所以要将其逻辑关系对上
            var day = days.get(i-1);
            var data = datas[i];
            $('.week',day).text(data.date);
            $('.temper',day).text(data.temperature);
            
        }
    }
    
    
)
// 判断pm的值，根据这个值返回相应的空气质量
//带返回值的方法，说白了就是调用这个方法时，会把对应的值还给你
function PanDuanWuRan(pm){
    if(pm <=50)
    {
       //return,代表跳出整个方法体
        return '优';
    }
    if(pm <= 100)
    {
        return '良';
    }
    if(pm <=150)
    {
        return '轻微污染';
    }
    if(pm <= 200)
    {
        return '轻度度污染';
    }
    if(pm <= 300)
    {
        return '中度污染';

    }
    //&&并且，两条件必须都满足才可以进入判断
    //||或者，两个条件满足一个就可以进入判断
    if( pm>300 && pm <=500 )
    {
        return '重度污染';
    }
    if(pm > 500)
    {
        return '已爆表';
    }
}
$.get('http://www.baidu.com',function(data,status){
     alert('1111');
    alert('data');
   
})

