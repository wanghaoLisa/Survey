// var name = 'null';

// var address = '';
// var type = '';
// var position = '';
// var cause = '';
// var Lng = '';
// var Lat = '';

// var markers = [];
// var GENDER ="" ;
// var AGE = "";
// var FAMILIARITY = "";	
// var EDUCATION ="";
// var typeOfProblem="";
// var PositiveOrGenative="";
const markers = [];
const Data = {};
/**
 * Initializes the map and calls the function that creates polylines.
 */
function initMap() {

    let toolBar = new AMap.ToolBar({
        visible: true
    });

    let marker, map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 17,
        center: [108.902102, 34.344153],
        isHotspot: true
    });
    map.addControl(toolBar);
    toolBar.show();
    toolBar.showDirection();
    toolBar.showRuler();

    function addMarker(e) {
        let marker = new AMap.Marker({
            icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [e.lnglat.getLng(), e.lnglat.getLat()]
        });
        marker.setMap(map);
        markers.push(marker);

    }


    AMap.event.addDomListener(document.getElementById('clearMarker'), 'click', function () {
        map.remove(markers);
    }, false);

    AMap.event.addDomListener(document.getElementById('clearMarker1'), 'click', function () {
        map.remove(markers);
    }, false);

    function information(result) {
        var poiArr = result.poiList.pois;
        name = poiArr[0].name;
        address = poiArr[0].address;
        type = poiArr[0].type;
        position = poiArr[0].location;
        Lng = position.getLng();
        Lat = position.getLat();
        var url = "?exeoption=2" + "&name=" + name + "&type=" + type + "&address=" + address + "&position=" +
            position + "&Lng=" + Lng + "&Lat=" + Lat;

    }


    /*     function regeocoder(lnglatXY) { //逆地理编码
            let geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            geocoder.getAddress(lnglatXY, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    return geocoder_CallBack(result);
                }
            });

        } */

    function geocoder_CallBack(data) {
        let address = data.regeocode.formattedAddress; //返回地址描述
        return address;
    }


    function anyinformation(result) {

        
        Data.position = result.lnglat;
        Data.Lng = result.lnglat.getLng();
        Data.Lat = result.lnglat.getLat();
        Data.address = ""; //regeocoder(position);

        return Data;



    }

    // map.plugin('AMap.Geolocation', function () {
    //     geolocation = new AMap.Geolocation({
    //         enableHighAccuracy: true, //是否使用高精度定位，默认:true
    //         timeout: 10000, //超过10秒后停止定位，默认：无穷大
    //         buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
    //         zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    //         buttonPosition: 'RB'
    //     });
    //     map.addControl(geolocation);
    //     geolocation.getCurrentPosition();
    //     AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
    //     AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
    // });


    // //解析定位结果
    // function onComplete(data) {
    //     var point = new AMap.LngLat(data.position.getLng(), data.position.getLat()); // 创建点坐标  
    //     map.setCenter(point); // 设置地图中心点坐标 	
    // }

    map.plugin(
        ["AMap.MapType"],
        function () {
            //地图类型切换
            var type = new AMap.MapType({
                defaultType: 0 //使用2D地图
            });
            map.addControl(type);
        }
    );

    var placeSearch = new AMap.PlaceSearch(); //???????
    //var infoWindow=new AMap.AdvancedInfoWindow({});
    var infoWindow = new AMap.InfoWindow({
        autoMove: true,
        offset: {
            x: 0,
            y: -10
        }
    });


    map.on('click', function (result) {

        addMarker(result);

        anyinformation(result);
        var code = document.getElementById("txtHint").innerHTML;

    });


    // map.on('hotspotclick', function (result) {
    //     addMarker(result);

    //     //	new msgbox(1);
    //     placeSearch.getDetails(result.id, function (status, result) {
    //         if (status === 'complete' && result.info === 'OK') {
    //             information(result);
    //         }
    //     });

    //     var code = document.getElementById("txtHint").innerHTML;

    // });



    function msgbox(n) {
        div_id = document.getElementById('inputbox').style.display = n ? 'block' : 'none'; /* 点击按钮打开/关闭 对话框 */
        div_id.style.zIndex = div_id.style.zIndex++;
    }

    //????
    function placeSearch_CallBack(data) { //infoWindow.open(map, result.lnglat);
        var poiArr = data.poiList.pois;
        var location = poiArr[0].location;
        infoWindow.setContent(createContent(poiArr[0]));
        infoWindow.open(map, location);
    }

    function createContent(poi) { //??????
        var s = [];
        //s.push('<div class="info-title">'+poi.name+'</div><div class="info-content">'+"地址：" + poi.address);
        s.push('<b>名称：' + poi.name + "</b>");
        s.push("地址：" + poi.address);
        s.push("类型：" + poi.type);
        //s.push('<div>');
        return s.join("<br>");
    }

    var code = makeid();
}


$(document).ready(function () {
    ajax_call = function () {
        $.ajax({ //create an ajax request to load_page.php
            type: "GET",
            url: "info.php",
            dataType: "html", //expect html to be returned                
            success: function (response) {
                $("#capture").html(response);
            }
        });
    };
    var interval = 1000;
    setInterval(ajax_call, interval);
});


function SaveResponseQs() {
    //get the form values
    let code = document.getElementById("txtHint").innerHTML;
    let cause = document.forms["inputbox"]["cause"].value;
    let contact = document.forms["radiobox"]["contact"].value;
    let GENDER = document.getElementById('GENDER').value;
    let AGE = document.getElementById('AGE').value;
    let FAMILIARITY = document.getElementById('FAMILIARITY').value;
    let EDUCATION = document.getElementById('EDUCATION').value;
    let typeOfProblem = document.getElementById('typeOfProblem').value;
    let NegativeCause = document.forms["inputbox"]["NegativeCause"].value;
let position="1";
const dataVal={
    exeoption: '2',
    code,
    name: "null",
    type: "",
    address: "",
    position: "Wang",//Data.position,
    Lng: "Wang",//Data.Lng,
    Lat: "Wang",//Data.Lat,
    cause,
    GENDER,
    AGE,
    FAMILIARITY,
    EDUCATION,
    typeOfProblem,
    NegativeCause,
    contact

}


    $.ajax({
        urL: '/database',
        method: 'POST',
        dataType: 'json',
        data: dataVal
    });
    /*     var url = "?exeoption=2" + "&code=" + code + "&name=" + name + "&type=" + type + "&address=" + address +
        "&position=" + position + "&Lng=" + Lng + "&Lat=" + Lat + "&cause=" + cause +
        "&GENDER="+ GENDER+"&AGE="+AGE+ "&FAMILIARITY=" +FAMILIARITY + "&EDUCATION="+EDUCATION
        + "&typeOfProblem=" +typeOfProblem + "&NegativeCause="+NegativeCause
        +"&contact="+contact;
        





        var code = document.getElementById("txtHint").innerHTML;

        cause = document.forms["inputbox"]["cause"].value;

        contact = document.forms["radiobox"]["contact"].value;

        GENDER = document.getElementById('GENDER').value;
    AGE = document.getElementById('AGE').value;
    FAMILIARITY = document.getElementById('FAMILIARITY').value;	
     EDUCATION = document.getElementById('EDUCATION').value;
     typeOfProblem=document.getElementById('typeOfProblem').value;

     NegativeCause = document.forms["inputbox"]["NegativeCause"].value;



        var url = "?exeoption=2" + "&code=" + code + "&name=" + name + "&type=" + type + "&address=" + address +
            "&position=" + position + "&Lng=" + Lng + "&Lat=" + Lat + "&cause=" + cause +
            "&GENDER="+ GENDER+"&AGE="+AGE+ "&FAMILIARITY=" +FAMILIARITY + "&EDUCATION="+EDUCATION
            + "&typeOfProblem=" +typeOfProblem + "&NegativeCause="+NegativeCause
            +"&contact="+contact; */


    if (GENDER == "" || AGE == "" || FAMILIARITY == "" || EDUCATION == "" || position == '' || typeOfProblem == "") {
        alert("请先回答最上面的四个问题并选择一个地点再提交。"); //在此处输入选择的原因
        return false;
    } else {

        sendToDB(dataVal);
        document.getElementById("inputbox").reset();

        alert("您已经成功反馈了问题，谢谢！");
        return false;

    }







}


/////////////////////
/////////////////////////////////////////
//write file


function sendToDB(str) {
    //alert('3');
    if (str == "") {
        alert('empty str');
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var testimonial = document.getElementById('capture');
                testimonial.innerHTML = xmlhttp.responseText;

            }
        };
        xmlhttp.open("POST", "database.php" + str, true);
        xmlhttp.send();

    }
}


function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    document.getElementById("txtHint").innerHTML = text;
    return text;
}